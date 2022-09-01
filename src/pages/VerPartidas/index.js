import { FooterComponent } from "../../components/FooterComponent";
import { NavbarComponent } from "../../components/NavbarComponent";

import { Container, Table } from "react-bootstrap";

import "./verpartidas.css";

import basketball from "../../assets/basketball.png";
import { useEffect, useState } from "react";

import api from "../../services/api";
import { formatDateBr } from "../../utils";
import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { DeleteMatchModal } from "../../components/DeleteMatchModal";
import { EditMatchModal } from "../../components/EditMatchModal";

export const VerPartidas = () => {
  const [matches, setMatches] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const [playerId] = useState(localStorage.getItem('playerId'));

  const [loadingMatches, setLoadingMatches] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [currentMatch, setCurrentMatch] = useState();

  useEffect(() => {
    if (playerId) {
      async function loadMatches() {
        setLoadingMatches(true);
        await api
          .get(`/api/players/${playerId}/matches`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              setMatches(response.data);
            }
            setLoadingMatches(false);
          })
          .catch((err) => {
            setLoadingMatches(false);
            console.log(err);
          });
      }

      loadMatches();
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

  if (loadingMatches) {
    return (
      <div id="ver-partidas-page">
        <NavbarComponent />
        <Container className="vp-content">
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

  return (
    <div id="ver-partidas-page">
      <NavbarComponent />
      <Container className="vp-content">
        <img src={basketball} alt="Imagem ilustrativa de cesta de basquete" />
        <div>
          <h1>Suas partidas</h1>
          {matches.length === 0 ? (
            <>
              <p>
                Você ainda não possui partidas cadastradas!{" "}
                <Link to="/lancar-pontos">Cadastrar partida</Link>
              </p>
            </>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th scope="col">Data</th>
                  <th className="points" scope="col">Pontos</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                {matches
                  .sort((m1, m2) => {
                      return new Date(m1.date) - new Date(m2.date)
                  })
                  .reverse()
                  .map((match, index) => {
                    return (
                      <tr key={index}>
                        <td data-label="Data">{formatDateBr(match.date)}</td>
                        <td className="points" data-label="Pontos">
                          {match.score}
                        </td>
                        <td data-label="#">
                          <button className="action" style={{ backgroundColor: '#F6A935'}} onClick={ () => toggleEditModal(match) }>
                            <FiEdit2 color="#fff" size={17} />
                          </button>
                          <button className="action" style={{ backgroundColor: '#B20600'}} onClick={ () => toggleDeleteModal(match) }>
                            <FiTrash2 color="#fff" size={17} />
                          </button>
                        </td>
                      </tr>
                    );
                })}
              </tbody>
            </Table>
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
    </div>
  );
};
