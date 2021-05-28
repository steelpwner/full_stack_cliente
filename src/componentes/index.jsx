import React, {Fragment, useEffect, useState} from 'react';
import {
    Link
} from "react-router-dom";
import axios from 'axios';


function Index(props) {
    useEffect(() => {
        let active = true
        const fetch = async () => {
            document.title = "Inicio"
            const instance = axios.create()
            const news = await instance.get(`${props.backend}/activenews`)
            if (active) {
                setNews(news.data['data'])
            }
        }
        fetch()
        return () => active = false
    })
    let [news, setNews] = useState([])
    return (
        <Fragment>
            <div className="u-text-center"><h6>Últimas noticias cargadas</h6></div>
            <div className="row ignore-screen">
            {
                news !== null && news !== undefined && Array.isArray(news) ?
                <Fragment>{news.slice(0,6).map((noticia) => {
                    return(
                        <div className="col-4 ignore-screen" key={noticia['id']}>
                            <div className="card card--slide-up noticia">
                                    <div className="card__container">
                                        <Link to={`/news/${noticia['id']}`}><div className="card__image" style={{"backgroundImage":`url(${noticia['imagen']})`}}></div></Link>
                                    </div>
                                    <div className="card__mobile-title">
                                        <div className="content">
                                            <div className="tile">
                                                <div className="tile__container">
                                                    <p className="tile__title">{noticia['nombre']}</p>
                                                    <p className="tile__subtitle">Por: {noticia['periodista']}, categoría {noticia['categoria']}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card__body content">
                                        <p>{noticia['resumen']}... <Link to={`/news/${noticia['id']}`}>Ver más</Link></p>
                                    </div>
                                    <div className="card__footer content">Publicado el día {noticia['fecha_creacion'].split(" ")[0]} a las {noticia['fecha_creacion'].split(" ")[1]} horas</div>
                                    </div>
                                </div>
                        )
                })}</Fragment>: <p>Cargando noticias...</p>}
        </div>
        </Fragment>
    )
}

export default Index;