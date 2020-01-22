/*
 * Romaric Doumenc
 */


import React , {Component} from 'react';
import { FoodList } from "../Components/FoodList"
import MenuBar from "../Components/MenuBar";
import {Styles} from "../assets/style/Styles";
import { StyleSheet, Text, View , Image, CheckBox} from 'react-native';

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
  
class ItemDetails extends React.Component {
    constructor(props,context) {
        super(props,context);
    }
    componentDidMount() {
        //api

    }

    render() {
        const {navigation} = this.props;
        const key = this.props.navigation.getParam('key');
        let foodlist = FoodList[key - 1];
        
        return (
            <View style={Styles.container}>
                <MenuBar leftElement="arrow-back" onLeftElementPress={() => navigation.goBack()}
                         rightElement={"shopping-cart"} onRightElementPress={() => navigation.navigate('MyCart')}/>
           <View style={{flex:1}}>
            <View style={{flex:3}}>
              <Image source={foodlist.image} style={{flex:1}}/>
            </View>
            <View style={{flex:2 , margin : 5}}>
              <View style={{flex:1, flexDirection:'row' , justifyContent:'space-between'}}>
                <Text style={styles.title}>{foodlist.name}</Text>
                <Text style={styles.price}>{foodlist.price} €</Text>
              </View>
              <View style={{flex:1, flexDirection:'row' , justifyContent:'space-between'}}>
                <Text style={styles.description}>{foodlist.description}</Text>
                <Text style={{flex:4}}></Text>
                <CheckBox title='Ajouter au panier' style={{flex:1}}></CheckBox>
              </View>
              <Text style={{fontSize: 18}}>Allergènes</Text>
              <Text>{foodlist.allergen}</Text>
              
            </View>
            <View style={{flex:1}}></View>
          </View>
            </View>
        );
    }
}

export default ItemDetails;
