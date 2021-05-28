import {Fragment} from 'react';
import {Link} from 'react-router-dom';


function Footer(props) {

    return (
        <footer className="footer">
            <h6 className="footer__title white uppercase">EL HERALDO</h6>
            <div className="content">
                <div className="divider"></div>

                <div className="row">
                    <div className="col-12">
                        <ul className="no-bullets">
                            <Link to="/">
                                <li className="footer__list-item white">Inicio</li>
                            </Link>
                            {props.user === null ? 
                            <Fragment>
                                <Link to="/login">
                                    <li className="footer__list-item white">Login</li>
                                </Link>
                                <Link to="/register">
                                    <li className="footer__list-item white">Registro</li>
                                </Link>
                            </Fragment>
                                :
                            <Fragment>
                                <Link to="/user">
                                    <li className="footer__list-item white">Panel usuario</li>
                                </Link>
                                <Link to="/news">
                                    <li className="footer__list-item white">Noticias</li>
                                </Link>
                                <Link to="#" onClick={props.logout}>
                                    <li className="footer__list-item white">Cerrar sesión</li>
                                </Link>
                            </Fragment>
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <p className="subtitle white uppercase">EL HERALDO © 2021.</p>
        </footer>
    )
}

export default Footer;