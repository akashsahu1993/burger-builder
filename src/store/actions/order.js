import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
        loading: true
    }
};
export const purchaseBurger = (orderData, token) => {
    return {
        type: actionTypes.PURCHASE_BURGER,
        orderData: orderData,
        token: token
    }
    // return dispatch => {
    //     dispatch(purchaseBurgerStart());
    //     axios.post('orders.json?auth=' + token, orderData)
    //         .then(response => {
    //             // console.log(response.data);
    //             dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    //         })
    //         .catch(error => {
    //             // console.log(error);
    //             dispatch(purchaseBurgerFail(error))
    //         });
    // }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

export const fetchOrdersSuccess = (fetchedOrders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        fetchedOrders: fetchedOrders
    }
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
};

export const fetchOrders = (token, userId) => {
    return {
        type: actionTypes.FETCH_ORDERS,
        token: token,
        userId: userId
    }
    // return dispatch => {
    //     dispatch(fetchOrdersStart());
    //     const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    //     axios.get('/orders.json' + queryParams)
    //         .then(response => {
    //             // console.log(response.data);
    //             const fetchedOrders = [];
    //             for (let key in response.data) {
    //                 fetchedOrders.push(
    //                     {
    //                         ...response.data[key],
    //                         id: key
    //                     }
    //                 )
    //             }
    //             dispatch(fetchOrdersSuccess(fetchedOrders))
    //         })
    //         .catch(error => {
    //             dispatch(fetchOrdersFail(error))
    //         })
    // }
};