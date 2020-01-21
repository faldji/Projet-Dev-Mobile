import React, {Component, Fragment} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    ViewPropTypes,
    FlatList,
    TextInput, Alert
} from "react-native";
import MenuBar from "../Components/MenuBar";
import {Styles} from "../assets/style/Styles";
import PropTypes from "prop-types";
import ListItem from "../Components/ListItem";
import Button from "../Components/Button";
import {withPanierContext} from "../routes/PanierProvider";
import BadgeButton from "../Components/BadgeButton";

const propsTypes = {
    title: PropTypes.string,
    style: PropTypes.oneOfType([
        PropTypes.shape({
            container: ViewPropTypes.style || View.propTypes.style,
            text: Text.propTypes.style
        }),
        PropTypes.array,
    ]),
    context: PropTypes.any
};
const defaultProps = {
    title: "Panier",
    style: {}
};

function getStyle(props) {
    const {subheader, listItem, centerText, inputForm, button} = Styles;
    return {
        subheader: {
            container: [subheader.container, props.style.container],
            text: [subheader.text, props.style.text],
        },
        listItem,
        centerText,
        inputForm,
        button
    }
}

class CartRecap extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                rue: null,
                ville: null,
                cp: null,
            }
    }

    renderLeftElementAsImage = src => {
        return <Image fadeDuration={2000} source={src} style={Styles.listItem.image}/>
    };

    render() {
        const {navigation, title, context} = this.props;
        let myCart = context.myCart;
        const styles = getStyle(this.props);
        const subheaderFlatten = StyleSheet.flatten(styles.subheader);
        let elements;
        if (Array.isArray(myCart) && myCart.length > 0) {
            elements = (
                <Fragment>
                    <FlatList data={myCart}
                              renderItem={({item}) => <ListItem key={item.id}
                                                                leftElement={this.renderLeftElementAsImage(item.image)}
                                                                centerElement={{
                                                                    primaryText: item.name,
                                                                    secondaryText: item.description,
                                                                    tertiaryText: " ",
                                                                }}
                                                                rightElement={{
                                                                    actions: {
                                                                        item: item
                                                                    },
                                                                }}
                                                                onPress={() => navigation.navigate('ItemDetails')}/>}
                              keyExtractor={item => item.id.toString()}/>
                    <View style={styles.listItem.TotalPriceContainer}>
                        <Text style={styles.listItem.TotalPriceText}>
                            Total = {context.totalPrice} &euro;
                        </Text>
                        <BadgeButton
                            key={'delRecap'}
                            name={'delete-circle'}
                            iconSet="MaterialCommunityIcons"
                            size={30}
                            onPress={() => context.updatePanier([]).then(r => Alert.alert("Success","Le panier est vidée") )}
                        />
                    </View>
                    <View style={styles.inputForm.container}>
                        <TextInput
                            onChangeText={value => this.setState({rue: value})}
                            ref={(input) => {
                                this.rue = input;
                            }}
                            onSubmitEditing={() => {
                                this.ville.focus();
                            }}
                            blurOnSubmit={false}
                            style={styles.inputForm.contentText}
                            textContentType={'streetAddressLine1'}
                            numberOfLines={1} placeholder="Rue"
                            returnKeyType={'next'}
                        />
                        <View style={styles.inputForm.spacedRow}>
                            <TextInput
                                onChangeText={value => this.setState({ville: value})}
                                ref={(input) => {
                                    this.ville = input;
                                }}
                                onSubmitEditing={() => {
                                    this.cp.focus();
                                }}
                                blurOnSubmit={false}
                                style={[styles.inputForm.contentText, {maxWidth: 172}]}
                                textContentType={'countryName'}
                                numberOfLines={1}
                                placeholder="Ville"
                                returnKeyType={'next'}
                            />
                            <View style={{flex: 1}}/>
                            <TextInput
                                onChangeText={value => this.setState({cp: value})}
                                ref={(input) => {
                                    this.cp = input;
                                }}
                                onSubmitEditing={() => {
                                    this.handleOrder();
                                }}
                                style={styles.inputForm.contentText}
                                textContentType={'postalCode'}
                                maxLength={4}
                                numberOfLines={1}
                                placeholder="Code Postal"
                                returnKeyType={'done'}
                            />
                        </View>
                    </View>
                    <Button icon="shopping-cart"  onPress={() => this.handleOrder()} title="Passer Commande"/>
                </Fragment>
            );
        } else {
            elements = <Text style={styles.centerText}>Empty cart !</Text>;

        }
        return (
            <View style={Styles.container}>
                <MenuBar leftElement="arrow-back" onLeftElementPress={() => navigation.goBack()}
                         centerElement="Mon panier"
                         rightElement="shopping-cart" onRightElementPress={() => navigation.navigate('MyCart')}/>
                <View style={subheaderFlatten.container}>
                    <Text style={subheaderFlatten.text}>{title || 'Panier'}</Text>
                </View>
                {elements}


            </View>
        );
    }

    handleOrder = () => {
        const {rue, ville, cp} = this.state;
        const {navigation, context} = this.props;
        if (rue && rue.trim !== "") {
            if (ville && ville.trim !== "") {
                if (cp && cp.trim !== "") {
                    context.updatePanier([], 'Success', navigation).then(r  =>null)

                } else {
                    //Alert cp
                    Alert.alert('Attention Code postal', 'Cp non valide');
                    this.cp.focus();
                }
            } else {
                //Alert ville
                Alert.alert('Attention Ville', 'Aucune Ville renseignée');
                this.ville.focus();
            }
        } else {
            //Alert rue
            Alert.alert('Attention Rue', 'Rue est obligatoire');
            this.rue.focus();
        }

    };
}

CartRecap.propTypes = propsTypes;
CartRecap.defaultProps = defaultProps;
export default withPanierContext(CartRecap);
