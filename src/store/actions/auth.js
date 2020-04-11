import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (localId, idToken) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: localId,
        token: idToken
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const authLogout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('userId');
    // localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
};

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (expirationTime) => {
    // return dispatch => {
    //     setTimeout(() => {
    //         dispatch(authLogout())
    //     }, expirationTime * 1000)
    // }
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    }
};

export const auth = (email, password, isSignUp) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignUp: isSignUp
    }
    // return dispatch => {
    //     dispatch(authStart());
    //     const authData = {
    //         email: email,
    //         password: password,
    //         returnSecureToken: true
    //     };
    //
    //     let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCOchioKpF8IXa3EUakc8X58yJSNXRtD90';
    //
    //     if (isSignUp) {
    //         url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCOchioKpF8IXa3EUakc8X58yJSNXRtD90';
    //     }
    //     axios.post(url, authData)
    //         .then(response => {
    //             // console.log(response);
    //             const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    //             localStorage.setItem('token', response.data.idToken);
    //             localStorage.setItem('userId', response.data.localId);
    //             localStorage.setItem('expirationDate', expirationDate);
    //             dispatch(authSuccess(response.data.localId, response.data.idToken));
    //             dispatch(checkAuthTimeout(response.data.expiresIn))
    //         })
    //         .catch(error => {
    //             // console.log(error.response);
    //             dispatch(authFail(error.response.data.error))
    //         });
    //
    // }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
    // return dispatch => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         dispatch(authLogout());
    //     } else {
    //         const expirationDate = new Date(localStorage.getItem('expirationDate'));
    //         if (expirationDate <= new Date()) {
    //             dispatch(authLogout());
    //         } else {
    //             const userId = localStorage.getItem('userId');
    //             dispatch(authSuccess(userId, token));
    //             dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    //         }
    //     }
    // }
};