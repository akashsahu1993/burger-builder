import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../../src/axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';

export const burgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();

    const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), []);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients).map((igKey => (
            ingredients[igKey]
        ))).reduce((sum, el) => sum + el, 0);
        return sum > 0;
    };

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true)
        } else {
            onSetRedirectPath('/checkout');
            props.history.push('/auth');
        }

    };

    const cancelPurchaseHandler = () => {
        setPurchasing(false)
    };
    const continuePurchaseHandler = () => {

        onInitPurchase();
        props.history.push('/checkout');
    };


    const disabledInfo = {
        ...ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = error ? <p>Problem loading ingredients!</p> : <Spinner/>;
    if (ings) {
        burger =
            (<Aux>
                <Burger ingredients={ings}/>
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState(ings)}
                    ordered={purchaseHandler}
                    isAuth={isAuthenticated}
                    price={price}/>
            </Aux>);

        orderSummary = <OrderSummary ingredients={ings}
                                     price={price}
                                     purchaseCancelled={cancelPurchaseHandler}
                                     purchaseContinued={continuePurchaseHandler}/>;
    }
    return (
        <Aux>
            <Modal show={purchasing} closeModal={cancelPurchaseHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    )

};

// const mapStateToProps = (state) => {
//     return {
//         ings: state.burgerBuilder.ingredients,
//         price: state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         isAuthenticated: state.auth.token !== null
//     }
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
//         onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
//         onInitIngredients: () => dispatch(actions.initIngredients()),
//         onInitPurchase: () => dispatch(actions.purchaseInit()),
//         onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
//     }
// };

export default withErrorHandler(burgerBuilder, axios);