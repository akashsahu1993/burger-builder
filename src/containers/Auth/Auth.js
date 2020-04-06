import React, {useState, useEffect} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {updateObject, checkValidity} from "../../shared/utility";

const auth = props => {
    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email Address'
            },
            value: '',
            validation: {
                required: true,
                //isEmail: true
            },
            isValid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            isValid: false,
            touched: false
        }
    });
    const [isSignUp, setIsSignUp] = useState(true);

    const {buildingBurger, authRedirectPath, onSetRedirectPath} = props;
    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/')
            onSetRedirectPath();
    }, [buildingBurger, authRedirectPath, onSetRedirectPath]);

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(authForm, {
            [controlName]: updateObject(authForm[controlName], {
                value: event.target.value,
                isValid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            })
        });
        setAuthForm(updatedControls);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignUp);
    };

    const onAuthModeChangedHandler = () => {
        setIsSignUp(!isSignUp);
    };


    const formElementsArray = [];
    for (let key in authForm) {
        formElementsArray.push(
            {
                id: key,
                config: authForm[key]
            }
        );
    }
    let form = (
        formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                inValid={!formElement.config.isValid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => inputChangedHandler(event, formElement.id)}/>
        ))
    );

    if (props.loading) {
        form = <Spinner/>
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath}/>
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = <p>{props.error.message}</p>;
    }
    return (
        <div className={classes.Auth}>
            {errorMessage}
            {authRedirect}
            <form onSubmit={onSubmitHandler}>
                {form}
                <Button btnType='Success'>SUBMIT</Button>
            </form>
            <Button clicked={onAuthModeChangedHandler} btnType='Danger'>Switch
                to {isSignUp ? 'Sign In' : 'Sign Up'}</Button>
        </div>
    )

};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(auth);