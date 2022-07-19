import { toast } from "react-toastify";
import { useContext, useState } from 'react';

import './login.css';

import basketball from '../../assets/basketball.png';
import { AuthContext } from "../../contexts/auth";

export const SignIn = () => {
    const { signIn, loadingAuth } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSumbit(e) {
        e.preventDefault();

        if (email !== '' && password !== '') {
            signIn(email, password);
            setEmail('');
            setPassword('');
        } else if (email === '' || password === '') {
            toast.warning('Preencha todos os campos!');
        }
    }

    return (
        <div className="sign-page">
            <div className="sign">
                <div className="sign-area">
                    <img src={basketball} alt="Imagem ilustrativa de uma cesta de basquete" />
                </div>

                <form onSubmit={handleSumbit}>
                    <h1>Acesse myGameScore</h1>
                    <input type="email" placeholder="Email" value={email} onChange={ (e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Senha" value={password} onChange={ (e) => setPassword(e.target.value)} />
                    <button className='btn' type="submit">{loadingAuth ? 'Acessando...' : 'Acessar'}</button>
                </form>

                <a className="redirect-btn" href="/cadastro">Ainda não possui uma conta? Cadastre-se</a>
            </div>
        </div>
    );
}