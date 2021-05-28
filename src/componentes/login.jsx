import React, {Fragment, useEffect, useRef} from 'react';
import {
    Link, Redirect
} from "react-router-dom";


function Login(props) {
    let userRef = useRef(null)
    let passRef = useRef(null)

    function keyEnterLogin(e) {
        if (e.keyCode === 13) {
            props.login(userRef.current.value,passRef.current.value)
        }
    }
    useEffect(() => {
        document.title = "Inicio de sesión"
    })
    return (
        <Fragment>
            <div className="card mt-5">
                {props.user !== null ? <Redirect to="/news"></Redirect> : ""}
                {props.loginError != null ? <div className="toast toast--danger">
                                                <button className="btn-close" onClick={() => { props.setLoginError(null)}}></button>
                                                <p>{props.loginError}</p>
                                            </div>:""}
                <div className="content u-text-center pt-3">
                    <div className="u-text-center"><h4>Iniciar sesión</h4></div>
                    <div className="row ignore-screen level">
                        <div className="col-3 ignore-screen level-item"><p className="m-0">Usuario:</p></div>
                        <div className="col-9 ignore-screen level-item"><input type="text" ref={userRef} autoFocus onKeyDown={keyEnterLogin}/></div>
                    </div>
                    <div className="row ignore-screen level">
                        <div className="col-3 ignore-screen level-item"><p className="m-0">Contraseña:</p></div>
                        <div className="col-9 ignore-screen level-item"><input type="password" ref={passRef} onKeyDown={keyEnterLogin}/></div>
                    </div>
                    <div className="u-text-right mt-2">
                        <button type="button" className="btn btn-primary" onClick={() => {props.login(userRef.current.value,passRef.current.value)}}>Iniciar sesión</button>
                    </div>
                    <div className="u-text-left">
                        <p>Si no tiene usuario por favor <Link to="/register">Regístrese</Link></p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Login;