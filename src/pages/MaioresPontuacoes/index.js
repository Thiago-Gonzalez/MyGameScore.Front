import { FooterComponent } from '../../components/FooterComponent';
import { NavbarComponent } from '../../components/NavbarComponent';

import { Container, Table } from 'react-bootstrap';

import './maiorespontuacoes.css';

import basketball from '../../assets/basketball.png';
import { useState } from 'react';

export const MaioresPontuacoes = () => {
    const [matches, setMatches] = useState([{
        date: "12/03/2022",
        score: 32,
        playerName: "Thiago"
    }, {
        date: "20/05/2022",
        score: 46,
        playerName: "Yago"
    },
    {
        date: "17/07/2022",
        score: 37,
        playerName: "Romulo"
    }, {
        date: "18/07/2022",
        score: 35,
        playerName: "Cayo"
    }]);

    return (
        <div id="maiores-pontuacoes-page">
            <NavbarComponent />
            <Container className="mp-content">
                <img src={basketball} alt="Imagem ilustrativa de cesta de basquete" />
                <div>
                    <h1>Maiores Pontuações</h1>
                    {matches.length === 0 ? (
                        <>
                            <p>
                                Ooops, parece que nenhum jogador já cadastrou partidas! <a href="/lancar-pontos">Seja o primeiro</a>
                            </p>
                        </>
                    ) : (
                        <Table>
                            <thead>
                                <tr>
                                    <th scope='col'>#</th>
                                    <th scope='col'>Jogador</th>
                                    <th className='points' scope='col'>Pontos</th>
                                    <th scope='col'>Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matches
                                    .sort((m1, m2) => {
                                        return m1.score - m2.score;
                                    })
                                    .reverse()
                                    .map((match, index) => {
                                        return(
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td data-aria-label='Jogador'>{match.playerName}</td>
                                                <td className='points' data-lavel="Pontos">{match.score}</td>
                                                <td data-label="Data">{match.date}</td>
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