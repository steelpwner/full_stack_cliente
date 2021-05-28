import React, {Fragment, useEffect, useRef} from 'react';
import {
    Redirect
} from "react-router-dom";




function Register(props) {
    useEffect(() => {
        document.title = "Registro"
    })
    let userRef = useRef(null)
    let passRef = useRef(null)
    let addressRef = useRef(null)
    let phoneRef = useRef(null)
    let emailRef = useRef(null)
    let nameRef = useRef(null)


    function upload() {
        props.signUp(userRef.current.value,
            passRef.current.value,
            addressRef.current.value,
            phoneRef.current.value,
            emailRef.current.value,
            nameRef.current.value)
    }
    return (
        <Fragment>
            <div className="card mt-5">
                <div className="content u-text-center">
                {props.user !== null ? <Redirect to="/user"></Redirect> : ""}
                {props.signUpError != null ? <div className="toast toast--danger">
                                                <button className="btn-close" onClick={() => { props.setSignUpError(null)}}></button>
                                                <p>{props.signUpError}</p>
                                            </div>:""}
                    <div className="u-text-center"><h4>Registro</h4></div>
                    <div className="row ignore-screen level">
                        <div className="col-3 ignore-screen level-item"><p className="m-0">Nombre completo:</p></div>
                        <div className="col-9 ignore-screen level-item"><input type="text" ref={nameRef} /></div>
                    </div>
                    <div className="row ignore-screen level">
                        <div className="col-3 ignore-screen level-item"><p className="m-0">Dirección:</p></div>
                        <div className="col-9 ignore-screen level-item"><input type="text" ref={addressRef} /></div>
                    </div>
                    <div className="row ignore-screen level">
                        <div className="col-3 ignore-screen level-item"><p className="m-0">Teléfono:</p></div>
                        <div className="col-9 ignore-screen level-item"><input type="tel" ref={phoneRef}/></div>
                    </div>
                    <div className="row ignore-screen level">
                        <div className="col-3 ignore-screen level-item"><p className="m-0">Usuario:</p></div>
                        <div className="col-9 ignore-screen level-item"><input type="text" ref={userRef} /></div>
                    </div>
                    <div className="row ignore-screen level">
                        <div className="col-3 ignore-screen level-item"><p className="m-0">Contraseña:</p></div>
                        <div className="col-9 ignore-screen level-item"><input type="password" ref={passRef}/></div>
                    </div>
                    <div className="row ignore-screen level">
                        <div className="col-3 ignore-screen level-item"><p className="m-0">Correo electrónico:</p></div>
                        <div className="col-9 ignore-screen level-item"><input type="email" ref={emailRef}/></div>
                    </div>

                    <div className="u-text-right mt-2">
                        <button type="button" className="btn btn-primary" onClick={upload}>Registrarse</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Register;