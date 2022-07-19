import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useHistory, withRouter } from "react-router-dom";
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
                history.push("/lancar-pontos");
                toast.success({name} + ", bem-vindo ao myGameScore! Que tal começar a cadastrar suas partidas?");
            }
        })
        .catch((error) => {
            setLoadingAuth(false);
            toast.error(`Erro ao cadastrar jogador: ${error.response.data}`);
        });
    }

    function signOut() {
        setLoadingSignOut(true);
        setTimeout(() => {
            localStorage.clear();
            history.push("/");
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