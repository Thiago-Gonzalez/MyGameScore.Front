import { useState } from "react";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import './editmatchmodal.css';
import api from "../../services/api";
import { formatDateISO } from "../../utils";
import { useHistory } from "react-router-dom";


export const EditMatchModal = ({match, close}) => {
    const history = useHistory();

    const [token] = useState(localStorage.getItem('token'));

    const [date, setDate] = useState(formatDateISO(match.date));
    const [score, setScore] = useState(match.score);
    const [saving, setSaving] = useState(false);

    async function updateMatch(e) {
        e.preventDefault();

        if (date != null && score !== '' && score >= 0) {
            setSaving(true);
            await api.put(`/api/matches/${match.id}`, {
                id:match.id, date, score
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            .then(() => {
                toast.success("Dados da partida atualizados com sucesso!");
                history.go("/ver-partidas");
            })
            .catch((err) => {
                toast.error("Ooops, ocorreu um erro inesperado ao editar os dados da partida! Por favor, contatar o desenvolvedor.")
            })
        } else {
            toast.warning("Preencha os campos corretamente! Data e Pontos não podem ser nulos ou vazios e Pontos deve ser maior ou igual a zero.")
        }
    }

    return(
        <div className="match-modal">
            <div className="container">
                <button className='close' onClick={ close }>
                    <FiX size={23} color="#FFF" />
                    Voltar
                </button>

                <div className="modal-row">
                    <h2>Alterar dados da partida</h2>
                </div>

                <div className="modal-row">
                    <p>Jogador: {match.playerName}</p>
                </div>

                <form onSubmit={updateMatch}>
                    <div className="modal-row">
                        <label>Data: </label>
                        <input type="date" value={date} onChange={ (e) => setDate(e.target.value) }/>
                    </div>

                    <div className="modal-row">
                        <label>Pontos:</label>
                        <input type="number" value={score} onChange={ (e) => setScore(e.target.value) } />
                    </div>

                    <div className="modal-row">
                        <button type="submit" className="save-btn">{ saving ? "Salvando..." : "Salvar" }</button>
                    </div>
                </form>

            </div>
        </div>
    );
}