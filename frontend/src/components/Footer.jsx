import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLastfm } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div>
                <a href="https://github.com/pecor" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} size="2x"/>
                </a>
                <a href="https://www.last.fm/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLastfm} size="2x"/>
                </a>
            </div>
            <br/>
            <p>©<span>{currentYear}</span> Filip Pecyna </p>
        </footer>
    );
}

export default Footer;