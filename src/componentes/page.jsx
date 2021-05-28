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
import News,{CreateNews,EditNews,New} from './news.jsx';
import Footer from './footer';

const categories = ["Deportes","Judicial","Economía","Sociales","Entretenimiento","Salud","Política"];
const backend = "http://localhost:4000"

function Page() {
    const [user,setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loginError, setLoginError] = useState(null)
    const [signUpError, setSignUpError] = useState(null)
    const [sessionTimeout,setSessionTimeout] = useState(null)
    const [news, setNews] = useState([])
    const [newsError, setNewsError] = useState(null)
    const [newsSuccess, setNewsSuccess] = useState(null)
    const [redirectToNews, setRedirectToNews] = useState(null)
    const [editingNew,setEditingNew] = useState(null)
    function createNew(na,d,ne,v,c,r,i) {
        if (na !== "" && d !== "" && ne !== "" && v !== "" && c !== "" && r !== "" && i !== "") {
            let data = {"name":na,"description":d,"newsman":ne,"image":i,"visible":v,"category":c,"user":user['id'], "resume":r}
            const instance = axios.create({
                "headers":{"Authorization":`Bearer: ${token}`}
            })
            instance.post(`${backend}/news/create`, data)
            .then(response => {
                if (response.data['status'] === 422) {
                    setNewsError(response.data['message'])
                } else {                
                    setRedirectToNews(true)
                    setNewsSuccess(response.data['message'])
                }
                
            })
            .catch((error) => {
            })
        } else {
            setNewsError("Por favor, llene todos los campos para poder crear una noticia")
        }
    }
    
    function editNew(id,na,d,ne,v,c,r,i) {
        if (na !== "" && d !== "" && ne !== "" && v !== "" && c !== "" && r !== "" && i !== "" && id !== "") {
            let data = {"name":na,"description":d,"newsman":ne,"image":i,"visible":v,"category":c, "resume":r, "id":id}
            const instance = axios.create({
                "headers":{"Authorization":`Bearer: ${token}`}
            })
            instance.put(`${backend}/news`, data)
            .then(response => {
                if (response.data['status'] === 422) {
                    setNewsError(response.data['message'])
                } else {                
                    setRedirectToNews(true)
                    setNewsSuccess(response.data['message'])
                }
                
            })
            .catch((error) => {
            })
        } else {
            setNewsError("Por favor, llene todos los campos para poder editar una noticia")
        }
    }

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

    function getNews() {
        const instance = axios.create()
        instance.get(`${backend}/news`)
        .then(response=>{
            if (response.data != null) {            
                setNews(response.data['data'])
            }
        })
    }

    function deleteNew(id) {
        const instance = axios.create({
            "headers":{"Authorization":`Bearer: ${token}`}
        })
        instance.delete(`${backend}/news`,{data:{"id":id}})
        .then(response=>{
            if (response.data != null) {    
                if (response.data['status'] === 422) {
                    setNewsError(response.data['message'])
                } else {
                    setNewsSuccess(response.data['message'])
                    getNews()
                }
            }
        })
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
                                    <Route exact path ="/" render={() => {
                                        return (<Index news={news} backend={backend}/>)
                                    }}>
                                    </Route>
                                    <Route exact path="/login">
                                        <Login login={login} user={user} token={token} setLoginError={setLoginError} loginError={loginError}/>
                                    </Route>
                                    <Route exact path="/news" render={(props) => {
                                        return (
                                            <News user={user} news={news} newsError={newsError} newsSuccess={newsSuccess} setNewsError={setNewsError} setNewsSuccess={setNewsSuccess} deleteNew={deleteNew}  setEditingNew={setEditingNew} getNews={getNews} backend={backend} setRedirectToNews={setRedirectToNews}/>)
                                    }}/>
                                    <Route exact path="/news/create" render={(props) => {
                                        return(
                                            <CreateNews user={user} categories={categories} redirectToNews={redirectToNews} createNew={createNew} newsError={newsError} setNewsError={setNewsError}/>
                                        )
                                    }}/>
                                    <Route exact path="/news/edit" render={(props) => {
                                        return(
                                            <EditNews user={user} categories={categories} redirectToNews={redirectToNews} createNew={createNew} newsError={newsError} setNewsError={setNewsError} news={editingNew} editNew={editNew}/>
                                        )
                                    }}/>
                                    <Route exact path="/register">
                                        <Register signUpError={signUpError} user={user} signUp={signUp} setSignUpError={setSignUpError}/>
                                    </Route>
                                    <Route exact path="/user">
                                        <User user={user}/>
                                    </Route>
                                    <Route path="/news/:id" render={(props) => {
                                        return (<New backend={backend} id={props.match.params.id}/>)
                                    }}/>
                                </Switch>
                                </div>
                            </div>
                        </div>
                    </section>
                    <Footer user={user} logout={logout}/>
            </Router>
        </Fragment>
    )
}


export default Page;