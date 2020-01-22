import React from 'react';
import {View} from 'react-native';
import MenuBar from "../Components/MenuBar";
import {Styles} from "../assets/style/Styles";

class ItemDetails extends React.Component {
    constructor(props,context) {
        super(props,context);
    }
    componentDidMount() {
        //api

    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={Styles.container}>
                <MenuBar leftElement="arrow-back" onLeftElementPress={() => navigation.goBack()}
                         rightElement={"shopping-cart"} onRightElementPress={() => navigation.navigate('MyCart')}/>
            </View>
        );
    }
}

export default ItemDetails;
