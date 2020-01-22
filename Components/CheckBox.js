/* eslint-disable import/no-unresolved, import/extensions */
import {StyleSheet, Text, View, ViewPropTypes} from 'react-native';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Styles} from "../assets/style/Styles";
import BadgeButton from "./BadgeButton";
import TouchableItem from "./TouchableItem";
/* eslint-enable import/no-unresolved, import/extensions */

const propTypes = {
    /**
     * Text will be shown after Icon
     */
    label: PropTypes.string,
    /**
     * True if it's check
     */
    checked: PropTypes.bool.isRequired,
    /**
     * Is checkbox active
     */
    disabled: PropTypes.bool,
    /**
     * Will be shown when checked is false
     */
    uncheckedIcon: PropTypes.string,
    /**
     * Will be shown when checked is true
     */
    checkedIcon: PropTypes.string,
    /**
     * Event that is called when state is changed
     */
    onCheck: PropTypes.func,
    /**
     * Name of Icon set that should be use. From react-native-vector-icons
     */
    iconSet: PropTypes.string,
    style: PropTypes.shape({
        container: ViewPropTypes.style || View.propTypes.style,
        // FIXME:
        icon: PropTypes.any, // eslint-disable-line
        label: Text.propTypes.style, // eslint-disable-line
    }),
    /**
     * Size of icon
     */
    size: PropTypes.number,
};
const defaultProps = {
    checkedIcon: 'check-box',
    uncheckedIcon: 'check-box-outline-blank',
    disabled: false,
    style: {},
    size: 24,
    iconSet: null,
};

function getStyles(props) {
    const { disabled}= props;
    const { checkbox, Palette } = Styles;

    const local = {};

    return {
        container: [checkbox.container, local.container, props.style.container],
        icon: [checkbox.icon, props.style.icon],
        label: [
            checkbox.label,
            local.label,
            props.style.label,
            // disabled has the highest priority
            disabled && { color: Palette.text.disabled },
        ],
    };
}

class Checkbox extends PureComponent {
    constructor(props) {
        super(props);
    }
    onPress = () => {
        const {disabled, onCheck,checked} = this.props;
        if (!disabled && onCheck) {
            (onCheck(!checked))
    }
    };

    render() {
        const {
            checkedIcon,
            uncheckedIcon,
            disabled,
            size,
            label,
            iconSet,
            checked
        } = this.props;
        const styles = getStyles(this.props);

        const labelColor = StyleSheet.flatten(styles.label).color;
        const iconColor = StyleSheet.flatten(styles.icon).color;
        const labelRend = label && <Text style={styles.label}>{label}</Text>;
        const element= (<View>
            <BadgeButton
                isBadge={false}
                key={`${checked}`}
                name={checked ? checkedIcon : uncheckedIcon}
                disabled={disabled}
                color={checked ? iconColor : labelColor}
                onPress={this.onPress}
                iconSet={iconSet}
                size={size}
            />
            {labelRend}
            </View>
        );
        if (disabled)
            return element;
        return <TouchableItem>{element}</TouchableItem>
    }
}

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default  Checkbox;
