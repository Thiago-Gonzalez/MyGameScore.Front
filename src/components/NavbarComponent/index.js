import { Button, Navbar, Nav, Container } from 'react-bootstrap';

import basketball from '../../assets/basketball_icon.png';

import './navbarcomponent.css';

export const NavbarComponent = () => {
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
                    </Nav>
                    <Button variant='link'>Sair</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}