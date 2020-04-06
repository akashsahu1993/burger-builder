import React from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route, Redirect} from 'react-router-dom';
import ContactData from "./ContactData/ContactData";
import {connect} from 'react-redux';

//import queryString from 'query-string';

const checkout = props => {
    // below code commented during redux module
    // state = {
    //     ingredients: null,
    //     price: 0
    // }
    //
    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         if (param[0] === 'price') {
    //             price = +param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1]
    //         }
    //     }
    //     this.setState({ingredients: ingredients, price: price});

    // const ingredientsParams = queryString.parse(this.props.location.search);
    // console.log("queryParams are : ", ingredientsParams);
    //
    // this.setState({
    //     ingredients: {
    //         paneer: +ingredientsParams.paneer,
    //         cheese: +ingredientsParams.cheese,
    //         salad: +ingredientsParams.salad,
    //         patty: +ingredientsParams.patty
    //     }
    // })
    //}

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    };

    const checkoutContinuedHandler = () => {
        props.history.push("/checkout/contact-data");
    };


    let summary = <Redirect to='/'/>;
    if (props.ings) {
        const purchasedRedirect = props.purchased ? <Redirect to='/'/> : null;
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={props.ings}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler}/>
                <Route path={props.match.path + '/contact-data'}
                       component={ContactData}/>
            </div>
        );
    }
    return summary;
    // {/*Below code commented during redux module*/}
    // {/*<Route path={this.props.match.path + '/contact-data'}*/}
    // {/*       render={*/}
    // {/*           (props) => <ContactData*/}
    // {/*               ingredients={this.state.ingredients}*/}
    // {/*               price={this.state.price}*/}
    // {/*               {...props}*/}
    // {/*           />*/}
    // {/*       }*/}
    // {/*/>*/}

};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(checkout);