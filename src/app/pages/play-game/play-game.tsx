import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { animated } from '@react-spring/web';
import './play-game.css'; // Импортируйте ваш CSS файл

interface GameData {
    table: Array<{
        card: string;
        beaten_by_card: string | null;
        participant_threw_by_id: number | null;
        participant_threw_to_id: number;
    }>;
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
    const [cardOnTable, setCardOnTable] = useState<string | null>(null);

    const fetchGameData = async () => {
        try {
            const response = await axios.get('http://77.222.37.34:8001/v1/games/3/get_current_table', {
                headers: {
                    'Authorization': '992f246b0e7b67b0c29d5e2925b3cad5db6e198e59d22bd9'
                },
            });
            setGameData(response.data);
            setError(null);
            // Обновите tableCards после получения данных
            const cardsOnTable = response.data.table.map(cardObj => cardObj.card);
            setTableCards(cardsOnTable);
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

    const handleCardClick = async (card: string) => {
        try {
            await axios.post(`http://77.222.37.34:8001/v1/games/3/place_card_on_table?card=${card}`, {}, {
                headers: {
                    'Authorization': '992f246b0e7b67b0c29d5e2925b3cad5db6e198e59d22bd9'
                },
            });
            setCardOnTable(card); // Сохранение карты на столе
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
        } catch (error) {
            setError('Ошибка укладки карты на стол');
            console.error('Error placing card on table:', error);
        }
    };

    const handleTableCardClick = (card: string) => {
        setSelectedCard(card); // Установить выбранную карту для побития
    };

    const handleBeatCard = async () => {
        if (!cardOnTable || !selectedCard) return; // Убедитесь, что карты установлены

        try {
            await axios.post(`http://77.222.37.34:8001/v1/games/3/beat_card?card_to_beat=${cardOnTable}&card_to_beat_by=${selectedCard}`, {}, {
                headers: {
                    'Authorization': '992f246b0e7b67b0c29d5e2925b3cad5db6e198e59d22bd9'
                },
            });
            fetchGameData(); // Обновить данные после выполнения действия
            setCardOnTable(null); // Сброс карты на столе после побития
            setSelectedCard(null); // Сброс выбранной карты после побития
        } catch (error) {
            setError('Ошибка при побитии карты');
            console.error('Error beating card:', error);
        }
    };

    const handleEndTurn = async () => {
        // Логика для завершения хода
    };

    return (
        <div className="play-game">
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
            <button onClick={handleBeatCard}>Бита</button>
            <button onClick={handleEndTurn}>Закончить ход</button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default PlayGame;
