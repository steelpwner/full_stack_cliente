import React, {Fragment, useEffect} from 'react';
import {
    Link, Redirect
} from "react-router-dom";



function User(props) {
    useEffect(() => {
        document.title = "Panel usuario"
    })
    let {user,token} = props;
    return (
        <Fragment>
            {user === null ? <Redirect to="/login"/> : ""}
        </Fragment>
    )
}

export default User;