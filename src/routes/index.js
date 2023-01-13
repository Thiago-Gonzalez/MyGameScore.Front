import { Switch } from "react-router-dom";
import Route from './Route'; 
import { SignIn } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { SignUpPage } from "../pages/Register";
import { LancarPontos } from "../pages/LancarPontos";
import { VerResultados } from "../pages/VerResultados";
import { VerPartidas } from "../pages/VerPartidas";
import { MaioresPontuacoes } from "../pages/MaioresPontuacoes";

const Routes = () => {

    return (
        <Switch>
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/" component={SignUpPage} />


            <Route exact path="/ver-partidas" component={VerPartidas} isPrivate />
            <Route exact path="/maiores-pontuacoes" component={MaioresPontuacoes} isPrivate />

            <Route path="*" component={NotFound}/>
        </Switch>
    );
}

export default Routes;