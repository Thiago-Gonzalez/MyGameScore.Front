import { useState } from "react";
import { Table } from "react-bootstrap";
import { formatDateBr } from "../../utils";
import { Match } from "../Match";

import "./season.css";

export const Season = ({season, toggleDeleteModal, toggleEditModal, toggleAddMatchModal, toggleSeasonStatsModal}) => {
    const [toggleSeason, setToggleSeason] = useState(false);

    if (season.matches.length === 0) {
      return(
        <div className="season">
          <div className="toggle">
            <h4>Nova Temporada</h4>
            <button className="toggle-btn" onClick={() => setToggleSeason(!toggleSeason)}><i className={toggleSeason ? ("arrow up") : ("arrow down")}></i></button>
          </div>
          {toggleSeason && (
            <div>
              <p className="msg">
                Parece que esta temporada ainda não possui partidas cadastradas, que tal começar agora?
              </p>
                <button className="season-btn" onClick={() => toggleAddMatchModal(season)}>Adicionar partida</button>
            </div>
          )}
        </div>
      );
    }

    return(
        <div className="season">
                      <div className="toggle">
                        <h4>Temporada {formatDateBr(season.seasonStart)} - {formatDateBr(season.seasonEnd)}</h4>
                        <button className="toggle-btn" onClick={() => setToggleSeason(!toggleSeason)}><i className={toggleSeason ? ("arrow up") : ("arrow down")}></i></button>
                      </div>

                      {toggleSeason && (
                        <>
                          <Table>
                            <thead>
                              <tr>
                                <th scope="col">Data</th>
                                <th className="points" scope="col">Pontos</th>
                                <th className="action-column" scope="col">#</th>
                              </tr>
                            </thead>
                            <tbody>
                              {season.matches
                              .sort((m1, m2) => {
                                return new Date(m1.date) - new Date(m2.date)
                              })
                              .reverse()
                              .map((match, index) => {
                                return(
                                  <Match key={index} match={match} toggleDeleteModal={toggleDeleteModal} toggleEditModal={toggleEditModal} />
                                );
                              })}
                            </tbody>
                          </Table>

                          <div>
                            <button className="season-btn" onClick={() => toggleAddMatchModal(season)}>Adicionar partida</button>
                            <button className="season-btn" onClick={() => toggleSeasonStatsModal(season)}>Ver Estatísticas</button>
                          </div>
                        </>
                      )}
                        
                    </div>
    )
}