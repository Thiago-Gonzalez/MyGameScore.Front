import { NavbarComponent } from '../../components/NavbarComponent';
import { FooterComponent } from '../../components/FooterComponent';

import { Container } from 'react-bootstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';

import './lancarpontos.css';

import basketball from '../../assets/basketball.png';

import api from '../../services/api';
import { formatDateBr } from '../../utils';
import { useHistory } from 'react-router-dom';

export const LancarPontos = () => {

    const history = useHistory();

    const [token] = useState(localStorage.getItem('token'));
    const [playerId] = useState(localStorage.getItem('playerId'));

    const [date, setDate] = useState(formatDateBr(new Date(), "yyyy/MM/dd"));
    const [score, setScore] = useState();

    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (date !== null && score !== '' && score >= 0) {
            setLoading(true);
            await api.post("/api/matches", {
                date, score, idPlayer:playerId
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
                    history.push("/ver-partidas");
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
        <div id='lancar-pontos-page'>
            <NavbarComponent />
            <Container className='lp-content'>
                <img src={basketball} alt="Imagem ilustrativa de cesta de basquete" />
                <div className='register-match'>
                    <h1>Registrar Partida</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='label-input'>
                            <label>Data da partida</label>
                            <input type="date" value={date} onChange={ (e) => setDate(e.target.value)} />
                        </div>
                        <div className='label-input'>
                            <label>Pontuação obtida</label>
                            <input type="number" value={score} onChange={ (e) => setScore(parseInt(e.target.value))} />
                        </div>
                        <button className='btn' type='submit'>{loading ? 'Salvando...' : 'Salvar'}</button>
                    </form>
                </div>
            </Container>
            <FooterComponent />
        </div>
    );
}