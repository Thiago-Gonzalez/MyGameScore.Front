import { NavbarComponent } from "../../components/NavbarComponent";
import { FooterComponent } from "../../components/FooterComponent";

import { Container, Table } from "react-bootstrap";

import "./verresultados.css";

import basketball from "../../assets/basketball.png";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { formatDateBr } from "../../utils";
import { Link } from "react-router-dom";

export const VerResultados = () => {
  const [token] = useState(localStorage.getItem("token"));
  const [playerId] = useState(localStorage.getItem('playerId'));

  const [gamesPlayed, setGamesPLayed] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [scoreAverage, setScoreAverage] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [lowestScore, setLowestScore] = useState(0);
  const [timesRecordWasBeaten, setTimesRecordWasBeaten] = useState(0);
  const [seasonStart, setSeasonStart] = useState(null);
  const [seasonFinish, setSeasonFinish] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    if (playerId) {
      async function loadStats() {
        await api
          .get(`/api/players/${playerId}/stats`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async (response) => {
            if (response.status === 200) {
              setGamesPLayed(response.data.gamesPlayed);
              setTotalScore(response.data.totalScore);
              setScoreAverage(response.data.scoreAverage);
              setHighestScore(response.data.highestScore);
              setLowestScore(response.data.lowestScore);
              setTimesRecordWasBeaten(response.data.timesRecordWasBeaten);
              await loadMatches();
            }
            setLoadingStats(false);
          })
          .catch((err) => {
            setLoadingStats(false);
            console.log(err);
          });
      }

      async function loadMatches() {
        await api
          .get(`/api/players/${playerId}/matches`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              setMatches(response.data
                .sort((m1, m2) => {
                  return new Date(m1.date) - new Date(m2.date)
              }));
              setSeasonStart(matches[0].date);
              setSeasonFinish(matches[matches.length - 1].date);
            }
            setLoadingStats(false);
          })
          .catch((err) => {
            console.log(err);
            setLoadingStats(false);
          });
      }

      loadStats();
    }
    setLoadingStats(false);
  }, [playerId, token, matches]);

  if (loadingStats) {
    return (
      <div id="ver-resultados-page">
        <NavbarComponent />
        <Container className="vr-content">
          <img src={basketball} alt="Imagem ilustrativa de cesta de basquete" />
          <div>
            <h1>Resultados</h1>
            <p>Carregando estatísticas...</p>
          </div>
        </Container>
        <FooterComponent />
      </div>
    );
  }

  return (
    <div id="ver-resultados-page">
      <NavbarComponent />
      <Container className="vr-content">
        <img src={basketball} alt="Imagem ilustrativa de cesta de basquete" />
        <Table>
          {gamesPlayed === 0 ? (
            <>
              <thead>
                <tr>
                  <th className="heading" scope="col">
                    Resultados
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    Oops, parece que você ainda não possui partidas cadastradas! Que
                    tal cadastrar uma partida para começar a visualizar suas
                    estatísticas?
                    <Link to="/lancar-pontos">Cadastrar</Link>
                </tr>
              </tbody>
            </>
          ) : (
            <>
              <thead>
                <tr>
                  <th className="heading" scope="col">
                    Resultados
                  </th>
                  <th className="season" scope="col">
                    {formatDateBr(seasonStart)} até {formatDateBr(seasonFinish)}
                  </th>
                </tr>
              </thead>
              <tbody id="stats">
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
                  <td>{scoreAverage.toFixed(2)}</td>
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
            </>
          )}
        </Table>
      </Container>
      <FooterComponent />
    </div>
  );
};
