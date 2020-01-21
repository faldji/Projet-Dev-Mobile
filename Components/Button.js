import React,{PureComponent} from 'react';
import {Text, View, ViewPropTypes, StyleSheet} from 'react-native';
import TouchableItem from "./TouchableItem";
import PropTypes from 'prop-types';
import {getPlatformElevation, Styles} from "../assets/style/Styles";
import Icon from "./Icon";
const propTypes = {
    /**
     * If true button will be disabled
     */
    disabled: PropTypes.bool,
    /**
     * Called when button is pressed. Text is passed as param
     */
    onPress: PropTypes.func,
    /**
     * Text will be shown on button
     */
    title: PropTypes.string.isRequired,
    /**
     * If specified it'll be shown before text
     */
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    /**
     * Name of Icon set that should be use. From react-native-vector-icons
     */
    iconSet: PropTypes.string,
    /**
     * You can override any style for this button
     */
    style: PropTypes.shape({
        container: ViewPropTypes.style,
        text: Text.propTypes.style, // eslint-disable-line
    })
};
const defaultProps = {
    icon: null,
    onPress: null,
    disabled: false,
    iconSet: null,
    style: {},
};

function getStyles(props, state) {
    const { disabled} = props;
    const {
        button,
        buttonDisabled,
        Palette,
    } = Styles;

    const local = {
        container: {},
    };

    if (!disabled) {
        local.container.backgroundColor=Palette.secondary.other;
        local.text = { color: Palette.white};

    }
    local.container = {
            ...local.container,
            ...getPlatformElevation(state.elevation),
        };

    return {
        container: [
            button.container,
            disabled && buttonDisabled.container,
            local.container,
            props.style.container,
        ],
        text: [
            button.text,
            disabled && buttonDisabled.text,
            local.text,
            props.style.text,
        ],
        icon: [
            button.icon,
            disabled && buttonDisabled.icon,
            local.icon,
            props.style.icon,
        ],
    };
}


export default class   Button extends PureComponent {constructor(props) {
    super(props);
    this.state = {
        elevation: 2, // eslint-disable-line
    };
}

    onPress = () => {
        const { title, onPress } = this.props;

        if (onPress) {
            onPress(title);
        }
    };

    setElevation = () => {
        this.setState({
            elevation: 4, // eslint-disable-line
        });
    };

    removeElevation = () => {
        this.setState({
            elevation: 2, // eslint-disable-line
        });
    };

    renderIcon = styles => {
        const { icon, iconSet } = this.props;
        const textFlatten = StyleSheet.flatten(styles.text);

        if (!icon) {
            return null;
        }

        let result;

        if (React.isValidElement(icon)) {
            result = icon;
        } else if (typeof icon === 'string') {
            result = (
                <Icon
                    iconSet={iconSet}
                    name={icon}
                    color={textFlatten.color}
                    style={styles.icon}
                    size={24}
                />
            );
        }

        return result;
    };

    render() {
        const {
            title,
            disabled,
        } = this.props;

        const styles = getStyles(this.props, this.state);

        const content = (
            <View style={styles.container}>
                {this.renderIcon(styles)}
                <Text style={styles.text}>{title}</Text>
            </View>
        );

        if (disabled) {
            return <View style={{flexDirection:'row',alignSelf:'center' , padding:25}}  >{content}</View>;
        }

        return (
            <View style={{flexDirection:'row',alignSelf:'center' , padding:25}}  >
            <TouchableItem
                onPress={!disabled ? this.onPress : null}
                onPressIn={ this.setElevation}
                onPressOut={  this.removeElevation}
                delayPressIn={50}
            >
                {content}
            </TouchableItem>
            </View>
        );
    }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
