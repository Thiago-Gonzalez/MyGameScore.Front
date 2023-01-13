import { FooterComponent } from "../../components/FooterComponent";
import { NavbarComponent } from "../../components/NavbarComponent";

import { Container } from "react-bootstrap";

import "./verpartidas.css";

import { useEffect, useState } from "react";

import api from "../../services/api";
import { DeleteMatchModal } from "../../components/DeleteMatchModal";
import { EditMatchModal } from "../../components/EditMatchModal";
import { Season } from "../../components/Season";
import { FiPlus } from "react-icons/fi";
import { AddMatchModal } from "../../components/AddMatchModal";
import { SeasonStatsModal } from "../../components/SeasonStatsModal";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

export const VerPartidas = () => {
  const history = useHistory();
  const [seasons, setSeasons] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const [playerId] = useState(localStorage.getItem('playerId'));

  const [loadingSeasons, setLoadingSeasons] = useState(false);
  const [loadingAddSeason, setLoadingAddSeason] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddMatchModal, setShowAddMatchModal] = useState(false);
  const [showSeasonStatsModal, setShowSeasonStatsModal] = useState(false);

  const [currentMatch, setCurrentMatch] = useState();
  const [currentSeason, setCurrentSeason] = useState();

  useEffect(() => {
    if (playerId) {
      async function loadSeasons() {
        setLoadingSeasons(true);
        await api
          .get(`/api/players/${playerId}/seasons`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              setSeasons(response.data);
            }
            setLoadingSeasons(false);
          })
          .catch((err) => {
            setLoadingSeasons(false);
            console.log(err);
          });
      }

      loadSeasons();
    }
  }, [playerId, token]);

  function toggleDeleteModal(match) {
    setShowDeleteModal(!showDeleteModal);
    setCurrentMatch(match);
  }

  function toggleEditModal(match) {
    setShowEditModal(!showEditModal);
    setCurrentMatch(match);
  }

  function toggleAddMatchModal(season) {
    setShowAddMatchModal(!showAddMatchModal);
    setCurrentSeason(season);
  }

  function toggleSeasonStatsModal(season) {
    setShowSeasonStatsModal(!showSeasonStatsModal);
    setCurrentSeason(season);
  }

  async function addSeason() {
    if (playerId) {
      setLoadingAddSeason(true);
      await api.post(`/api/seasons`, {
        idPlayer:playerId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      .then(response => {
        setLoadingAddSeason(false);
        toast.success("Temporada registrada com sucesso! Agora você já pode cadastrar suas partidas para visualizar suas estatísticas.");
        setTimeout(() => {
          history.go("/ver-partidas");
        }, 2000);
      })
      .catch((err) => {
        toast.error("Ooops, ocorreu um erro inesperado ao cadastrar temporada! Por favor tente novamente mais tarde ou tente relogar antes de cadastrar uma nova temporada.")
        console.log(err);
      })
    }
  }

  if (loadingSeasons) {
    return (
      <div id="ver-partidas-page">
        <NavbarComponent />
        <Container className="vp-content">
          <div>
            <h1>Suas partidas</h1>
            <p>Carregando partidas...</p>
          </div>
        </Container>
        <FooterComponent />
      </div>
    );
  }

  return (
    <div id="ver-partidas-page">
      <NavbarComponent />
      <Container className="vp-content">
        <div>
          <div className="heading">
            <h1>Suas partidas</h1>
            <button className="new-btn" onClick={() => addSeason()}>
              <FiPlus size={25} color="#FFF" />
              {loadingAddSeason ? ("Cadastrando Temporada...") : ("Adicionar Temporada")}
            </button>
          </div>
          {seasons.length === 0 ? (
              <p>
                Você ainda não possui partidas cadastradas! <br/> Que tal cadastrar uma temporada para registrar suas partidas?
              </p>
          ) : (
                seasons.sort((s1, s2) => {
                  return new Date(s1.createdAt) - new Date(s2.createdAt)
                })
                .reverse()
                .map((season, index) => {
                  return(
                    <Season 
                      key={index} 
                      season={season} 
                      toggleDeleteModal={toggleDeleteModal} 
                      toggleEditModal={toggleEditModal} 
                      toggleAddMatchModal={toggleAddMatchModal} 
                      toggleSeasonStatsModal={toggleSeasonStatsModal}
                    />
                  )
                })

          )}
        </div>
      </Container>
      <FooterComponent />

      {showEditModal && (
        <EditMatchModal
          match={currentMatch}
          close={toggleEditModal}
        />
      )}

      {showDeleteModal && (
        <DeleteMatchModal
          match={currentMatch}
          close={toggleDeleteModal}
        />
      )}

      {showAddMatchModal && (
        <AddMatchModal
          season={currentSeason}
          close={toggleAddMatchModal}
        />
      )}

      {showSeasonStatsModal && (
        <SeasonStatsModal
          season={currentSeason}
          close={toggleSeasonStatsModal}
        />
      )}
    </div>
  );
};
