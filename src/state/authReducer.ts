import {authApi, LoginRequestType} from "../API/todolistApi";
import {appSetStatus, isInitializedTC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AppThunk} from "./store";
import {clearData, ClearDataType} from "./todolists-reducer";


export type AuthReducerStateType = {
    isLoggedIn: boolean,
}
const initialState = {} as AuthReducerStateType


export const authReducer = (state: AuthReducerStateType = initialState, action: AuthReducerActionType): AuthReducerStateType  => {
    switch (action.type) {
        case 'SET_IS_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: action.isLoggedIn
            }
        default:
            return state
    }
}

export type AuthReducerActionType = SetIsLoggedInType | ClearDataType


// action creators


export type SetIsLoggedInType = ReturnType <typeof setIsLoggedIn>
export const setIsLoggedIn = (isLoggedIn: boolean) => {
    return {
        type: 'SET_IS_LOGGED_IN',
        isLoggedIn
    }as const
}


//thunk creators

export const loginTC = (data: LoginRequestType): AppThunk => dispatch => {
    dispatch(appSetStatus('loading'))
    authApi.login(data)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(isInitializedTC())
                dispatch(setIsLoggedIn(true))
                dispatch(appSetStatus('successed'))
            }
            else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
}

export const logoutTC = (): AppThunk => dispatch => {
    dispatch(appSetStatus('loading'))
    authApi.logout()
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(false))
                dispatch(appSetStatus('successed'))
                dispatch(clearData())
            }
            else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
}


