import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import api from '../services/api';

export const AuthContext = createContext({});

export default function AuthProvider({
    children
}) {

    const history = useHistory();

    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loadingSignOut, setLoadingSignOut] = useState(false);
    const [loadingSignIn, setLoadingSignIn] = useState(false);
    const [signed, setSigned] = useState(false);

    useEffect(() => {

        function checkUser() {
            setSigned(!!localStorage.getItem('token'));
        }

        checkUser();
    }, []);


    async function signIn(email, password) {
        setLoadingAuth(true);

        await api.put("/api/players/login", { email, password })
        .then((response) => {
            setLoadingAuth(false);
            localStorage.setItem('token', response.data.token);
            history.push("/lancar-pontos");
            toast.success("Bem-vindo de volta!");
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
        });

    }

    async function signUp(name, email, password) {
        setLoadingAuth(true);

        await api.post("/api/players", { name, email, password })
        .then(async (response) => {
            setLoadingAuth(false);
            setLoadingSignIn(true);
            toast.success("Cadastro realizado com sucesso!");
            if (response.data.status) {
                setLoadingSignIn(false);
                const responseLogin = await api.put("/api/players/login", { email, password });
                localStorage.setItem('token', responseLogin.data.token);
                history.push("/lancar-pontos");
                toast.success("Bem-vindo ao myGameScore! Que tal começar a cadastrar suas partidas?");
            }
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
            toast.error(`Erro ao cadastrar jogador: ${error.message}`);
            console.log("Erro ao cadastrar jogador: " + error.message);
        });
    }

    function signOut() {
        setLoadingSignOut(true);
        console.log(signed);
        setTimeout(() => {
            localStorage.clear();
            history.push("/");
            console.log(signed);
            setLoadingSignOut(false);
        }, 1000);
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
                    loadingSignIn
                }
            } >
                {
                    children
                } 
        </AuthContext.Provider>
    );
}