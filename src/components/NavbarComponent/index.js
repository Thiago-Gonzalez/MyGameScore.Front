import { useContext } from 'react';
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import basketball from '../../assets/basketball_icon.png';
import { AuthContext } from '../../contexts/auth';

import './navbarcomponent.css';

export const NavbarComponent = ({ notfound }) => {
    const { signOut, loadingSignOut, setLoadingSignOut } = useContext(AuthContext);

    const history = useHistory();

    async function logout() {
        setLoadingSignOut(true);
        await signOut().then(history.push("/login"));
    }

    return(
        <Navbar expand="xl" bg="dark" variant='dark'>
            <Container>
                <Navbar.Brand>
                    <img 
                        src={basketball} 
                        alt="Imagem ilustrativa de uma bola de basquete" 
                        className='d-inline-block'
                    />
                    <span>myGameScore</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav as="ul" className="me-auto">
                        {notfound ? (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/">Cadastrar</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/lancar-pontos">Lançar pontos</Link>
                                <Link to="/ver-partidas">Ver partidas</Link>
                                <Link to="/ver-resultados">Ver resultados</Link>
                                <Link to="maiores-pontuacoes">Quadro de pontuações</Link>
                            </>
                        )}
                    </Nav>
                    {!notfound && <Button onClick={logout} variant='link' className='signout-btn'>{loadingSignOut ? 'Saindo...' : 'Sair'}</Button>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}