import { Route, Switch } from "react-router-dom";
import { SignIn } from "../pages/Login";
import { NotFound } from "../pages/NotFound";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />

            <Route path="*" component={NotFound} />
        </Switch>
    );
}

export default Routes;