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
};
export const spacing={
    actionButtonSize: 56,
    iconSize: 24,
    avatarSize: 40,
};
export const Styles = {
    Palette,
    actionButton: StyleSheet.create({
        positionContainer: {
            position: 'absolute',
            bottom: 20,
            right: 20,
        },
        container: {
            height: spacing.actionButtonSize,
            width: spacing.actionButtonSize,
            borderRadius: spacing.actionButtonSize / 2,
            backgroundColor: Palette.secondary.main,
        },
        overlayContainer: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(255,255,255,0.8)',
            // we need overlay to be above the toolbar - so maybe we could use some variable
            // to get elevation for toolbar and this overlay
            ...getPlatformElevation(4),
        },
        toolbarPositionContainer: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
        },
        toolbarContainer: {
            flex: 1,
            height: spacing.actionButtonSize,
            backgroundColor: Palette.secondary.main,
            flexDirection: 'row',
        },
        toolbarActionContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        speedDialContainer: {
            alignItems: 'flex-end',
        },
        speedDialActionContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 8,
        },
        speedDialActionIconContainer: {
            width: spacing.actionButtonSize,
            height: spacing.actionButtonSize,
            alignItems: 'center',
            justifyContent: 'center',
        },
        speedDialActionIcon: {
            ...getPlatformElevation(2),
            height: spacing.actionButtonSize - 16,
            width: spacing.actionButtonSize - 16,
            borderRadius: (spacing.actionButtonSize - 16) / 2,
            backgroundColor: Palette.grey["500"],
        },
        speedDialActionLabel: {
            color: Palette.secondary.contrastText,
        },
        speedDialActionLabelContainer: {
            ...getPlatformElevation(2),
            borderRadius: 2,
            marginRight: 24,
            paddingVertical: 2,
            paddingHorizontal: 8,
            backgroundColor: Palette.grey["100"],
        },
        icon: {
            color: Palette.white,
        },
    }),
    badge: StyleSheet.create({
        container: {
            position: 'absolute',
            top: -8 ,
            left: spacing.iconSize - 5,
            width: 16,
            height: 16,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Palette.secondary.main,

        },
        strokeContainer: {
            position: 'absolute',
            width: 16,
            height: 16,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Palette.white,
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
            height: 36,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
            borderRadius: 2,
            flexDirection: 'row',
        },
        text: {
            color: Palette.black,
            fontWeight: fontWeight.medium,
            fontSize: 14,},
        icon: {
            marginRight: 8,
        },
    }),
    buttonDisabled: StyleSheet.create({
        text: {
            color: Palette.text.disabled,
        },
    }),
    buttonRaised: StyleSheet.create({
        container: {
            backgroundColor: '#fff',
            borderColor: 'rgba(0,0,0,0.12)',
        },
    }),
    buttonRaisedDisabled: StyleSheet.create({
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
            color: Palette.primary.main,
        },
        label: {
            color: Palette.black,
            marginLeft: 20,
            flex: 1,
        },
    }),
    divider: StyleSheet.create({
        container: {
            backgroundColor: 'rgba(0,0,0,0.12)',
            height: StyleSheet.hairlineWidth,
        },
    }),
    listItem: StyleSheet.create({
        container: {
            backgroundColor: Palette.white,
            height: 56,
        },
        contentViewContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
        },
        leftElementContainer: {
            width: 56,
            marginLeft: 16,
        },
        centerElementContainer: {
            flex: 1,
        },
        textViewContainer: {},
        primaryText: {
            lineHeight: 24,
            color: Palette.text.primary,
            fontWeight: fontWeight.normal,
            fontSize: 16,
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
            fontSize: 14,
            lineHeight: 20,
        },
        tertiaryText: {
            color: Palette.text.secondary,
            fontWeight: fontWeight.normal,
            fontSize: 14,
            lineHeight: 20,
        },
        rightElementContainer: {
            paddingRight: 4,
            flexDirection: 'row',
            backgroundColor: 'transparent',
        },
        leftElement: {
            margin: 16,
            color: Palette.text.secondary,
        },
        rightElement: {
            color: Palette.text.secondary,
        },
    }),
    subheader:StyleSheet.create({
        container: {
            height: 48,
            justifyContent: 'center',
        },
        text: {
            color: Palette.text.secondary,
            fontWeight: fontWeight.medium,
            fontSize: 14,
            lineHeight: 24,
        },
    }),
    toolbar: StyleSheet.create({
        container: {
            backgroundColor: Palette.primary.light,
            height: 56,
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
            color: Palette.white,
        },
        centerElementContainer: {
            flex: 1,
            marginLeft: 20,
        },
        titleText: {
            color: Palette.white,
            fontWeight: fontWeight.medium,
            fontSize: 20,
            marginLeft: 16,
        },
        rightElementContainer: {
            flexDirection: 'row',
            backgroundColor: 'transparent',
        },
        rightElement: {
            color: Palette.white,
        },
    }),
    fontFamily: 'Roboto',
    container: {
        flex: 1
    },
    row: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
};
