import React from 'react';
import {Link} from 'react-router-dom';
import './home-page.css';
import Footer from "../../components/Footer/Footer.tsx";

interface User {
    photo_url: string;
    first_name: string;
}

interface HomePageProps {
    user?: User | null;
}

const HomePage: React.FC<HomePageProps> = ({ user }) => {



    return (
        <div className="main-page-container">
            <div className="main-page-header">
                <div className="main-page-header-content">
                    <div className="main-page-header-content-avatar-border">
                        <div className="main-page-header-content-avatar">
                            {user?.photo_url}
                        </div>
                    </div>

                    <div className="main-page-header-content-data">
                        <div className="main-page-header-content-data-username">
                            {user?.first_name}
                        </div>
                        <div className="main-page-header-content-data-credits">
                            <div className="main-page-header-content-data-credits-1">
                                <div className="main-page-header-content-data-credits-1-icon"></div>
                                <div className="main-page-header-content-data-credits-1-value">
                                    100K
                                </div>
                            </div>
                            <div className="main-page-header-content-data-credits-1">
                                <div className="main-page-header-content-data-credits-2-icon"></div>
                                <div className="main-page-header-content-data-credits-1-value">
                                    152.5K
                                </div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main-page-menu">
                <div className="main-page-menu-buttons">
                    <Link to={'/inGame'}>
                        <div className="main-page-menu-button">
                            Играть
                        </div>
                    </Link>
                    <Link to={'/leaderboard'}>
                        <div className="main-page-menu-button">
                            Лидерборд
                        </div>
                    </Link>
                    <div className="main-page-menu-button">Рефералы</div>
                    <div className="main-page-menu-button">Настройки</div>
                </div>


            </div>
            <div className='main-page-hands-cards'>
                <div className='hands'>

                </div>
            </div>
            <Footer/>


        </div>
    );
};

export default HomePage;
