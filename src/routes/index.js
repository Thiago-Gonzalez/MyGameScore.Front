import { Route, Switch } from "react-router-dom";
import { SignIn } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { SignUp } from "../pages/Register";
import { LancarPontos } from "../pages/LancarPontos";
import { VerResultados } from "../pages/VerResultados";
import { VerPartidas } from "../pages/VerPartidas";
import { MaioresPontuacoes } from "../pages/MaioresPontuacoes";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/cadastro" component={SignUp} />
            
            <Route exact path="/lancar-pontos" component={LancarPontos} />
            <Route exact path="/ver-resultados" component={VerResultados} />
            <Route exact path="/ver-partidas" component={VerPartidas} />
            <Route exact path="/maiores-pontuacoes" component={MaioresPontuacoes} />

            <Route path="*" component={NotFound} />
        </Switch>
    );
}

export default Routes;