import React from 'react';
import {createAppContainer} from 'react-navigation';


import HomeScreen from '../Screens/Home';
import CartRecapScreen from '../Screens/CartRecap';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {ScrollView, SafeAreaView, Image, Text, View} from "react-native";
import Logo from '../assets/img/AppIcon.png'
import {Styles} from "../assets/style/Styles";
import Icon from "../Components/Icon";

const CustomDrawerContentComponent = props => (
    <ScrollView>
        <SafeAreaView
            forceInset={{top: 'always', horizontal: 'never'}}
        >
            <View style={{backgroundColor: '#fff', minHeight: 128, alignItems: 'center', justifyContent: 'center'}}>
                <Image
                    style={{width: 90, height: 90}}
                    source={Logo}
                />
            </View>
            <View style={{paddingVertical: 8}}>
                <DrawerItems {...props} />
            </View>
        </SafeAreaView>
    </ScrollView>
);
const RootStack = createDrawerNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                drawerIcon: <Icon color='#fff' name='home' size={24}/>,
                drawerLabel: 'Accueil'
            }
        },
        MyCart: {
            screen: CartRecapScreen,
            navigationOptions: {
                drawerIcon: <Icon isBadge={true} color='#fff' name='shopping-cart' size={24}/>,
                drawerLabel: 'Mon panier'
            }
        },
    },
    {
        initialRouteName: 'Home',
        drawerBackgroundColor: '#1976d2',
        contentComponent: CustomDrawerContentComponent,
        contentOptions: {
            activeTintColor: Styles.Palette.grey["100"],
            activeBackgroundColor: 'rgba(32, 148, 243, 0.2)',
            inactiveTintColor: Styles.Palette.grey["400"],
        }

    }
);
export default createAppContainer(
    RootStack
);
