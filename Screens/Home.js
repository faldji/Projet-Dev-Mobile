import React from 'react';
import {View, Text, Alert, FlatList, ImageBackground, AsyncStorage} from 'react-native';
import MenuBar from "../Components/MenuBar";
import {Styles} from "../assets/style/Styles";
import {FoodList} from "../Components/FoodList";
import {withPanierContext} from "../routes/PanierProvider";
import TouchableItem from "../Components/TouchableItem";
import Checkbox from "../Components/CheckBox";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            foodList:FoodList.map(value => {return {item:value,checked :false}})
        };
    }
    UNSAFE_componentWillReceiveProps(nextProps, nextContext)  {
        this.setState((prevState)=> {return {foodList:prevState.foodList.map(
            value =>   nextProps.context.myCart.some(someCartValue => someCartValue.id === value.item.id) ? {item:value.item,checked:true}:{item:value.item,checked:false}
        )}});
    }

    componentDidMount(){
        const {foodList} = this.state;
        AsyncStorage.getItem('@MyCart:key',(error,result)=>{
            if (!error){
                if (result !== null){
                    let myCart = JSON.parse(result);
                    if (myCart){
                        if (!Array.isArray(myCart))
                            myCart = [myCart];

                        this.setState({foodList:foodList.map(
                                value =>   myCart.some(someCartValue => someCartValue.id === value.item.id) ? {item:value.item,checked:true}:{item:value.item,checked:false}
                            )});
                    }
                }
            }

        });

    };

    render() {
        const {navigation} = this.props;
        const {foodList} = this.state;
        return (
            <View style={Styles.container}>
                <MenuBar leftElement="menu" onLeftElementPress={() => navigation.toggleDrawer()}
                         rightElement={"shopping-cart"} onRightElementPress={() => navigation.navigate('MyCart')}/>
                <View style={Styles.subheader.container}>
                    <Text style={Styles.subheader.text}>Home</Text>
                </View>
                <FlatList
                    data={foodList} contentContainerStyle={{alignItems:'center'}} keyExtractor={item => item.item.id.toString()} numColumns={2} renderItem=
                    {({item}) =>
                        <TouchableItem  delayPressIn={50} onPress={()=>navigation.navigate('ItemDetails', { key: item.item.id })}  key={item.id}>
                            <View  style={{margin:11, alignItems:'center', justifyContent:'center'}}>

                                <ImageBackground style={{width :192 , height:256}} source={item.item.image}>
                                    <View style={{ paddingHorizontal:25, alignItems:'center', justifyContent:'center',flexDirection:'row', position:'absolute' , backgroundColor:"#336699"}}>
                                        <Text style={{color:'#fff', fontSize:24}}>{item.item.price} &euro;</Text>
                                        <Checkbox  checked={item.checked} onCheck={()=>this.handleToggleCbox(item.item)}/>
                                    </View>
                                </ImageBackground>
                                <Text  style={{fontSize:20}}>{item.item.name}</Text>
                                <View style={{alignSelf:'flex-start',maxWidth:200, overflow:'hidden'}}>
                                    <Text  numberOfLines={2} style={{fontSize:14}}>{item.item.description}</Text>
                                </View>
                            </View>
                        </TouchableItem>

                    } />
            </View>
        );
    }
    handleToggleCbox = (item)=>{
        const {context} = this.props;
        let myCart = context.myCart;
        const {foodList} = this.state;
        if (myCart.length === 0)
            foodList.forEach(value => {if (value.checked)myCart.push(value.item)});

        let checked = myCart.some(value => value.id === item.id);
        if (checked) {
            myCart = myCart.filter(value=>value.id !== item.id);
            context.updatePanier(myCart).then(()=>this.setState({foodList:foodList.map(
                    value =>   myCart.some(someCartValue => someCartValue.id === value.item.id) ? {item:value.item,checked:true}:{item:value.item,checked:false}
                )}))
        }else {
            myCart.push(item);
            context.updatePanier(myCart).then(()=> this.setState({foodList:foodList.map(
                    value =>   myCart.some(someCartValue => someCartValue.id === value.item.id) ? {item:value.item,checked:true}:{item:value.item,checked:false}
                )}))
        }
    }
}

export default withPanierContext(Home);
