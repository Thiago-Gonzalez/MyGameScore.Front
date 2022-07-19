import { NavbarComponent } from '../../components/NavbarComponent';
import { FooterComponent } from '../../components/FooterComponent';

import { Container, Table } from 'react-bootstrap';

import './verresultados.css';

import basketball from '../../assets/basketball.png';
import { useContext, useEffect, useState } from 'react';
import AuthProvider from '../../contexts/auth';
import api from '../../services/api';

export const VerResultados = () => {
    const { playerId } = useContext(AuthProvider);
    const [token] = useState(localStorage.getItem('token'));

    const [matches, setMatches] = useState([]);

    const [gamesPlayed, setGamesPLayed] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [scoreAverage, setScoreAverage] = useState(0);
    const [highestScore, setHighestScore] = useState(0);
    const [lowestScore, setLowestScore] = useState(0);
    const [timesRecordWasBeaten, setTimesRecordWasBeaten] = useState(0);
    const [seasonStart, setSeasonStart] = useState(null);
    const [seasonFinish, setSeasonFinish] = useState(null);

    const [statsLoaded, setStatsLoaded] = useState(false);
    const [loadingStats, setLoadingStats] = useState(false);

    useEffect(() => {
        async function loadStats() {
            setLoadingStats(true);
            await api.get(`/api/players/${playerId}/stats`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(response => {
                if (response.status === 200) {
                    setLoadingStats(false);
                    setGamesPLayed(response.data.gamesPlayed);
                    setTotalScore(response.data.totalScore);
                    setScoreAverage(response.data.scoreAverage);
                    setHighestScore(response.data.highestScore);
                    setLowestScore(response.data.lowestScore);
                    setTimesRecordWasBeaten(response.data.timesRecordWasBeaten);
                    loadMatches();
                    setStatsLoaded(true);
                }
                setLoadingStats(false);
            })
            .catch(err => {
                setLoadingStats(false);
                console.log(err);
            })
        }

        async function loadMatches() {
            await api.get(`/api/players/${playerId}/matches`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(response => {
                if (response.status === 200) {
                    setMatches(response.data);
                    setSeasonStart(matches[0].date);
                    setSeasonFinish(matches[-1].date);
                }
            })
            .catch(err => {
                console.log(err);
            })
        }

        loadStats();
    }, [playerId, token, matches])

    if (!statsLoaded) {
        return(
            <div id='ver-resultados-page'>
            <NavbarComponent />
            <Container className='vr-content'>
                <img src={basketball} alt="Imagem ilustrativa de cesta de basquete" />
                <div>
                    <h1>Resultados</h1>
                    <p>
                        Oops, parece que você ainda não possui partidas cadastradas! Que tal cadastrar uma partida para começar a visualizar suas estatísticas?
                        <a href="/lancar-pontos">Cadastrar</a>    
                    </p>
                </div>
            </Container>
            <FooterComponent />
        </div>
        );
    }

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
                        {loadingStats ? (
                            <p>Carregando estatísticas...</p>
                        ) : (
                            <>
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
                            </>
                        )}
                    </tbody>
                </Table>
            </Container>
            <FooterComponent />
        </div>
    );
}