/* eslint-disable import/no-unresolved, import/extensions */
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {spacing, Styles} from "../assets/style/Styles";
import {Text, View} from "react-native";

const propTypes = {
    isBadge: PropTypes.bool,
    name: PropTypes.string.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    size: PropTypes.number,
    color: PropTypes.string,
    /**
     * Name of Icon set that should be use. From react-native-vector-icons
     */
    iconSet: PropTypes.string,
};
const defaultProps = {
    isBadge:false,
    size: null,
    color: null,
    style: null,
    iconSet: null,
};

const getIconComponent = iconSet => {
    switch (iconSet) {
        case 'Entypo':
            return Entypo;
        case 'EvilIcons':
            return EvilIcons;
        case 'Feather':
            return Feather;
        case 'FontAwesome':
            return FontAwesome;
        case 'Foundation':
            return Foundation;
        case 'Ionicons':
            return Ionicons;
        case 'MaterialIcons':
            return MaterialIcons;
        case 'MaterialCommunityIcons':
            return MaterialCommunityIcons;
        case 'Octicons':
            return Octicons;
        case 'Zocial':
            return Zocial;
        case 'SimpleLineIcons':
            return SimpleLineIcons;
        default:
            return MaterialIcons;
    }
};

class Icon extends PureComponent {
    constructor(props,context) {
        super(props,context);
        const badgeValue = context.badge || 10;
        this.state = {
            badgeValue
        }
    }
    render() {
        const { isBadge, name, style, size, color, iconSet } = this.props;
       const {badgeValue} = this.state;
        const iconColor = color || Styles.Palette.text.secondary;
        const iconSize = size || spacing.iconSize;
        const VectorIcon = getIconComponent(iconSet);
        if (isBadge){
            const showBadge = (badgeValue > 0 )
                ?
                <View style={Styles.badge.container}>
                    <Text style={Styles.badge.content}>
                        {badgeValue < 10 ? badgeValue: '9+'}
                    </Text>
                </View>
                :
                <VectorIcon iconSet={iconSet} name={name} color={color} size={iconSize} />;
            return (<View style={{flexDirection:'row'}}>

                <VectorIcon iconSet={iconSet} name={name} color={color} size={iconSize} />
                {showBadge}
            </View>);
        }

        return (
            <VectorIcon name={name} size={iconSize} color={iconColor} style={style} />
        );
    }
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
