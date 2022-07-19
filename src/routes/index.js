import { Route, Switch } from "react-router-dom";
import { SignIn } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { SignUp } from "../pages/Register";
import { LancarPontos } from "../pages/LancarPontos";
import { VerResultados } from "../pages/VerResultados";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/cadastro" component={SignUp} />
            
            <Route exact path="/lancar-pontos" component={LancarPontos} />
            <Route exact path="/ver-resultados" component={VerResultados} />

            <Route path="*" component={NotFound} />
        </Switch>
    );
}

export default Routes;