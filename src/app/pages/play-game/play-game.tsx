import './play-game.css';
import card1 from '../img/card1.svg';
import card2 from '../img/card2.svg';
import card3 from '../img/card3.svg';
import GamePlay from "../img/Gameplay_Avatar.svg";
import coins from "../img/coins.svg";
import arrow from "../img/Arrow1.svg";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import back_card from '../../../assets/cards/back/back_3.svg';

const PlayGame = () => {
    const [gameData, setGameData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null); // Состояние для выбранной карты

    const cardAnimationContainerRef = useRef(null);

    const fetchGameData = async () => {
        try {
            const response = await axios.get('http://77.222.37.34:8001/v1/games/6/get_current_table', {
                headers: {
                    'Authorization': '461cc7f4f326092bd3967341eda52b594d0cee1932a3759e'
                },
            });
            console.log(response.data)
            setGameData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching game data:', error);
            setLoading(false);
            setError('Failed to fetch game data');
        }
    };

    useEffect(() => {
        fetchGameData();
    }, []);

    useEffect(() => {
        if (selectedCard) {
            // Сброс состояния анимации после завершения анимации
            const timer = setTimeout(() => setSelectedCard(null), 600); // Длительность анимации
            return () => clearTimeout(timer);
        }
    }, [selectedCard]);

    const getCardImagePath = (card) => {
        const [suit] = card.split('_');
        const path = new URL(`../../../assets/cards/${suit}/${card}.svg`, import.meta.url).href;
        return path;
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const angle = 20; // Общий угол поворота для карт
    const offset = 30; // Смещение в пикселях между картами
    const middle = Math.floor(gameData.hand.length / 2); // Центральная карта

    return (
        <>
            <div className="wrapper">
                <div className="plays">
                    <section className="play-header">
                        <div className="container">
                            <div className="play-header-wrapper">
                                <div className="play-header-block">
                                    <a className="play-header-back block-obvodka">
                                        <img src={arrow} alt="Back" />
                                    </a>
                                    <div className="play-header-coin">
                                        <img src={coins} alt="Coins" />
                                        <p>4K</p>
                                    </div>
                                </div>
                                <div className="play-header-rejim block-obvodka">
                                    <img src={card1} alt="Card 1" />
                                    <img src={card2} alt="Card 2" />
                                    <img src={card3} alt="Card 3" />
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="play-header-polosa"></div>
                    <div className="play-header-polosa"></div>
                </div>
                <div className="main play-wrapper play-krug">
                    <div className="main-wrapper-plays">
                        <div className="container">
                            <div className="wrapper-plays-header"></div>
                            <div className="wrapper-plays-game">
                                <div className="players-blocks">
                                    <div className="player-block user-dumaet footer-ava-wp">
                                        <img src={GamePlay} alt="Gameplay Avatar"/>
                                    </div>

                                    <div className="players-flex">
                                        <div className="player-block footer-ava-wp">
                                            <img src={GamePlay} alt="Gameplay Avatar"/>
                                        </div>
                                        <div className="player-block footer-ava-wp">
                                            <img src={GamePlay} alt="Gameplay Avatar"/>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className="deck">
                                <div className="card-container">
                                    <img
                                        key={'trump_card'}
                                        src={getCardImagePath(gameData.trump_card)}
                                        alt={"card"}
                                        width={64}
                                        height={90}
                                        className="trump-card"
                                    />
                                    <img
                                        key={'back_card'}
                                        src={back_card}
                                        alt={"card"}
                                        width={64}
                                        height={90}
                                        className="back-card"
                                    />
                                </div>
                            </div>

                            <div className="bita">
                                <div className="card-container">
                                    <img
                                        key={'bita1'}
                                        src={back_card}
                                        alt={"back_card"}
                                        width={64}
                                        height={90}
                                        className="back_card1"
                                    />
                                    <img
                                        key={'bita2'}
                                        src={back_card}
                                        alt={"back_card"}
                                        width={64}
                                        height={90}
                                        className="back_card2"
                                    />
                                    <img
                                        key={'bita3'}
                                        src={back_card}
                                        alt={"back_card"}
                                        width={64}
                                        height={90}
                                        className="back_card3"
                                    />
                                </div>
                            </div>

                            {/* Контейнер для анимации карт */}
                            <div ref={cardAnimationContainerRef} className="card-animation-container">
                                {selectedCard && (
                                    <img
                                        src={getCardImagePath(selectedCard)}
                                        alt={selectedCard}
                                        className={`card-animation ${selectedCard ? 'animate' : ''}`}
                                        width={64}
                                        height={90}
                                    />
                                )}
                            </div>

                            {/* Карты игрока */}
                            <div className="hand">
                                {gameData.hand.map((card, index) => {
                                    const rotation = (index - middle) * angle; // Вычисляем угол поворота
                                    const position = (index - middle) * offset; // Вычисляем смещение

                                    return (
                                        <img
                                            key={card}
                                            src={getCardImagePath(card)}
                                            alt={card}
                                            style={{
                                                left: `calc(50% + ${position}px)`, // Устанавливаем позицию карты
                                                transform: `rotate(${rotation}deg)`, // Устанавливаем поворот карты
                                                '--delay': `${index * 0.2}s`, // Устанавливаем задержку анимации
                                            }}
                                            onClick={() => handleCardClick(card)} // Запуск анимации при клике
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="play-footer">
                    <div className="play-footer-ava">
                        <div className="footer-ava-roga">
                            <div className="footer-ava-wp">
                                <img src={GamePlay} alt="Gameplay Avatar"/>
                            </div>
                        </div>
                    </div>
                    <div className="play-footer-wrap">
                        <div className="play-footer-btn block-obvodka" id="canvas">
                            <p>Бито</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlayGame;
