import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Constants } from 'expo';
import foodlist from '../Components/foodList';

export default class foodView extends Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Hello, world!</Text>
        </View>
      );
    }
  }