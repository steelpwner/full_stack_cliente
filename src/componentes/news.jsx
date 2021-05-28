import React, {Fragment, useEffect, useRef} from 'react';
import {
    Link, Redirect
} from "react-router-dom";


function CreateNews(props) {
    useEffect(() => {
        document.title = "Creación de noticias - Panel usuario"
    })
    let name = useRef(null);
    let description = useRef(null);
    let newsman = useRef(null);
    let visible = useRef(null);
    let category = useRef(null);
    let resume = useRef(null);
    let image = useRef(null);
    let {user,categories} = props;
    return (
        <Fragment>        
           <div className="card mt-5">
                <div className="content">
                    {user === null ? <Redirect to="/login"/> : ""}
                    {props.redirectToNews === true ? <Redirect to="/news"/> : ""}
                    <div className="u-text-center"><h4>Crear noticia</h4></div>
                    {props.newsError != null ? <div className="toast toast--danger">
                                                <button className="btn-close" onClick={() => { props.setNewsError(null)}}></button>
                                                <p>{props.newsError}</p>
                                            </div>:""}
                    <div className="u-text-left">
                        <Link to="/news">
                            <button className="btn btn-link">Atrás</button>
                        </Link>
                    </div>
                    <div className="row ignore-screen level">
                        <div className="col-3 ignore-screen level-item">
                            <p className="m-0">Nombre:</p>
                        </div>
                        <div className="col-9 ignore-screen level-item">
                            <input type="text" ref={name}/>
                        </div>
                    </div>
                    <div className="row ignore-screen level">
                        <div className="col-3 ignore-screen level-item">
                            <p className="m-0">Descripción:</p>
                        </div>
                        <div className="col-9 ignore-screen level-item">
                            <textarea ref={description}></textarea>
                        </div>
                    </div>
                    <div className="row ignore-screen level">
                        <div className="col-3 ignore-screen level-item">
                            <p className="m-0">Resumen:</p>
                        </div>
                        <div className="col-9 ignore-screen level-item">
                            <textarea ref={resume}></textarea>
                        </div>
                    </div>
                    <div className="row ignore-screen level">
                        <div className="col-3 ignore-screen level-item">
                            <p className="m-0">Periodista:</p>
                        </div>
                        <div className="col-9 ignore-screen level-item">
                            <input type="text" ref={newsman}/>
                        </div>
                    </div>
                    <div className="row ignore-screen level">
                        <div className="col-3 ignore-screen level-item">
                            <p className="m-0">Url imagen:</p>
                        </div>
                        <div className="col-9 ignore-screen level-item">
                            <input type="text" ref={image}/>
                        </div>
                    </div>
                    <div className="row ignore-screen level">
                        <div className="col-3 ignore-screen level-item">
                            <p className="m-0">Visible:</p>
                        </div>
                        <div className="col-9 ignore-screen level-item">
                            <select ref={visible}>
                                <option value="1">Sí</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="row ignore-screen level">
                        <div className="col-3 ignore-screen level-item">
                            <p className="m-0">Categoría:</p>
                        </div>
                        <div className="col-9 ignore-screen level-item">
                            <select ref={category}>
                                    {categories.map(categoria => {
                                        return (
                                            <option key={`${categoria}`} value={`${categoria}`}>{categoria}</option>
                                        )
                                    })}
                            </select>
                        </div>
                        </div>
                    </div>
                    <div className="u-text-right"><button className="btn btn-success" 
                    onClick={() => {
                        props.createNew(name.current.value, description.current.value, newsman.current.value, visible.current.value, category.current.value, resume.current.value, image.current.value)
                    }}>Crear</button></div>
                </div>
        </Fragment>
    )
}

function EditNews(props) {
    useEffect(() => {
        document.title = "Edición de noticias - Panel usuario"
    })
    let name = useRef(null);
    let description = useRef(null);
    let newsman = useRef(null);
    let visible = useRef(null);
    let category = useRef(null);
    let resume = useRef(null);
    let image = useRef(null);
    let {user,categories,news} = props;
    return (
        <Fragment>        
            {news === null ? <Redirect to="/news"/>:
           <div className="card mt-5">
                <div className="content">
                    {user === null ? <Redirect to="/login"/> : ""}
                    {props.redirectToNews === true ? <Redirect to="/news"/> : ""}
                    <div className="u-text-center"><h4>Editar noticia</h4></div>
                    {props.newsError != null ? <div className="toast toast--danger">
                                                <button className="btn-close" onClick={() => { props.setNewsError(null)}}></button>
                                                <p>{props.newsError}</p>
                                            </div>:""}
                    <div className="u-text-left">
                        <Link to="/news">
                            <button className="btn btn-link">Atrás</button>
                        </Link>
                    </div>
                    <div className="row ignore-screen level">
                        <div className="col-3 ignore-screen level-item">
                            <p className="m-0">Nombre:</p>
                        </div>
                        <div className="col-9 ignore-screen level-item">
                            <input type="text" ref={name} defaultValue={news['nombre'] || ''}/>
                        </div>
                    </div>
                    <div className="row ignore-screen level">
                        <div className="col-3 ignore-screen level-item">
                            <p className="m-0">Descripción:</p>
                        </div>
                        <div className="col-9 ignore-screen level-item">
                            <textarea ref={description} defaultValue={news['descripcion'] || ''}></textarea>
                        </div>
                    </div>
                    <div className="row ignore-screen level">
                        <div className="col-3 ignore-screen level-item">
                            <p className="m-0">Resumen:</p>
                        </div>
                        <div className="col-9 ignore-screen level-item">
                            <textarea ref={resume} defaultValue={news['resumen'] || ''}></textarea>
                        </div>
                    </div>
                    <div className="row ignore-screen level">
                        <div className="col-3 ignore-screen level-item">
                            <p className="m-0">Periodista:</p>
                        </div>
                        <div className="col-9 ignore-screen level-item">
                            <input type="text" ref={newsman} defaultValue={news['periodista'] || ''}/>
                        </div>
                    </div>
                    <div className="row ignore-screen level">
                        <div className="col-3 ignore-screen level-item">
                            <p className="m-0">Url imagen:</p>
                        </div>
                        <div className="col-9 ignore-screen level-item">
                            <input type="text" ref={image} defaultValue={news['imagen'] || ''}/>
                        </div>
                    </div>
                    <div className="row ignore-screen level">
                        <div className="col-3 ignore-screen level-item">
                            <p className="m-0">Visible:</p>
                        </div>
                        <div className="col-9 ignore-screen level-item">
                            <select ref={visible} defaultValue={news['visible'] || ''}>
                                <option value="1">Sí</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="row ignore-screen level">
                        <div className="col-3 ignore-screen level-item">
                            <p className="m-0">Categoría:</p>
                        </div>
                        <div className="col-9 ignore-screen level-item">
                            <select ref={category} defaultValue={news['categoria'] || ''}>
                                    {categories.map(categoria => {
                                        return (
                                            <option key={`${categoria}`} value={`${categoria}`}>{categoria}</option>
                                        )
                                    })}
                            </select>
                        </div>
                        </div>
                    </div>
                    <div className="u-text-right"><button className="btn btn-success" 
                    onClick={() => {
                        props.editNew(news['id'],name.current.value, description.current.value, newsman.current.value, visible.current.value, category.current.value, resume.current.value, image.current.value)
                    }}>Editar</button></div>
                </div>}
        </Fragment>
    )
}

function New(props) {
    useEffect(() => {
        document.title = `${props.noticia.nombre} - Vista`
    })
}
function News(props) {
    useEffect(() => {
        document.title = "Noticias - Panel usuario"
    })
    let {user,news} = props;
    return (
        <Fragment>
            <div className="content mt-5">
                {user === null ? <Redirect to="/login"/> : ""}
                {props.newsError != null ? <div className="toast toast--danger">
                                                <button className="btn-close" onClick={() => { props.setNewsError(null)}}></button>
                                                <p>{props.newsError}</p>
                                            </div>:""}
                {props.newsSuccess != null ? <div className="toast toast--success">
                                                <button className="btn-close" onClick={() => { props.setNewsSuccess(null)}}></button>
                                                <p>{props.newsSuccess}</p>
                                            </div>:""}
                <div className="u-text-left">            
                    <Link to="/news/create"><button className="btn btn-link">Crear noticia</button></Link>
                </div><br/>
                <div className="overflow">
                    <table className="table bordered">
                        {/*
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        nombre TEXT NOT NULL,
                        descripcion TEXT NOT NULL,
                        periodista TEXT NOT NULL,
                        visible TINYINT NOT NULL DEFAULT 1,
                        categoria TEXT NOT NULL,
                        imagen TEXT NOT NULL,
                        resumen TEXT NOT NULL,
                        fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        usuario BIGINT NOT NULL,
                        */}
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Periodista</th>
                                <th>Visible</th>
                                <th>Categoría</th>
                                <th>Resumen</th>
                                <th>Ver noticia</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {news.length === 0 ?
                            <tr><td colSpan="6"><h6>No existen noticias creadas</h6></td></tr>
                            : news.map((noticia)=>{
                                return (
                                    <tr key={noticia['id']}>
                                        <td>{noticia['nombre']}</td>
                                        <td>{noticia['periodista']}</td>
                                        <td>{noticia['visible'] === 1 ? "Sí":"No"}</td>
                                        <td>{noticia['categoria']}</td>
                                        <td>{noticia['resumen']}</td>
                                        <td><Link to={`news/${noticia['id']}`}><button className="btn btn-success">Ver</button></Link></td>
                                        <td>
                                            <Link to="/news/edit"><button className="btn btn-info" noticia={noticia} onClick={() => {props.setEditingNew(noticia)}}>Editar</button></Link>
                                            <button className="btn btn-danger" onClick={() => {props.deleteNew(noticia['id'])}}>Eliminar</button>    
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            
        </Fragment>
    )
}

export default News;
export {CreateNews,EditNews};