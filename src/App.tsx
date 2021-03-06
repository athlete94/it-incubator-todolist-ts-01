import React, {useEffect} from 'react';
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import s from './App.module.css'
import {LinearProgress} from "@material-ui/core";
import {isInitializedTC} from "./state/app-reducer";
import CustomizedSnackbars from "./components/Error/ErrorSnackbar";
import { Routes, Route, HashRouter} from "react-router-dom";
import Login from "./components/Login/Login";
import {CircularProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "./state/hooks";

const App = () => {

    const status = useAppSelector(state => state.appReducer.status)
    const isInitialized = useAppSelector(state => state.appReducer.isInitialized)
    const dispatch = useAppDispatch()

    useEffect(()=> {
        dispatch(isInitializedTC())
    }, [])

    if(!isInitialized) {
        return <div style={{width: '100%', textAlign: 'center', position: 'fixed', top: '40%'}}>
            <CircularProgress />
        </div>
    }

    return (
        <HashRouter>
            <div>
                <Header/>
                {status === 'loading' && <LinearProgress color="secondary"/>}

                <div className={s.wrap}>
                    <Routes>

                        <Route path={'/'} element={<Main/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                    </Routes>
                </div>

                <CustomizedSnackbars/>
            </div>
        </HashRouter>
    );
}
export default App;