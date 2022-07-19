import { NavbarComponent } from "../../components/NavbarComponent";
import { FooterComponent } from "../../components/FooterComponent";

import { Container, Table } from "react-bootstrap";

import "./verresultados.css";

import basketball from "../../assets/basketball.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import api from "../../services/api";
import { formatData } from "../../utils";

export const VerResultados = () => {
  const { playerId } = useContext(AuthContext);
  const [token] = useState(localStorage.getItem("token"));

  const [matches, setMatches] = useState([]);

  const [gamesPlayed, setGamesPLayed] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [scoreAverage, setScoreAverage] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [lowestScore, setLowestScore] = useState(0);
  const [timesRecordWasBeaten, setTimesRecordWasBeaten] = useState(0);
  const [seasonStart, setSeasonStart] = useState(null);
  const [seasonFinish, setSeasonFinish] = useState(null);

  const [hasStats, setHasStats] = useState(false);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {

    if (playerId) {
        async function loadStats() {
            await api
              .get(`/api/players/${playerId}/stats`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                if (response.status === 200) {
                  setGamesPLayed(response.data.gamesPlayed);
                  setTotalScore(response.data.totalScore);
                  setScoreAverage(response.data.scoreAverage);
                  setHighestScore(response.data.highestScore);
                  setLowestScore(response.data.lowestScore);
                  setTimesRecordWasBeaten(response.data.timesRecordWasBeaten);
                  loadMatches();
                }
                setLoadingStats(false);
              })
              .catch((err) => {
                setLoadingStats(false);
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
                  setMatches(response.data);
                  setSeasonStart(response.data[0].date);
                  setSeasonFinish(response.data[response.data.length - 1].date);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }

          loadStats();
    }
  }, [playerId, token]);

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
          <thead>
            <tr>
              <th className="heading" scope="col">
                Resultados
              </th>
              <th className="season" scope="col">
                {formatData(seasonStart)} até {formatData(seasonFinish)}
              </th>
            </tr>
          </thead>
          <tbody id="stats">
            {!gamesPlayed ? (
              <p>
                Oops, parece que você ainda não possui partidas cadastradas! Que
                tal cadastrar uma partida para começar a visualizar suas
                estatísticas?
                <a href="/lancar-pontos">Cadastrar</a>
              </p>
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
};
