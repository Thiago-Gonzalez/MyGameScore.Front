import { NavbarComponent } from '../../components/NavbarComponent';
import { FooterComponent } from '../../components/FooterComponent';

import { Container, Table } from 'react-bootstrap';

import './verresultados.css';

import basketball from '../../assets/basketball.png';
import { useState } from 'react';

export const VerResultados = () => {
    const [gamesPlayed, setGamesPLayed] = useState(5);
    const [totalScore, setTotalScore] = useState(85);
    const [scoreAverage, setScoreAverage] = useState(17);
    const [highestScore, setHighestScore] = useState(24);
    const [lowestScore, setLowestScore] = useState(10);
    const [timesRecordWasBeaten, setTimesRecordWasBeaten] = useState(2);
    const [seasonStart, setSeasonStart] = useState('10/02/2019');
    const [seasonFinish, setSeasonFinish] = useState('28/03/2019');

    return(
        <div id='ver-resultados-page'>
            <NavbarComponent />
            <Container className='vr-content'>
                <img src={basketball} alt="Imagem ilustrativa de cesta de basquete" />
                <Table>
                    <thead>
                        <tr>
                            <th className='heading' scope='col'>
                                Resultados
                            </th>
                            <th className='season' scope='col'>{seasonStart} até {seasonFinish}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Jogos disputados</th>
                            <td>{gamesPlayed}</td>
                        </tr>
                        <tr>
                            <th>Total de pontos marcados na temporada</th>
                            <td>{totalScore}</td>
                        </tr>
                        <tr>
                            <th>Média de pontos por jogo</th>
                            <td>{scoreAverage}</td>
                        </tr>
                        <tr>
                            <th>Maior pontuação em um jogo</th>
                            <td>{highestScore}</td>
                        </tr>
                        <tr>
                            <th>Menor pontuação em um jogo</th>
                            <td>{lowestScore}</td>
                        </tr>
                        <tr>
                            <th>Quantidade de vezes que bateu o próprio recorde</th>
                            <td>{timesRecordWasBeaten}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
            <FooterComponent />
        </div>
    );
}