import React, {Fragment, useState} from 'react';
import Header from './header.jsx';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Login from './login.jsx';
import Index from './index.jsx';
import Register from './register.jsx';
import User from './user.jsx';
import axios from 'axios';
import News from './news.jsx';

const categories = ["Deportes","Judicial","Economía","Sociales","Entretenimiento","Salud","Política"];
const backend = "http://localhost:4000"

function Page() {
    let [user,setUser] = useState(null)
    let [token, setToken] = useState(null)
    let [loginError, setLoginError] = useState(null)
    let [signUpError, setSignUpError] = useState(null)
    let [sessionTimeout,setSessionTimeout] = useState(null)
    function login(u, p) {
        if (u !== "" && p !== "") {
            const instance = axios.create()
            let data = {"user":u,"pass":p}
            instance.post(`${backend}/login`, data)
            .then(response => {
                if (response.data['status'] === 401) {
                    setLoginError(response.data['message'])
                } else {                
                    setToken(response.data['token'])
                    setUser(response.data['user'])
                    setLoginError(null)
                    setSessionTimeout(setTimeout(()=> {
                        logout()
                    },response.data['sessionTime']*1000))
                }
                
            })
            .catch((error) => {
            })
        } else {
            setLoginError("Por favor, llene todos los campos para poder loguearse")
        }
    }
    function signUp(u, pa, a, ph, e, n) {
        if (u !== "" && pa !== "" && a !== "" && ph !== "" && e !== "" && n !== "") {
            const instance = axios.create()
            let data = {"user":u,"pass":pa, "address":a, "phone":ph, "email":e, "name":n}
            instance.post(`${backend}/users/create`, data)
            .then(response => {
                if (response.data['status'] === 200) {
                    setSignUpError(null)
                    login(u,pa)
                } else {
                    setSignUpError(response.data['message'])
                }
            })
        } else {
            setSignUpError("Por favor llene todos los datos para poder registrarse")
        }
        
    }

    function logout() {
        clearTimeout(sessionTimeout)
        setUser(null)
        setToken(null)
    }

    return (
        <Fragment>
            <Router>
                <Header user={user} logout={logout}/>
                    <section className="section">
                        <div className="hero">
                            <div className="hero-body">
                                <div className="content">
                                <Switch>
                                    <Route exact path ="/">
                                        <Index/>
                                    </Route>
                                    <Route exact path="/login">
                                        <Login login={login} user={user} token={token} setLoginError={setLoginError} loginError={loginError}/>
                                    </Route>
                                    <Route exact path="/news">
                                        <News user={user} token={token}/>
                                    </Route>
                                    <Route exact path="/register">
                                        <Register signUpError={signUpError} user={user} signUp={signUp} setSignUpError={setSignUpError}/>
                                    </Route>
                                    <Route exact path="/user">
                                        <User user={user} token={token}/>
                                    </Route>
                                </Switch>
                                </div>
                            </div>
                        </div>
                    </section>
                    
            </Router>
        </Fragment>
    )
}


export default Page;