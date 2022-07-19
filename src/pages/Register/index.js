import { toast } from "react-toastify";
import { useContext, useState } from 'react';

import { AuthContext } from "../../contexts/auth";

import basketball from '../../assets/basketball.png';

import './register.css';

export const SignUpPage = () => {
    const { signUp, loadingAuth, loadingSignIn } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function handleSumbit(e) {
        e.preventDefault();

        if (name !== '' && email !== '' && password !== '' && confirmPassword !== '' && password === confirmPassword) {
            signUp(name, email, password);
            setName('');
            setEmail('');
            setPassword('');
        } else if (name === '' || email === '' || password === '' || confirmPassword === '') {
            toast.warning('Preencha todos os campos!');
        } else if (password !== confirmPassword) {
            toast.warning('As senhas devem coincidir!');
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
                    <input type="text" placeholder="Nome" value={name} onChange={ (e) => setName(e.target.value)} />
                    <input type="email" placeholder="Email" value={email} onChange={ (e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Senha" value={password} onChange={ (e) => setPassword(e.target.value)} />
                    <input type="password" placeholder="Confirme a senha" value={confirmPassword} onChange={ (e) => setConfirmPassword(e.target.value)} />
                    {loadingSignIn ? (
                        <button className="btn">Logando jogador...</button>
                    ) : (
                        <button className='btn' type="submit">{loadingAuth ? 'Cadastrando...' : 'Cadastrar'}</button>
                    )}
                </form>

                <a className="redirect-btn" href="/">Já possui conta? Entre</a>
            </div>
        </div>
    );
}