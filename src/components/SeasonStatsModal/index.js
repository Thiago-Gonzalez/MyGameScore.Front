import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FiX } from "react-icons/fi";
import api from "../../services/api";
import { formatDateBr } from "../../utils";

import "./seasonstatsmodal.css";


export const SeasonStatsModal = ({season, close}) => {
    const [token] = useState(localStorage.getItem("token"));

    const [gamesPlayed, setGamesPLayed] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [scoreAverage, setScoreAverage] = useState(0);
    const [highestScore, setHighestScore] = useState(0);
    const [lowestScore, setLowestScore] = useState(0);
    const [timesRecordWasBeaten, setTimesRecordWasBeaten] = useState(0);
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        if (season) {
            async function loadStats() {
              await api
                .get(`/api/seasons/${season.id}/stats`, {
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
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }

            loadStats();
        }

        setLoadingStats(false);
    }, []);

    if (loadingStats) {
        return (
            <div className="match-modal">
                <div className="container">
                    <button className='close' onClick={ close }>
                        <FiX size={23} color="#FFF" />
                        Voltar
                    </button>

                    <div className='modal-row'>
                        <h2>Resultados</h2>
                    </div>

                    <div className="modal-row">
                        <p>Carregando estatísticas...</p>
                    </div>

                </div>
            </div>
        );
    }

    return(
        <div className="match-modal">
            <div className="container">
                <button className='close' onClick={ close }>
                    <FiX size={23} color="#FFF" />
                    Voltar
                </button>

                <div className='modal-row'>
                    <h2 className="stats-modal-heading">Resultados <span>{formatDateBr(season.seasonStart)} - {formatDateBr(season.seasonEnd)}</span></h2>
                </div>

                <div className="modal-row">
                    <Table>
                        <tbody className="stats">
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
                    </Table>
                </div>

            </div>
        </div>
    );
}