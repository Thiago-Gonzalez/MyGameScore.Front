import { Route, Switch } from "react-router-dom";
import { SignIn } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { SignUpPage } from "../pages/Register";
import { LancarPontos } from "../pages/LancarPontos";
import { VerResultados } from "../pages/VerResultados";
import { VerPartidas } from "../pages/VerPartidas";
import { MaioresPontuacoes } from "../pages/MaioresPontuacoes";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

const Routes = () => {
    const { signed } = useContext(AuthContext);

    return (
        <Switch>
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/" component={SignUpPage} />
            
            {(signed && 
                <>
                    <Route exact path="/lancar-pontos" component={LancarPontos} />
                    <Route exact path="/ver-resultados" component={VerResultados} />
                    <Route exact path="/ver-partidas" component={VerPartidas} />
                    <Route exact path="/maiores-pontuacoes" component={MaioresPontuacoes} />
                </>
            )}
            <Route path="*" component={NotFound} />
        </Switch>
    );
}

export default Routes;