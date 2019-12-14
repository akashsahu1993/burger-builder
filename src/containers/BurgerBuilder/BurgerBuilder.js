import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../../src/axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
    salad: 1.3,
    bacon: 0.5,
    meat: 0.7,
    cheese: 0.4
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            }).catch(error => {
            this.setState({error: true})
        });
    }

    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients).map((igKey => (
            ingredients[igKey]
        ))).reduce((sum, el) => sum + el, 0);
        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + INGREDIENT_PRICES[type];
        this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] <= 0) {
            return;
        }
        const updatedCount = this.state.ingredients[type] - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        console.log('updated Price: ' + updatedPrice);
        this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice})
        this.updatePurchaseState(updatedIngredients);


    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    cancelPurchaseHandler = () => {
        this.setState({purchasing: false})
    }
    continuePurchaseHandler = () => {
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     deliveryMethod: 'fastest',
        //     customer: {
        //         name: 'Akash Sahu',
        //         email: 'abc@gmail.com',
        //         address: {
        //             street: 'Teststreet 1',
        //             zipCode: '12345',
        //             country: 'India'
        //         }
        //     }
        // };
        // axios.post('orders.json', order)
        //     .then(response => {
        //         console.log(response);
        //         this.setState({loading: false, purchasing: false});
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.setState({loading: false, purchasing: false});
        //     });
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push(encodeURIComponent('price') + '=' + encodeURIComponent(this.state.totalPrice));
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Problem loading ingredients!</p> : <Spinner/>;
        if (this.state.ingredients) {
            burger =
                (<Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}/>
                </Aux>);

            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                                         price={this.state.totalPrice}
                                         purchaseCancelled={this.cancelPurchaseHandler}
                                         purchaseContinued={this.continuePurchaseHandler}/>;
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);