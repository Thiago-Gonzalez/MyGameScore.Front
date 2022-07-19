import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest 
}){

    const { signed } = useContext(AuthContext);

    if (!signed && isPrivate) {
        return <Redirect to="/" />
    }

    if (signed && !isPrivate) {
        return <Redirect to="/lancar-pontos" />
    }

    return(
        <Route 
            {...rest}
            render={ props => (

                <Component {...props} />
            ) }
        />
    );
}