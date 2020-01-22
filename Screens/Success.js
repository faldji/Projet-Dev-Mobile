import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import MenuBar from "../Components/MenuBar";
import {Styles} from "../assets/style/Styles";

class Success extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {navigation} = this.props;
        return (
            <View style={Styles.container}>
                <MenuBar leftElement="menu" onLeftElementPress={() => navigation.toggleDrawer()}
                         rightElement={"shopping-cart"} onRightElementPress={() => navigation.navigate('MyCart')}/>
                <View>
                    <ImageBackground style={{alignItems:'center', width :400 , height:300}} source={require('../assets/img/valid.png')}>
                        <View style={{alignItems:'center', justifyContent:'center',flexDirection:'row'}}>
                           <Text style ={{textAlign:'center', color:'#2E8B57', fontSize:22}}> Commande Envoyé </Text>
                        </View>
                    </ImageBackground>
                <   View>
                      <Text style ={{textAlign:'center', color:'#BDB76B', fontSize:20}}>Votre repas Copieux vous sera livré dès la fin de votre cours</Text>
                    </View>
                    <View>
                      <Text style ={{textAlign:'center', color:'#556B2F'}}> Il vous reste 30 &euro; sur la carte crous</Text>
                   </View>
                </View>
            </View>
        );
    }
}

export default Success;
