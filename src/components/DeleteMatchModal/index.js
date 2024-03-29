import { FiX} from 'react-icons/fi';
import './deletematchmodal.css';
import { formatDateBr } from '../../utils';
import api from '../../services/api';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

export const DeleteMatchModal = ({match, close}) => {
    const history = useHistory();

    const [token] = useState(localStorage.getItem('token'));

    async function deleteMatch() {
        await api.delete(`/api/matches/${match.id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        .then(() => {
            toast.success("Partida excluída com sucesso!");
            close();
            setTimeout(() => {
                history.go("/ver-partidas");
            }, 1000)
        })
        .catch((err) => {
            toast.error("Ooops, ocorreu um erro inesperado ao excluir esta partida! Por favor, contate o desenvolvedor.");
            console.log(err);
        })
    }

    return(
        <div className="match-modal">
            <div className="container">
                <button className='close' onClick={ close }>
                    <FiX size={23} color="#FFF" />
                    Voltar
                </button>

                <div className='modal-row'>
                    <h2>Tem certeza que deseja excluir esta partida?</h2>
                </div>

                <div className='modal-row'>
                    <p>Jogador: <span className='data'>{match.playerName}</span></p>
                </div>

                <div className='modal-row'>
                    <p>Data: <span className='data'>{formatDateBr(match.date)}</span></p>
                </div>

                <div className='modal-row'>
                    <p>Pontos: <span className='data'>{match.score}</span></p>
                </div>

                <div className='confirmation'>
                    <button className='confirmation-btn confirm' onClick={ () => deleteMatch() }>Excluir</button>
                    <button className='confirmation-btn decline' onClick={ close }>Cancelar</button>
                </div>
            </div>
        </div>
    );
}