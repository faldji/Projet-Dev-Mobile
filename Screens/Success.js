import React from 'react';
import {View, Text} from 'react-native';
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
                <ImageBackground style={{width :192 , height:256}} source={require('../assets/img/valid.png')}>
                    <View>
                        <Text style ={{textAlign:'center', color:'#fff', fontSize:22}}> Commande Envoyé</Text>
                    </View>
                </ImageBackground>
                <View>
                    <Text style ={{textAlign:'center', color:'#fff'}}>Votre repas Copieux vous sera livré dès la fin de votre cours</Text>
                </View>
                <View>
                    <Text style ={{textAlign:'center', color:'#fff', fontSize:22}}> Il vous reste 30 &euro; sur la carte crous</Text>
                </View>
            </View>
        );
    }
}

export default Success;
