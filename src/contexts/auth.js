import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import api from '../services/api';

export const AuthContext = createContext({});

export default function AuthProvider({
    children,
    props
}) {
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loadingSignOut, setLoadingSignOut] = useState(false);
    const [loadingSignIn, setLoadingSignIn] = useState(false);
    const [signed, setSigned] = useState(false);
    const [playerId, setPlayerId] = useState();

    useEffect(() => {

        async function checkUser() {
            const token = localStorage.getItem('token');
            await setSigned(token ? true : false);
            setPlayerId(parseInt(localStorage.getItem('playerId')));
        }

        checkUser();
    }, []);


    async function signIn(email, password) {
        setLoadingAuth(true);

        await api.put("/api/players/login", { email, password })
        .then((response) => {
            const token = response.data.token;
            const playerId = parseInt(response.data.id);
            setSigned(token ? true : false);
            setPlayerId(playerId);
            localStorage.setItem('token', token);
            localStorage.setItem('playerId',playerId);
            setLoadingAuth(false);
            toast.success("Bem-vindo de volta!");
        })
        .catch((error) => {
            toast.error("Erro ao realizar login: verifique se suas credenciais estão corretas");
            console.log(error);
            setLoadingAuth(false);
        });

    }

    async function signUp(name, email, password) {
        setLoadingAuth(true);

        await api.post("/api/players", { name, email, password })
        .then(async (response) => {
            setLoadingAuth(false);
            toast.success("Cadastro realizado com sucesso!");
            if (response.status === 201) {  
                setLoadingSignIn(true);
                const responseLogin = await api.put("/api/players/login", { email, password });
                localStorage.setItem('token', responseLogin.data.token);
                setLoadingSignIn(false);
                toast.success({name} + ", bem-vindo ao myGameScore! Que tal começar a cadastrar suas partidas?");
            }
        })
        .catch((error) => {
            setLoadingAuth(false);
            toast.error(`Erro ao cadastrar jogador: ${error.response.data}`);
        });
    }

    async function signOut() {
        await localStorage.clear();
        setLoadingSignOut(false);
        setSigned(false);
    }

    return ( 
        <AuthContext.Provider 
            value = {
                {
                    signed,
                    signOut,
                    signIn,
                    signUp,
                    loadingAuth,
                    loadingSignOut,
                    setLoadingSignOut,
                    loadingSignIn,
                    playerId
                }
            } >
                {
                    children
                } 
        </AuthContext.Provider>
    );
}