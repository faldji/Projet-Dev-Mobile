import {Styles, spacing} from "../assets/style/Styles";
import {
    View,
    Text,
    StyleSheet,
    ViewPropTypes,
    TouchableWithoutFeedback,
    Animated, Easing, Platform
} from 'react-native';
import React, {PureComponent} from 'react';
import Icon from "./Icon";
import PropTypes from "prop-types";


const propTypes = {
    isBadge: PropTypes.bool,
    color: PropTypes.string,
    /**
     * Size of icon (default is 24 - see spacing in Styles)
     */
    size: PropTypes.number,
    /**
     * Name of icon to show
     */
    name: PropTypes.string,
    /**
     * Name of Icon set that should be use. From react-native-vector-icons
     */
    iconSet: PropTypes.string,
    /**
     * Call when icon was pressed
     */
    onPress: PropTypes.func,
    style: PropTypes.oneOfType([
        PropTypes.shape({
            container: ViewPropTypes.style,
            icon: Text.propTypes.style, // eslint-disable-line
        }),
        PropTypes.array,
    ]),
};
const defaultProps = {
    isBadge: true,
    onPress: null,
    color: null,
    size: 24,
    name: null,
    style: {},
    iconSet: null,
};

function getStyles(props, state) {
    const {badgeIcon} = Styles;

    const local = {};

    if (props.color) {
        local.icon = {
            color: props.color,
        };
    }

    if (state.containerSize) {
        local.container = {
            width: state.containerSize,
            height: state.containerSize,
        };
    }

    return {
        container: [badgeIcon.container, local.container, props.style.container],
        icon: [
            badgeIcon.icon,
            local.icon,
            props.style.icon,
        ],
    };
}

/**
 * Returns size of icon. Priority order: style prop, size prop, spacing.iconSize.
 */
function getIconSize(props) {
    const {icon} = props.style;

    if (icon && icon.width) {
        return icon.width;
    }
    if (props.size) {
        return props.size;
    }

    return spacing.iconSize;
}

function getContainerSize(iconSize) {
    return iconSize * 2;
}

class BadgeButton extends PureComponent {
    constructor(props, context) {
        super(props, context);

        const iconSize = getIconSize(props);
        const containerSize = getContainerSize(iconSize);

        this.state = {
            scaleValue: new Animated.Value(0.01),
            opacityValue: new Animated.Value(0.16),
            containerSize,
            iconSize,
            rippleSize: 0.9 * containerSize
        };
        this.onPressIn = this.onPressIn.bind(this);
        this.onPressOut = this.onPressOut.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        const {iconSize} = state;

        const nextIconSize = getIconSize(props);

        if (iconSize !== nextIconSize) {
            const containerSize = getContainerSize(iconSize);

            return {
                containerSize,
                iconSize,
            };
        }
        return null;
    }

    onPressIn() {
        const {scaleValue} = this.state;
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 225,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
            useNativeDriver: true,
        }).start();
    }

    onPressOut() {
        const {onPress} = this.props;
        const {scaleValue, opacityValue} = this.state;

        Animated.timing(opacityValue, {
            toValue: 0,
            useNativeDriver: true,
        }).start(() => {
            scaleValue.setValue(0.01);
            opacityValue.setValue(0.16);
        });

        if (onPress) {
            onPress();
        }
    }

    renderRippleView = styles => {
        const {scaleValue, opacityValue, containerSize, rippleSize} = this.state;

        const color = StyleSheet.flatten(styles.icon).color;
        const top = (containerSize - rippleSize) / 2;

        return (
            // we need set zindex for iOS, because the components with elevation have the
            // zindex set as well, thus, there could be displayed backgroundColor of
            // component with bigger zindex - and that's not good
            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        top,
                        left: top,
                        width: rippleSize,
                        height: rippleSize,
                        borderRadius: rippleSize / 2,
                        transform: [{scale: scaleValue}],
                        opacity: opacityValue,
                        backgroundColor: color.toString(),
                        zIndex: Platform.OS === 'ios' ? 1 : null,
                    },
                ]}
            />
        );
    };

    renderIcon = styles => {
        const {name, iconSet, isBadge} = this.props;
        const {iconSize} = this.state;
        const {color} = StyleSheet.flatten(styles.icon);
        if (isBadge)
            return <Icon isBadge={true} iconSet={iconSet} name={name} color={color} size={iconSize}/>;
        return <Icon iconSet={iconSet} name={name} color={color} size={iconSize}/>;
    };

    render() {

        const styles = getStyles(this.props, this.state);
        const {testID} = this.props;
        return (
            <TouchableWithoutFeedback
                testID={testID}
                onPressIn={this.onPressIn}
                onPressOut={this.onPressOut}
            >
                <View>
                    {this.renderRippleView(styles)}
                    <View style={styles.container}>{this.renderIcon(styles)}</View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

BadgeButton.propTypes = propTypes;
BadgeButton.defaultProps = defaultProps;

export default BadgeButton;
