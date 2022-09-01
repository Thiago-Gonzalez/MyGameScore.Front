import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest 
}){

    const { signed } = useContext(AuthContext);

    if (!signed && isPrivate) {
        return <Redirect to="/login" />
    }

    if (signed && !isPrivate) {
        return <Redirect to="/ver-partidas" />
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