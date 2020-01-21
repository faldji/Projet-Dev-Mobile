import React from 'react';
import {createAppContainer} from 'react-navigation';


import HomeScreen from '../Screens/Home';
import CartRecapScreen from '../Screens/CartRecap';
import ItemDetailsScreen from "../Screens/ItemDetails";
import SuccessScreen from "../Screens/Success";
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {ScrollView, SafeAreaView, Image, Text, View} from "react-native";
import Logo from '../assets/img/AppIcon.png'
import {Styles} from "../assets/style/Styles";
import Icon from "../Components/Icon";
import {Palette} from "../assets/style/Colors";

const navBarItemsToHide = ['ItemDetails','Success'];
const CustomDrawerContentComponent = props => {
    const clonedProps = {
        ...props,
        items: props.items.filter(item => !navBarItemsToHide.includes(item.key)),};
    return(
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
                    <DrawerItems {...clonedProps} />
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}
const RootStack = createDrawerNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                drawerIcon: <Icon color={Palette.black} name='home' size={24}/>,
                drawerLabel: 'Accueil'
            }
        },

        MyCart: {
            screen: CartRecapScreen,
            navigationOptions: {
                drawerIcon: <Icon isBadge={true} color={Palette.black} name='shopping-cart' size={24}/>,
                drawerLabel: 'Mon panier'
            }
        },
        ItemDetails: {
            screen: ItemDetailsScreen
        },
        Success: {
            screen: SuccessScreen
        }
    },
    {
        initialRouteName: 'Home',
        drawerBackgroundColor: Palette.primary.other,
        contentComponent: CustomDrawerContentComponent,
        contentOptions: {
            activeTintColor: Styles.Palette.text.primary,
            activeBackgroundColor: 'rgba(255, 255, 220, 0.2)',
            inactiveTintColor: Styles.Palette.grey["400"],
        }

    }
);
export default createAppContainer(
    RootStack
);
