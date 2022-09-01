import { toast } from "react-toastify";
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from "../../contexts/auth";

import basketball from '../../assets/basketball.png';

import './register.css';
import { Link, useHistory } from "react-router-dom";

export const SignUpPage = () => {
    const { signUp, loadingAuth, loadingSignIn, signed, submited, setSubmited } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    

    const history = useHistory();

    useEffect(() => {

    }, [signed]);

    async function handleSumbit(e) {
        e.preventDefault();

        if (name !== '' && email !== '' && password !== '' && confirmPassword !== '' && password === confirmPassword) {
            await signUp(name, email, password);
            signed && history.push("/ver-partidas");
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
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

                <Link className="redirect-btn" to="/login">Já possui conta? Entre</Link>
            </div>
        </div>
    );
}