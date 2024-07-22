import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <div className="main-page-navbar">
            <div className="main-page-navbar-option menu">
                <Link to="/" className="main-page-navbar-link">
                    <div className="menu-icon"></div>
                    <h1>Меню</h1>
                </Link>
            </div>
            <div className="main-page-navbar-option quests">
                <Link to="/kvesty" className="main-page-navbar-link">
                    <div className="quests-icon"></div>
                    <h1>Квесты</h1>
                </Link>
            </div>
            <div className="main-page-navbar-option open">
                <Link to="#" className="main-page-navbar-link">
                    <div className="open-icon"></div>
                    <h1>Открытые</h1>
                </Link>
            </div>
            <div className="main-page-navbar-option new-game">
                <Link to="/new-game" className="main-page-navbar-link">
                    <div className="new-game-icon"></div>
                    <h1>Создать игру</h1>
                </Link>
            </div>
        </div>
    );
};

export default Footer;
