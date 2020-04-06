import React, {useState} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import * as orderActions from '../../../store/actions/index';

import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import axios from '../../../axios-orders';
import {updateObject, checkValidity} from "../../../shared/utility";

const contactdata = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            isValid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            isValid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            isValid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            isValid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: '',
            validation: {
                required: true
            },
            isValid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ]
            },
            value: 'fastest',
            validation: {},
            isValid: true
        }
    });
    const [formIsValid, setFormIsValid] = useState(false);


    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        // this.setState({loading: true});
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        };
        props.onOrderStart(order, props.token);
        // axios.post('orders.json', order)
        //     .then(response => {
        //         console.log(response);
        //         this.setState({loading: false});
        //         this.props.history.push("/");
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.setState({loading: false});
        //     });
    };

    const inputChangedHandler = (event, inputIdentifier) => {

        const updatedFormElement = updateObject(orderForm[inputIdentifier], {
            value: event.target.value,
            isValid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(orderForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].isValid && formIsValid;
        }

        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    };


    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push(
            {
                id: key,
                config: orderForm[key]
            }
        );
    }
    let form = (
        <form onSubmit={(event) => orderHandler(event)}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    inValid={!formElement.config.isValid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)}/>
            ))}
            <Button disabled={!formIsValid} btnType='Success'>ORDER</Button>
        </form>
    );
    if (props.loading) {
        form = <Spinner/>
    }
    return (
        <div className={classes.ContactData}>
            <h4>Please enter your contact details here:</h4>
            {form}
        </div>
    );

};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderStart: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactdata, axios));