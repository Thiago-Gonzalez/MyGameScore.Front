import { NavbarComponent } from '../../components/NavbarComponent';
import { FooterComponent } from '../../components/FooterComponent';

import { Container } from 'react-bootstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';

import './lancarpontos.css';

import basketball from '../../assets/basketball.png';

export const LancarPontos = () => {
    const [date, setDate] = useState(null);
    const [score, setScore] = useState();

    function handleSubmit(e) {
        e.preventDefault();

        if (date !== null && score != '' && score >= 0) {
            toast.success("Form submetido com sucesso!");
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
                            <input type="number" value={score} onChange={ (e) => setScore(e.target.value)} />
                        </div>
                        <button className='btn' type='submit'>Salvar</button>
                    </form>
                </div>
            </Container>
            <FooterComponent />
        </div>
    );
}