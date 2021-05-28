import React, {Fragment} from 'react';
import {
    Link
} from "react-router-dom";
import './app.css';

function Header(props) {
    let {user,logout} = props
    return (
    <Fragment>
        <div className="header header-fixed u-unselectable header-animated">
            <div className="header-brand">
                
                <div className="nav-item no-hover">
                    <Link to="/"><h4 className="title red-font" style={{"fontFamily":"dubai-font"}}>EL HERALDO</h4></Link>
                </div>
                <div className="nav-item nav-btn" id="header-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className="header-nav" id="header-menu">
                <div className="nav-left">
                </div>
                
                <div className="nav-right">
                    <div className="nav-item link">
                        <Link to="/">Inicio</Link>
                    </div>

                    {user == null ? 
                    <Fragment>
                        <div className="nav-item link">
                            <Link to="/login">Login</Link>
                        </div>
                        <div className="nav-item link">
                            <Link to="/register">Registro</Link>
                        </div>
                    </Fragment>:""}

                    {user != null ? 
                    <Fragment>
                        <div className="nav-item link">
                            <Link to="/user">Panel usuario</Link>
                        </div>
                        <div className="nav-item link">
                            <Link to="/news">Noticias</Link>
                        </div>
                        <div className="nav-item link">
                            <Link to="#" onClick={() => {
                                logout()
                            }}>Cerrar sesión</Link>
                        </div>
                    </Fragment>
                    :""}
                </div>
            </div>
        </div>
    </Fragment>
    )
}

export default Header;