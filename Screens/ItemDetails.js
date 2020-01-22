/*
 * Romaric Doumenc
 */


import React , {Component} from 'react';
import { FoodList } from "../Components/FoodList"
import MenuBar from "../Components/MenuBar";
import {Styles} from "../assets/style/Styles";
import {StyleSheet, Text, View, Image, AsyncStorage} from 'react-native';
import {withPanierContext} from "../routes/PanierProvider";
import CheckBox from "../Components/CheckBox";

const styles = StyleSheet.create({
    title: { // Style for name of the item
      fontWeight: 'normal',
      fontSize: 23,
      lineHeight: 29,
      flex: 9,
    },
    price: {
      fontWeight: 'normal',
      fontSize: 18,
      lineHeight: 22,
      flex: 1,
    },
    description: {
      fontWeight: 'normal',
      fontSize: 14,
      lineHeight: 15,
      flex: 5,
    },
    alignItems : {
      flexDirection: 'column',
      justifyContent: 'center',
    },
    alignPriceName : {
      flexDirection: 'row',
      alignItems: 'stretch',
    }
  });

class ItemDetails extends Component {
    constructor(props,context) {
        super(props,context);
        this.state = {
            checked: false,
            myCart: []
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        let foodList = FoodList.find(value => value.id === navigation.getParam('key'));
            AsyncStorage.getItem('@MyCart:key', (error, result) => {
                if (!error) {
                    if (result !== null) {
                        let myCart = JSON.parse(result);
                        if (myCart) {
                            if (!Array.isArray(myCart))
                                myCart = [myCart];
                            this.setState({checked: myCart.some(someCartValue => someCartValue.id === foodList.id),myCart});
                        }
                    }
                }

            });
    };

    UNSAFE_componentWillReceiveProps(nextProps, nextContext)  {
        this.setState({checked: nextProps.context.myCart.some(someCartValue => someCartValue.id === nextProps.navigation.getParam('key')),myCart:nextProps.context.myCart});
    }

    handleToggleCbox = (foodList)=>{
        const {context} = this.props;
        const {checked,myCart} = this.state;
        let myCarte= context.myCart;
        if (myCarte.length === 0)
            myCarte = myCart || [];
        if (checked)
            myCarte = myCarte.filter(value=>value.id !== foodList.id);
        else
            myCarte.push(foodList);
        context.updatePanier(myCarte).then(()=>{this.setState({checked:!checked,myCart:myCarte})});

    };
    render() {
        const {navigation} = this.props;
        const {checked} = this.state;
        let foodList = FoodList.find(value => value.id === navigation.getParam('key'));
        return (
            <View style={Styles.container}>
                <MenuBar leftElement="arrow-back" onLeftElementPress={() => navigation.goBack()}
                         rightElement={"shopping-cart"} onRightElementPress={() => navigation.navigate('MyCart')}/>
           <View style={{flex:1}}>
            <View style={{flex:3}}>
              <Image source={foodList.image} style={{flex:1}}/>
            </View>
            <View style={{flex:2 , margin : 5}}>
              <View style={{flex:1, flexDirection:'row' , justifyContent:'space-between'}}>
                <Text style={styles.title}>{foodList.name}</Text>
                <Text style={styles.price}>{foodList.price} €</Text>
              </View>
              <View style={{flex:1, flexDirection:'row' , justifyContent:'space-between'}}>
                <Text style={styles.description}>{foodList.description}</Text>
                <Text style={{flex: 4}}/>
                <CheckBox title='Ajouter au panier' style={{flex: 1}} onCheck={()=>this.handleToggleCbox(foodList)} checked = {checked}/>
              </View>
              <Text style={{fontSize: 18}}>Allergènes</Text>
              <Text>{foodList.allergen}</Text>

            </View>
            <View style={{flex: 1}}/>
          </View>
            </View>
        );
    }
}

export default withPanierContext(ItemDetails);
