import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {View, Text, ViewPropTypes} from "react-native";
import {Styles} from "../assets/style/Styles";
import Constants from 'expo-constants';
import BadgeButton from "./BadgeButton";

const propsType = {
    style: PropTypes.shape({
        container: ViewPropTypes.style,
        leftElementContainer: ViewPropTypes.style,
        // FIXME
        leftElement: PropTypes.any, // eslint-disable-line
        centerElementContainer: ViewPropTypes.style,
        titleText: Text.propTypes.style, // eslint-disable-line
        rightElementContainer: ViewPropTypes.style,
        rightElement: PropTypes.any, // eslint-disable-line
    }),
    /**
     * This size is used for each icon on the toolbar
     */
    size: PropTypes.number,
    /**
     * Will be shown on the left side.
     */
    leftElement: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    /**
     * Called when leftElement was pressed.
     */
    onLeftElementPress: PropTypes.func,
    /**
     * Will be shown between leftElement and rightElement. Usually use for title.
     */
    centerElement: PropTypes.string,
    /**
     * Will be shown on the right side.
     */
    rightElement: PropTypes.oneOfType([
        /**
         * Whatever you want to have on the right side
         */
        PropTypes.element,
        /**
         * One action (name of icon). Alias for ['icon1'].
         */
        PropTypes.string,
        /**
         * For many actions: ['icon1', 'icon2', ...]
         */
        PropTypes.arrayOf(PropTypes.string),
        /**
         * For actions and menu. The menu will be shown as last one icon.
         */
        PropTypes.shape({
            actions: PropTypes.arrayOf(
                PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
            ),
            menu: PropTypes.shape({
                icon: PropTypes.string,
                labels: PropTypes.arrayOf(PropTypes.string),
            }),
        }),
    ]),
    /**
     * Called when rightElement was pressed.
     */
    onRightElementPress: PropTypes.func,
};
const defaultProps = {
    onRightElementPress: null,
    rightElement: null,
    centerElement: Constants.manifest.name,
    leftElement: null,
    onLeftElementPress: null,
    size: 28,
};

function getStyles() {
    const {toolbar} = Styles;

    return toolbar;
}

class MenuBar extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {iconSet, size, onLeftElementPress, onRightElementPress, leftElement, rightElement, centerElement} = this.props;
        const styles = getStyles();
        let leftRender;
        let rightRender;
        //Handle Left elements
        if (leftElement != null) {
            if (React.isValidElement(leftElement)) {
                leftRender =
                    React.cloneElement(leftElement, {
                        key: 'customLeftElement',
                    });
            } else {
                leftRender =
                    <BadgeButton
                        isBadge={false}
                        key={leftElement}
                        name={leftElement}
                        color={styles.leftElement.color}
                        onPress={onLeftElementPress}
                        size={size}
                        iconSet={iconSet}
                        style={styles.leftElement}
                    />

            }
        }
        //Handle Right element
        let actionsMap = [];
        if (rightElement != null) {
            if (typeof rightElement === 'string') {
                actionsMap.push(rightElement);
            } else if (Array.isArray(rightElement)) {
                actionsMap = rightElement;
            } else if (rightElement.actions) {
                actionsMap = rightElement.actions;
            }
            if (actionsMap) {
                rightRender = actionsMap.map((action, index) => {
                    if (React.isValidElement(action)) {
                        return action;
                    }

                    return (
                        <BadgeButton
                            key={rightElement}
                            name={action}
                            color={styles.rightElement.color}
                            size={size}
                            style={styles.rightElement}
                            iconSet={iconSet}
                            onPress={() => onRightElementPress({action, index})}
                        />
                    );
                });
            }
            if (React.isValidElement(rightElement)) {
                rightRender.push(
                    React.cloneElement(rightElement, {key: 'customRightElement'}),
                );
            }

        }

        return (
            <View style={styles.container}>
                <View style={styles.leftElementContainer}>
                    {leftRender}
                </View>
                <View style={styles.centerElementContainer}>
                    <Text numberOfLines={1} style={styles.titleText}>{centerElement}</Text>
                </View>
                <View style={styles.rightElementContainer}>
                    {rightRender}
                </View>
            </View>
        );
    }
}

MenuBar.propTypes = propsType;
MenuBar.defaultProps = defaultProps;
export default MenuBar;
