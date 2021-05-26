import React, {Fragment, useEffect} from 'react';
import {
    Link, Redirect
} from "react-router-dom";



function News(props) {
    useEffect(() => {
        document.title = "Noticias - Panel usuario"
    })
    let {user,token} = props;
    return (
        <Fragment>
            {user === null ? <Redirect to="/login"/> : ""}
        </Fragment>
    )
}

export default News;