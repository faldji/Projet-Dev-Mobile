import React from 'react';
import {View, Text, Platform} from 'react-native';
import MenuBar from "../Components/MenuBar";
import {Styles} from "../assets/style/Styles";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

class Home extends React.Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={Styles.container}>
                <MenuBar leftElement="menu" onLeftElementPress={() => navigation.toggleDrawer()}
                         rightElement={"shopping-cart"} onRightElementPress={() => navigation.navigate('MyCart')}/>
                <View style={Styles.row}>
                    <Text style={Styles.welcome}>Welcome to React Native!</Text>
                    <Text style={Styles.instructions}>To get started, edit App.js</Text>
                    <Text style={Styles.instructions}>{instructions}</Text>
                </View>
            </View>
        );
    }
}

export default Home;
