import github from '../../assets/github.png';
import linkedin from '../../assets/linkedin.png';
import email from '../../assets/gmail.png';
import instagram from '../../assets/instagram.png';

import "./footercomponent.css";

export const FooterComponent = () => {
    return(
        <footer>
            <div className='footer-details'>
                <p className='white-text'>Contato do desenvolvedor</p>
                <div className="socials">
                    <a href="https://github.com/Thiago-Gonzalez" target="_blank" rel="noreferrer">
                        <img className="logo" src={github} alt="Github logo" />
                    </a>
                    <a href="https://www.linkedin.com/in/thiago-gonz%C3%A1lez/" target="_blank" rel="noreferrer">
                        <img className="logo" src={linkedin} alt="LinkedIn logo" />
                    </a>
                    <a href="mailto:contatothiagogonzalez@gmail.com">
                        <img className="logo" src={email} alt="Email logo" />
                    </a>
                    <a href="https://instagram.com/thiagogonzalez_" target="_blank" rel="noreferrer">
                        <img className="logo" src={instagram} alt="Instagram logo" />
                    </a>
                </div>
                <p className='cpy white-text'>© Thiago González</p>
            </div>
        </footer>
    );
}