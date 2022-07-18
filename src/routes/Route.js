import { Route } from "react-router-dom";

export default function RouteWrapper({
    component: Component,
    ...rest 
}){



    return(
        <Route 
            {...rest}
            render={ props => (

                <Component {...props} />
            ) }
        />
    );
}