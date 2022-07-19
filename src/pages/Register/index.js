import { toast } from "react-toastify";
import { useState } from 'react';

import basketball from '../../assets/basketball.png';

import './register.css';

export const SignUp = () => {
    const [name, SetName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSumbit(e) {
        e.preventDefault();

        if (name !== '' && email !== '' && password !== '') {
            toast.success('Form submetido com sucesso!');
        } else if (name === '' || email === '' || password === '') {
            toast.warning('Preencha todos os campos!');
        }
    }

    return(
        <div className="sign-page">
            <div className="sign">
                <div className="sign-area">
                    <img src={basketball} alt="Imagem ilustrativa de uma cesta de basquete" />
                </div>

                <form onSubmit={handleSumbit}>
                    <h1>Cadastre-se no myGameScore</h1>
                    <input type="text" placeholder="Nome" value={name} onChange={ (e) => SetName(e.target.value)} />
                    <input type="email" placeholder="Email" value={email} onChange={ (e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Senha" value={password} onChange={ (e) => setPassword(e.target.value)} />
                    <button className='btn' type="submit">Cadastrar</button>
                </form>

                <a className="redirect-btn" href="/">Já possui conta? Entre</a>
            </div>
        </div>
    );
}