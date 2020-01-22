/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    ViewPropTypes,Alert,
} from 'react-native';

import Icon from "./Icon";
import {Styles} from "../assets/style/Styles";
import TouchableItem from "./TouchableItem";
import Checkbox from "./CheckBox";
import {withPanierContext} from "../routes/PanierProvider";
const propTypes = {
    onPress: PropTypes.func,
    onPressValue: PropTypes.any, // eslint-disable-line
    /**
     * Name of Icon set that should be use. From react-native-vector-icons
     */
    iconSet: PropTypes.string,
    /**
     * Called when list item is long pressed.
     */
    onLongPress: PropTypes.func,
    numberOfLines: PropTypes.oneOf([1, 2, 3, 'dynamic']),
    style: PropTypes.shape({
        container: ViewPropTypes.style || View.propTypes.style,
        contentViewContainer: ViewPropTypes.style || View.propTypes.style,
        leftElementContainer: ViewPropTypes.style || View.propTypes.style,
        centerElementContainer: ViewPropTypes.style || View.propTypes.style,
        textViewContainer: ViewPropTypes.style || View.propTypes.style,
        primaryText: Text.propTypes.style, // eslint-disable-line
        firstLine: ViewPropTypes.style || View.propTypes.style,
        primaryTextContainer: Text.propTypes.style, // eslint-disable-line
        secondaryText: Text.propTypes.style, // eslint-disable-line
        tertiaryText: Text.propTypes.style, // eslint-disable-line
        rightElementContainer: ViewPropTypes.style || View.propTypes.style,
        leftElement: PropTypes.style,
        rightElement: PropTypes.style,
    }),

    // left side
    leftElement: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    onLeftElementPress: PropTypes.func,

    // center side
    centerElement: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
        PropTypes.shape({
            primaryText: PropTypes.string.isRequired,
            secondaryText: PropTypes.string,
            tertiaryText: PropTypes.string,
        }),
    ]),

    // right side
    rightElement: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
        PropTypes.shape({
            actions: PropTypes.shape(
                {
                    item: PropTypes.any
                }),
        }),
    ]),
    onRightElementPress: PropTypes.func,
    /**
     * Children passed into the `ListItem`.
     */
    children: PropTypes.node,
};
const defaultProps = {
    onPress: null,
    onPressValue: null,
    onLongPress: null,
    leftElement: null,
    onLeftElementPress: null,
    centerElement: null,
    rightElement: null,
    onRightElementPress: null,
    numberOfLines: 1,
    children: null,
    style: {},
    iconSet: null,
};

function getNumberOfSecondaryTextLines(numberOfLines) {
    if (numberOfLines === 'dynamic') {
        return null;
    }

    return numberOfLines - 1;
}
function getNumberOfLines(props) {
    const { numberOfLines, centerElement } = props;

    if (
        centerElement &&
        centerElement.secondaryText &&
        centerElement.tertiaryText &&
        (!numberOfLines || numberOfLines < 3)
    ) {
        return 3;
    }
    if (
        centerElement &&
        centerElement.secondaryText &&
        (!numberOfLines || numberOfLines < 2)
    ) {
        return 2;
    }

    return numberOfLines || 1;
}
/**
 * Please see this: https://material.google.com/components/lists.html#lists-specs
 */
function getListItemHeight(props, state) {
    const { leftElement} = props;
    const { numberOfLines } = state;

    if (numberOfLines === 'dynamic') {
        return null;
    }
    if (leftElement && typeof leftElement !== 'string')
        return 156;
    if (!leftElement && numberOfLines === 1) {
        return  48;
    }

    if (numberOfLines === 1) {
        return  56;
    }
    if (numberOfLines === 2) {
        return  72;
    }
    if (numberOfLines === 3) {
        return  88;
    }

    return null;
}
function getStyles(props, state) {
    const { leftElement, rightElement} = props;
    const { listItem ,Palette} = Styles;
    const { numberOfLines } = state;

    const container = {
        height: getListItemHeight(props, state) < 90?90:128,
    };
    const contentViewContainer = {};
    const leftElementContainer = {};
    const centerElementContainer = {};

    if (numberOfLines === 'dynamic') {
        contentViewContainer.paddingVertical = 16;
        leftElementContainer.alignSelf = 'flex-start';
    }

    if (!rightElement) {
        contentViewContainer.paddingRight = 16;
    }
    if (!leftElement) {
        centerElementContainer.paddingLeft = 16;
    }

    return {
        Palette,
        container: [listItem.container, container, props.style.container],
        content: [listItem.content, props.style.content],
        contentViewContainer: [
            listItem.contentViewContainer,
            contentViewContainer,
            props.style.contentViewContainer,
        ],
        leftElementContainer: [
            listItem.leftElementContainer,
            leftElementContainer,
            props.style.leftElementContainer,
        ],
        centerElementContainer: [
            listItem.centerElementContainer,
            centerElementContainer,
            props.style.centerElementContainer,
        ],
        textViewContainer: [
            listItem.textViewContainer,
            props.style.textViewContainer,
        ],
        primaryText: [listItem.primaryText, props.style.primaryText],
        firstLine: [listItem.firstLine, props.style.firstLine],
        primaryTextContainer: [
            listItem.primaryTextContainer,
            props.style.primaryTextContainer,
        ],
        secondaryText: [listItem.secondaryText, props.style.secondaryText],
        tertiaryText: [listItem.tertiaryText, props.style.tertiaryText],
        rightElementContainer: [
            listItem.rightElementContainer,
            props.style.rightElementContainer,
        ],
        leftElement: [listItem.leftElement, props.style.leftElement],
        rightElement: [listItem.rightElement, props.style.rightElement],

    };
}

class ListItem extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            numberOfLines: getNumberOfLines(props),
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.setState({ numberOfLines: getNumberOfLines(prevProps) });
    }

    onListItemPressed = () => {
        const { onPress, onPressValue } = this.props;

        if (onPress) {
            onPress(onPressValue);
        }
    };

    onListItemLongPressed = () => {
        const { onLongPress, onPressValue } = this.props;

        if (onLongPress) {
            onLongPress(onPressValue);
        }
    };

    onLeftElementPressed = () => {
        const { onLeftElementPress, onPress, onPressValue } = this.props;

        if (onLeftElementPress) {
            onLeftElementPress(onPressValue);
        } else if (onPress) {
            onPress(onPressValue);
        }
    };

    onRightElementPressed = () => {
        const { onRightElementPress, onPressValue } = this.props;

        if (onRightElementPress) {
            onRightElementPress(onPressValue);
        }
    };

    getPointerEvents = () => {
        // 'box-only' fixes misplaced ripple effect, but ruins click events for subviews.
        // It's suitable only for simple cases with no touchable views, except the main one.
        const {
            onLeftElementPress,
            leftElement,
            centerElement,
            rightElement,context
        } = this.props;
        return onLeftElementPress ||
        React.isValidElement(leftElement) ||
        React.isValidElement(centerElement) ||
        rightElement
            ? 'auto'
            : 'box-only';
    };

    renderLeftElement = styles => {
        const { leftElement, iconSet } = this.props;

        if (!leftElement) {
            return null;
        }

        const flattenLeftElement = StyleSheet.flatten(styles.leftElement);
        let content = null;

        if (typeof leftElement === 'string') {
            content = (
                <TouchableWithoutFeedback onPress={this.onLeftElementPressed}>
                    <Icon
                        iconSet={iconSet}
                        name={leftElement}
                        color={flattenLeftElement.color}
                    />
                </TouchableWithoutFeedback>
            );
        }
        else
        if (React.isValidElement(leftElement)) {
            content= React.cloneElement(leftElement);
        } else {
            content = (
                <TouchableWithoutFeedback onPress={this.onLeftElementPressed}>
                    <View>{leftElement}</View>
                </TouchableWithoutFeedback>
            );
        }

        return <View style={styles.leftElementContainer}>{content}</View>;
    };

    renderCenterElement = styles => {
        const { centerElement } = this.props;
        const { numberOfLines } = this.state;

        const numberOfSecondaryTextLines = getNumberOfSecondaryTextLines(
            numberOfLines,
        );
        let content = null;

        if (React.isValidElement(centerElement)) {
            content = centerElement;
        } else if (centerElement) {
            let primaryText = null;
            let secondaryText = null;
            let tertiaryText = null;

            if (typeof centerElement === 'string') {
                primaryText = centerElement;
            } else {
                /* eslint-disable prefer-destructuring */
                primaryText = centerElement.primaryText;
                secondaryText = centerElement.secondaryText;
                tertiaryText = centerElement.tertiaryText;
                /* eslint-enable prefer-destructuring */
            }
            const secondLineNumber = !tertiaryText ? numberOfSecondaryTextLines : 1;
            const thirdLineNumber = tertiaryText ? numberOfSecondaryTextLines : 1;
            content = (
                <View style={styles.textViewContainer}>
                    <View style={styles.firstLine}>
                        <View style={styles.primaryTextContainer}>
                            <Text numberOfLines={1} style={styles.primaryText}>
                                {primaryText}
                            </Text>
                        </View>
                    </View>
                    {!!secondaryText && (
                        <View>
                            <Text
                                numberOfLines={secondLineNumber}
                                style={styles.secondaryText}
                            >
                                {secondaryText}
                            </Text>
                        </View>
                    )}
                    {!!tertiaryText && (
                        <View>
                            <Text numberOfLines={thirdLineNumber} style={styles.tertiaryText}>
                                {tertiaryText}
                            </Text>
                        </View>
                    )}
                </View>
            );
        }

        return <View style={styles.centerElementContainer}>{content}</View>;
    };

    renderRightElement = styles => {
        const { rightElement, context } = this.props;

        let content = [];
        let elements = null;

        if (typeof rightElement === 'string') {
            elements = [rightElement];
        } else if (Array.isArray(rightElement)) {
            elements = rightElement;
        } else if (rightElement && rightElement.actions) {
            elements = [rightElement.actions];
        }

        const flattenRightElement = StyleSheet.flatten(styles.rightElement);

        if (elements) {
            content = elements.map(action =>
                <View key={action.item.id} style={styles.rightElementContainer}>
                    <Text style={flattenRightElement}>{action.item.price}  &euro;</Text>
                    <Checkbox checked={context.myCart.includes(action.item)} onCheck={(checked) =>  this.handleDeleteItem(checked,action.item) } />
                </View>
            )
        }
        return content;
    };
    handleDeleteItem = async (checked,item)=>{
        const {context } = this.props;
        let myCart = context.myCart;
        let rt =false
        checked = myCart.includes(item);
        if (checked)
        Alert.alert(
            'Supprimer '+item.name,
            'Voulez-vous vraiment supprimer "'+item.name+'" du panier?', [{
                text: 'Cancel',
                onPress:  () => {
                    rt = false
                },
                style: 'cancel'
            }, {
                text: 'OK',
                onPress:  async () => {myCart.splice(myCart.indexOf(item),1);await context.updatePanier(myCart).then(r =>  rt=true)}
            }, ], {
                cancelable: false
            });
        return rt;
    };
    renderContent = styles => (
        <View
            style={styles.contentViewContainer}
            pointerEvents={this.getPointerEvents()}
        >
            {this.renderLeftElement(styles)}
            {this.renderCenterElement(styles)}
            {this.renderRightElement(styles)}
        </View>
    );

    render() {
        const { onPress, onLongPress } = this.props;

        const styles = getStyles(this.props, this.state);

        // renders left element, center element and right element
        let content = (
            <View style={styles.container}>{this.renderContent(styles)}</View>
        );

        if (onPress || onLongPress) {
            content = (
                <TouchableItem
                    delayPressIn={50}
                    onPress={this.onListItemPressed}
                    onLongPress={this.onListItemLongPressed}
                >
                    {content}
                </TouchableItem>
            );
        }

        return (  content
        );
    }
}

ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;

export default  withPanierContext(ListItem);
