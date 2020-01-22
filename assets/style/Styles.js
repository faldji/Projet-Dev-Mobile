import {StyleSheet,Platform} from "react-native";
import {Palette} from "./Colors";
export const getPlatformElevation = elevation => {
    if (Platform.OS === 'ios'){
        if (elevation === 0) {
            return {
                shadowColor: 'transparent',
                zIndex: 0,
            };
        }
        return {
            shadowColor: Palette.black,
            shadowOpacity: 0.3,
            shadowRadius: elevation / 2,
            shadowOffset: {
                height: 1,
                width: 0,
            },
            // we need to have zIndex on iOS, otherwise the shadow is under components that
            // are rendered later
            zIndex: 1,
        };
    }
    return {elevation};

};
export const fontWeight = {
    light: '300',
    normal: '400',
    medium: '500',
    bold: '800',
};
export const spacing={
    iconSize: 50,
};
export const Styles = {
    Palette,
    badge: StyleSheet.create({
        container: {
            position: 'absolute',
            top: -8 ,
            left: spacing.iconSize /2,
            width: 18,
            height: 18,
            borderRadius: 9,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Palette.secondary.main,

        },
        content: {
            color: Palette.white,
            fontWeight: fontWeight.medium,
            fontSize: 12,
        },
    }),
    badgeIcon: StyleSheet.create({
        container: {
            width: spacing.iconSize * 2,
            height: spacing.iconSize * 2,
            alignItems: 'center',
            justifyContent: 'center',
        },
        icon: {
            color: Palette.text.secondary,
        },
    }),
    button: StyleSheet.create({
        container: {
            padding: 10,
            margin:5,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
            borderRadius: 2,
            flexDirection: 'row',
            backgroundColor:Palette.primary.main
        },
        text: {
            color: Palette.black,
            fontWeight: fontWeight.medium,
            fontSize: 20,
            padding:5,
        },

        icon: {
            marginRight: 8,
        },
    }),
    buttonDisabled: StyleSheet.create({
        container: {
            backgroundColor: 'rgba(0,0,0,0.12)',
        },
        text: {
            color: Palette.text.disabled,
        },
    }),
    card: StyleSheet.create({
        container: {
            backgroundColor: Palette.white,
            borderRadius: 2,
            marginVertical: 4,
            marginHorizontal: 8,
            overflow: 'hidden',
            ...getPlatformElevation(2),
        },
    }),
    checkbox: StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
        },
        icon: {
            color: Palette.secondary.other,
        },
        label: {
            color: Palette.black,
            marginLeft: 20,
            flex: 1,
        },
    }),
    listItem: StyleSheet.create({
        container: {
            backgroundColor:'rgba(255, 255, 220, 0.2)',
            height: 132,
            marginBottom:20,
        },
        contentViewContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
        },
        leftElementContainer: {
            width: 120,
            margin: 10,
        },
        centerElementContainer: {
            flex: 1,
        },
        image:{
            width:120,
            height:120,
            borderRadius:60,
        },
        textViewContainer: {
        },
        TotalPriceContainer:{
            margin:20,
            borderRadius:5,
            flexDirection:'row-reverse'
        },
        TotalPriceText:{
            color: Palette.primary.main,
            fontWeight: fontWeight.bold,
            fontSize: 22,
            padding:10,
            margin :5
        },
        primaryText: {
            color: Palette.text.primary,
            fontWeight: fontWeight.normal,
            fontSize: 20,
        },
        firstLine: {
            flexDirection: 'row',
        },
        primaryTextContainer: {
            flex: 1,
        },
        secondaryText: {
            color: Palette.text.secondary,
            fontWeight: fontWeight.normal,
            fontSize: 16,
        },
        tertiaryText: {
            color: Palette.text.secondary,
            fontWeight: fontWeight.normal,
            fontSize: 14,
        },
        rightElementContainer: {
            backgroundColor: 'transparent',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'row'
        },
        leftElement: {
            margin: 20,
            color: Palette.text.secondary,
        },
        rightElement: {
            backgroundColor: Palette.secondary.main,
            borderRadius:10,
            color:Palette.white,
            fontWeight:fontWeight.normal,
            paddingLeft:15,
            paddingRight:15,
            alignSelf:'center',
            fontSize:20
        },
    }),
    subheader:StyleSheet.create({
        container: {
            height: 64,
            justifyContent: 'center',
        },
        text: {
            color: Palette.text.secondary,
            fontWeight: fontWeight.normal,
            fontSize: 32,
        },
    }),
    toolbar: StyleSheet.create({
        container: {
            backgroundColor: Palette.primary.other,
            height: 80,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 4,
            overflow: 'hidden',
            ...getPlatformElevation(4),
        },
        leftElementContainer: {
            backgroundColor: 'transparent',
        },
        leftElement: {
            color: Palette.black,
        },
        centerElementContainer: {
            flex: 1,
            marginLeft: 20,
        },
        titleText: {
            color: Palette.black,
            fontWeight: fontWeight.medium,
            fontSize: 20,
            marginLeft: 16,
        },
        rightElementContainer: {
            flexDirection: 'row',
            backgroundColor: 'transparent',
        },
        rightElement: {
            color: Palette.black,
        },
    }),
    fontFamily: 'Roboto',
    container: {
        flex: 1
    },
    inputForm: StyleSheet.create({
        container: {
            paddingHorizontal: 25,
        },
        spacedRow: {
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center'
        },
        contentText:{
            textAlign:'center',
            fontSize: 20,
            height:32,
            margin: 10,
            color:Palette.black,
            borderBottomWidth:1,
        }
    }),
    centerText: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color:Palette.black
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
};
