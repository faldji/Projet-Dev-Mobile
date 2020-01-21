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
                <View style={Styles.listItem.container}>
                    <Text style={Styles.centerText}>Success!</Text>
                </View>
            </View>
        );
    }
}

export default Success;
