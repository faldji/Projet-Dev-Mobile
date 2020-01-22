import React, { createContext, Component } from "react";
import {Alert, AsyncStorage} from "react-native";
import {FoodList} from "../Components/FoodList"; // on importe createContext qui servira à la création d'un ou plusieurs contextes

/**
 * `createContext` contient 2 propriétés :
 * `Provider` et `Consumer`. Nous les rendons accessibles
 * via la constante `UserContext` et on initialise une
 * propriété par défaut "name" qui sera une chaîne vide.
 * On exporte ce contexte afin qu'il soit exploitable par
 * d'autres composants par la suite via le `Consumer`
 */
export const PanierContext = createContext('panier');

export function withPanierContext(Component) {
    return function WrapperComponent(props) {
        return (
            <PanierContext.Consumer>
                {value => <Component {...props} context={value} />}
            </PanierContext.Consumer>
        );
    };
}
/**
 * la classe UserProvider fera office de... Provider (!)
 * en englobant son enfant direct
 * dans le composant éponyme. De cette façon, ses values
 * seront accessibles de manière globale via le `Consumer`
 */
class PanierProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myCart: [],
            banner:0,
            totalPrice:0,
            updatePanier:(myCart,redirect,navigation) => this.updatePanier(myCart,redirect,navigation)
        };
    }
    componentDidMount() {
       AsyncStorage.getItem('@MyCart:key',(error,result)=>{
            if (!error){
                if (result !== null){
                    let myCart = JSON.parse(result);
                    if (myCart){
                        let tot = 0;
                        if (!Array.isArray(myCart))
                            myCart = [myCart];
                        myCart.forEach(value => tot += value.price);
                        this.setState({myCart:myCart ,banner:myCart.length,totalPrice:tot});
                    }
                }
            }

        });
    };
    updatePanier = async (myCart,redirect,navigation)=>{
        let tot = 0;
        myCart.forEach(value => tot += value.price);

       await AsyncStorage.setItem('@MyCart:key', JSON.stringify(myCart),(error=>{
                if (!error){
                    this.setState({myCart,banner:myCart.length||0,totalPrice:tot});
                    if (typeof (redirect) === 'string')
                    navigation.navigate(redirect)
                }else {
                    Alert.alert('Error',error.toString());
                }
            }));
    };
    render() {
        return (
            /**
             * la propriété value est très importante ici, elle rend
             * le contenu du state disponible aux `Consumers` de l'application
             */
            <PanierContext.Provider value={{...this.state}}>
                {this.props.children}
            </PanierContext.Provider>
        );
    }
}

export default PanierProvider;
