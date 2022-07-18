import { Container } from "react-bootstrap";

import crybasketball from '../../assets/crybasketball.png';

import './notfound.css';

export const NotFound = () => {
    return(
        <Container fluid className="notfound-page">
            <div className="info">
                <img className="crybasketball" src={crybasketball} alt="Imagem ilustrativa de uma bola de basquete triste" />
                <div className="info-data">
                    <h1>Ooops, página não encontrada!</h1>
                    <p>Para retornar a uma rota válida, utilize o menu de navegação no topo da página</p>
                </div>
            </div>
        </Container>
    );
}