
import { Container } from "react-bootstrap";

import crybasketball from '../../assets/crybasketball.png';
import { FooterComponent } from "../../components/FooterComponent";
import { NavbarComponent } from "../../components/NavbarComponent";

import './notfound.css';

export const NotFound = () => {

    return(
        <div className="notfound-page">
            <NavbarComponent />
            <Container fluid>
                <div className="info">
                    <img className="crybasketball" src={crybasketball} alt="Imagem ilustrativa de uma bola de basquete triste" />
                    <div className="info-data">
                        <h1>Ooops, página não encontrada!</h1>
                        <p>Para retornar a uma rota válida, utilize o menu de navegação no topo da página</p>
                    </div>
                </div>
            </Container>
            <FooterComponent />
        </div>
    );
}