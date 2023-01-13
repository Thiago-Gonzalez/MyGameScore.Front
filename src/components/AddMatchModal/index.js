import { useState } from "react";
import { FiX } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { formatDateBr } from "../../utils";

import "./addmatchmodal.css";

import api from '../../services/api';
import { toast } from "react-toastify";

export const AddMatchModal = ({season, close}) => {
    const history = useHistory();

    const [token] = useState(localStorage.getItem('token'));
    const [playerId] = useState(localStorage.getItem('playerId'));
    const [date, setDate] = useState(formatDateBr(new Date(), "yyyy/MM/dd"));
    const [score, setScore] = useState();

    const [loading, setLoading] = useState(false);

    const addMatch = async (e) => {
        e.preventDefault();

        if (date !== null && score !== '' && score >= 0) {
            setLoading(true);
            await api.post("/api/matches", {
                date, score, idPlayer:playerId, idSeason:season.id
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            .then(response => {
                setLoading(false);
                if (response.status === 201) {
                    setDate(null);
                    setScore();
                    toast.success('Partida cadastrada com sucesso!');
                    setTimeout(() => {
                        history.go("/ver-partidas");
                    }, 1000)
                }
            })
            .catch(error => {
                setLoading(false);
                toast.error(`Erro ao cadastrar partida: ${error.response.data}`)
                console.log(error.response.data);
            })
        } else {
            toast.warning("Preencha todos os campos!");
        }
    }

    return(
        <div className="match-modal">
            <div className="container">
                <button className='close' onClick={ close }>
                    <FiX size={23} color="#FFF" />
                    Voltar
                </button>

                <div className='modal-row'>
                    <h2>Registrar Partida</h2>
                </div>

                <div className="modal-row">
                    <form onSubmit={addMatch}>
                        <div className='label-input'>
                            <label>Data da partida</label>
                            <input type="date" value={date} onChange={ (e) => setDate(e.target.value)} />
                        </div>
                        <div className='label-input'>
                            <label>Pontuação obtida</label>
                            <input type="number" value={score} onChange={ (e) => setScore(parseInt(e.target.value))} />
                        </div>

                        <div className='confirmation'>
                            <button className='save' type='submit'>{loading ? 'Salvando...' : 'Salvar'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}