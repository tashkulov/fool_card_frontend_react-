import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSpring, animated } from '@react-spring/web';
import './play-game.css'; // Импортируйте ваш CSS файл

interface GameData {
    table: number;
    free_cards_amount: number;
    trump: string;
    trump_card: string;
    hand: string[];
    participants: object;
}

const PlayGame: React.FC = () => {
    const [gameData, setGameData] = useState<GameData | null>(null);
    const [showCards, setShowCards] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [cardAnimation, setCardAnimation] = useState<string[]>([]);
    const [movingCard, setMovingCard] = useState<string | null>(null);
    const [movingCardStyle, setMovingCardStyle] = useState<any>({});
    const [tableCards, setTableCards] = useState<string[]>([]);

    const fetchGameData = async () => {
        try {
            const response = await axios.get('http://77.222.37.34:8001/v1/games/2/get_current_table', {
                headers: {
                    'Authorization': '8c3f82f70111994cd473b5941e4d75ccfa2977e9bdffcc4b'
                },
            });
            setGameData(response.data);
            setError(null);
        } catch (error) {
            setError('Ошибка получения данных о текущей игре');
            console.error('Error fetching game data:', error);
        }
    };

    useEffect(() => {
        fetchGameData();
    }, []);

    useEffect(() => {
        if (showCards && gameData) {
            setCardAnimation(gameData.hand);
        }
    }, [showCards, gameData]);

    useEffect(() => {
        if (movingCard) {
            setMovingCardStyle({
                transform: 'translate(-50%, -50%) scale(1.2)',
                zIndex: 10,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transition: 'transform 0.5s ease',
            });
        } else {
            setMovingCardStyle({});
        }
    }, [movingCard]);

    const getCardImagePath = (card: string) => {
        const [suit] = card.split('_');
        return new URL(`../../../assets/cards/${suit}/${card}.svg`, import.meta.url).href;
    };

    const handleShowCards = () => {
        setShowCards(true);
    };

    const handleCardClick = (card: string) => {
        setSelectedCard(card);
        setMovingCard(card);
        setTimeout(() => {
            setMovingCard(null); // Сброс состояния после завершения анимации
            setTableCards((prevTableCards) => [...prevTableCards, card]); // Добавляем карту на стол
            setGameData((prevGameData) => {
                if (!prevGameData) return prevGameData;
                return {
                    ...prevGameData,
                    hand: prevGameData.hand.filter((c) => c !== card), // Убираем карту из руки
                };
            });
        }, 500); // Длительность анимации в CSS
    };

    const handleTableCardClick = (card: string) => {
        setSelectedCard(card);
        setMovingCard(card);
        setTimeout(() => {
            setMovingCard(null); // Сброс состояния после завершения анимации
            setGameData((prevGameData) => {
                if (!prevGameData) return prevGameData;
                return {
                    ...prevGameData,
                    hand: [...prevGameData.hand, card], // Добавляем карту обратно в руку
                };
            });
            setTableCards((prevTableCards) => prevTableCards.filter((c) => c !== card)); // Убираем карту со стола
        }, 500); // Длительность анимации в CSS
    };

    const handleBita = async () => {
        try {
            await axios.post('http://77.222.37.34:8001/v1/games/2/bita', {}, {
                headers: {
                    'Authorization': '8c3f82f70111994cd473b5941e4d75ccfa2977e9bdffcc4b'
                },
            });
            fetchGameData(); // Обновить данные после выполнения действия
        } catch (error) {
            setError('Ошибка выполнения действия "бита"');
            console.error('Error sending bita request:', error);
        }
    };

    const handleBots = async () => {
        try {
            await axios.post('http://77.222.37.34:8001/v1/games/2/bots', {}, {
                headers: {
                    'Authorization': '8c3f82f70111994cd473b5941e4d75ccfa2977e9bdffcc4b'
                },
            });
            fetchGameData(); // Обновить данные после выполнения действия
        } catch (error) {
            setError('Ошибка выполнения действия с ботами');
            console.error('Error sending bots request:', error);
        }
    };

    return (
        <div className="wrapper">
            <h1>Игра в дурака</h1>

            <div className="table">
                {movingCard && (
                    <animated.img
                        src={getCardImagePath(movingCard)}
                        alt={movingCard}
                        className="card-image"
                        style={movingCardStyle}
                    />
                )}
                {/* Отображение карт на столе */}
                {tableCards.map((card) => (
                    <img
                        key={card}
                        src={getCardImagePath(card)}
                        alt={card}
                        className="card-image entered table-card"
                        onClick={() => handleTableCardClick(card)} // Обработчик клика по карте на столе
                    />
                ))}
            </div>

            <div className="my-cards">
                {showCards && gameData && (
                    <div className="cards-container">
                        {gameData.hand.map((card, index) => (
                            <img
                                key={card}
                                src={getCardImagePath(card)}
                                alt={card}
                                className={`card-image ${cardAnimation.includes(card) ? 'entered' : ''}`}
                                style={{ transitionDelay: `${index * 0.2}s` }} // Задержка для каждого элемента
                                onClick={() => handleCardClick(card)}
                            />
                        ))}
                    </div>
                )}
            </div>
            <button onClick={handleShowCards}>Показать карты</button>
            <button onClick={handleBita}>Бита</button>
            <button onClick={handleBots}>Управление ботами</button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default PlayGame;
