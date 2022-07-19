import { FooterComponent } from '../../components/FooterComponent';
import { NavbarComponent } from '../../components/NavbarComponent';

import { Container, Table } from 'react-bootstrap';

import './verpartidas.css';

import basketball from '../../assets/basketball.png';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth';

import api from '../../services/api';

export const VerPartidas = () => {
    const [matches, setMatches] = useState([]);
    const { playerId } = useContext(AuthContext);
    const [token] = useState(localStorage.getItem('token'));

    const [loadingMatches, setLoadingMatches] = useState(false);

    useEffect(() => {
        async function loadMatches() {
            setLoadingMatches(true);
            await api.get(`/api/players/${playerId}/matches`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(response => {
                if (response.status === 200) {
                    setMatches(response.data);
                }
                setLoadingMatches(false);
            })
            .catch(err => {
                setLoadingMatches(false);
                console.log(err);
            })
        }

        loadMatches();
    }, [playerId, token]);

    if (loadingMatches) {
        return (
            <div id="ver-partidas-page">
                <NavbarComponent />
                <Container className='vp-content'>
                    <img src={basketball} alt="Imagem ilustrativa de cesta de basquete" />
                    <div>
                        <h1>Suas partidas</h1>
                        <p>Carregando partidas...</p>
                    </div>
                </Container>
                <FooterComponent />
            </div>
        );
    }

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