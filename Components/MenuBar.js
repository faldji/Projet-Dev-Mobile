import {Constants} from "react-native-unimodules";
import {Toolbar} from "react-native-material-ui";
import React ,{Component}from "react";

class MenuBar  extends Component{
    render() {
        return (
            <Toolbar leftElement="menu" centerElement={Constants.manifest.name}/>
        );
    }
}
export default MenuBar;
