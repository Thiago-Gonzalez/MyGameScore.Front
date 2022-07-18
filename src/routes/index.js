import { Route, Switch } from "react-router-dom";
import { SignIn } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { SignUp } from "../pages/Register";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/cadastro" component={SignUp} />

            <Route path="*" component={NotFound} />
        </Switch>
    );
}

export default Routes;