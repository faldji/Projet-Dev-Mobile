import React , {Component} from 'react';
import {View,Text} from "react-native";
import MenuBar from "../Components/MenuBar";
import {Styles} from "../assets/style/Styles";

export default class CartRecap extends Component{
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        const {navigation} = this.props;
        return(
            <View style={Styles.container}>
                <MenuBar leftElement="arrow-back"  onLeftElementPress={()=>navigation.goBack()} centerElement="Mon panier"
                         rightElement="shopping-cart" onRightElementPress={()=>navigation.navigate('MyCart')}/>
                <View style={Styles.row}>
                    <Text style={Styles.welcome}>Panier</Text>
                </View>
            </View>
        );
    }

}
