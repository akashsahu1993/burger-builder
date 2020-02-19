import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            loading: false,
            error: null,
            authRedirectPath: '/'

        })
    });

    it('should store token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            loading: false,
            error: null,
            authRedirectPath: '/'

        }, {
            type: actionTypes.AUTH_SUCCESS,
            userId: 'test-user-id',
            token: 'test-token'
        })).toEqual({
            token: 'test-token',
            userId: 'test-user-id',
            loading: false,
            error: null,
            authRedirectPath: '/'

        })
    });
});