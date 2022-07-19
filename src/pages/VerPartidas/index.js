import { FooterComponent } from '../../components/FooterComponent';
import { NavbarComponent } from '../../components/NavbarComponent';

import { Container, Table } from 'react-bootstrap';

import './verpartidas.css';

import basketball from '../../assets/basketball.png';
import { useState } from 'react';

export const VerPartidas = () => {
    const [matches, setMatches] = useState([{
        date: "12/03/2022",
        score: 32
    }, {
        date: "20/03/2022",
        score: 46
    }]);

    return(
        <div id="ver-partidas-page">
            <NavbarComponent />
            <Container className='vp-content'>
                <img src={basketball} alt="Imagem ilustrativa de cesta de basquete" />
                <div>
                    <h1>Suas partidas</h1>
                    {matches.length === 0 ? (
                        <>
                            <p>
                                Você ainda não possui partidas cadastradas! <a href="/lancar-pontos">Cadastrar partida</a>
                            </p>
                        </>
                    ) : (
                        <Table>
                            <thead>
                                <tr>
                                    <th scope='col'>Data</th>
                                    <th className='points' scope='col'>Pontos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matches.map((match, index) => {
                                    return(
                                        <tr key={index}>
                                            <td data-label="Data">{match.date}</td>
                                            <td className='points' data-lavel="Pontos">{match.score}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    )}
                </div>
            </Container>
            <FooterComponent />
        </div>
    );
}