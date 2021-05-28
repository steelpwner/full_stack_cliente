import React, {Fragment, useEffect} from 'react';
import {
    Redirect, Link
} from "react-router-dom";
import logo from './el-heraldo-logo.svg';



function User(props) {
    useEffect(() => {
        document.title = "Panel usuario"
    })
    let {user} = props;
    return (
        <Fragment>
            {user === null ? <Redirect to="/login"/> : ""}
            <div className="content">
                <div className="u-text-center">
                    <img src={logo} alt="logo"/>
                    <h5>¡Bienvenido al panel de usuario</h5>
                    <p>En esta aplicación podrás manejar la carga de distintas noticias
                        a un servidor realizado en express, teniendo principalmente el poder
                        renderizarlas para que sean vistas por todo público y permitiendo
                        registrarse para guardar los datos.</p>
                    <Link to="/news">
                        <button className="btn btn-link">
                            Ir a panel noticias
                        </button>
                    </Link>
                </div>
            </div>
        </Fragment>
    )
}

export default User;