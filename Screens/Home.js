import React from 'react';
import {View, Text, Alert, FlatList, ImageBackground} from 'react-native';
import MenuBar from "../Components/MenuBar";
import {Styles} from "../assets/style/Styles";
import {FoodList} from "../Components/FoodList";
import Button from "../Components/Button";
import {withPanierContext} from "../routes/PanierProvider";
import TouchableItem from "../Components/TouchableItem";
import Checkbox from "../Components/CheckBox";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            checked:false
        };
    }

    render() {
        const {navigation,context} = this.props;
        let newVal = FoodList[3];


        return (
            <View style={Styles.container}>
                <MenuBar leftElement="menu" onLeftElementPress={() => navigation.toggleDrawer()}
                         rightElement={"shopping-cart"} onRightElementPress={() => navigation.navigate('MyCart')}/>
                         <View style={Styles.subheader.container}>
                             <Text style={Styles.subheader.text}>Home</Text>
                         </View>
                <FlatList
                    data={FoodList} contentContainerStyle={{alignItems:'center'}} keyExtractor={item => item.id.toString()} numColumns={2} renderItem=
                    {({item}) =>
                        <TouchableItem  delayPressIn={50} onPress={()=>navigation.navigate('ItemDetails', { key: item.id })}  key={item.id}>
                            <View  style={{margin:11, alignItems:'center', justifyContent:'center'}}>

                                <ImageBackground style={{width :192 , height:256}} source={item.image}>
                                    <View style={{ paddingHorizontal:25, alignItems:'center', justifyContent:'center',flexDirection:'row', position:'absolute' , backgroundColor:"#336699"}}>
                                        <Text style={{color:'#fff', fontSize:24}}>{item.price} &euro;</Text>
                                        <Checkbox  checked={context.myCart.includes(item)} onCheck={(checked)=>{ this.handleToggleCbox(checked, item).then(r =>null) }}/>
                                    </View>
                                </ImageBackground>
                                <Text  style={{fontSize:20}}>{item.name}</Text>
                                <View style={{alignSelf:'flex-start',maxWidth:200, overflow:'hidden'}}>
                                    <Text  numberOfLines={2} style={{fontSize:14}}>{item.description}</Text>
                                </View>
                            </View>
                        </TouchableItem>

                } />
                <Button title="Test Vider panier" icon="delete" onPress={()=> {
                    if (context.myCart.length >0){
                        context.updatePanier([]).then(r => Alert.alert("Success","Le panier est vidée") )
                    }
                }}/>
            </View>
        );
    }
     handleToggleCbox = async (checked,item)=>{
        const {context} = this.props;
        let myCart = context.myCart;
        let tr = false;
         checked = myCart.includes(item);
         if (checked) {
             myCart.splice(myCart.indexOf(item));
            await context.updatePanier(myCart).then(r => tr = true)
         }else {
             myCart.push(item);
             await context.updatePanier(myCart).then(r => tr = true)
         }
         return tr;
     }
}

export default withPanierContext(Home);
