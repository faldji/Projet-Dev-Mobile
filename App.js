import React ,{Component}from 'react';
import AppNavigator from "./routes/AppNavigator";
import PanierProvider from "./routes/PanierProvider";

export default class App extends Component {
  render() {
    return <PanierProvider>
      <AppNavigator />
    </PanierProvider>;
  }
}


