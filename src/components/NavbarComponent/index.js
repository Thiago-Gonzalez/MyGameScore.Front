import { useContext } from 'react';
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import basketball from '../../assets/basketball_icon.png';
import { AuthContext } from '../../contexts/auth';

import './navbarcomponent.css';

export const NavbarComponent = () => {
    const { signOut, loadingSignOut, setLoadingSignOut } = useContext(AuthContext);

    const history = useHistory();

    function logout() {
        setLoadingSignOut(true);
        signOut();
        history.push("/cadastro");
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
                        <Nav.Link href="/lancar-pontos">Lançar pontos</Nav.Link>
                        <Nav.Link href="/ver-partidas">Ver partidas</Nav.Link>
                        <Nav.Link href="/ver-resultados">Ver resultados</Nav.Link>
                        <Nav.Link href="maiores-pontuacoes">Quadro de pontuações</Nav.Link>
                    </Nav>
                    <Button onClick={logout} variant='link'>{loadingSignOut ? 'Saindo...' : 'Sair'}</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}