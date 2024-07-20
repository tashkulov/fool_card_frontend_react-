import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    const fetchGameData = async () => {
        try {
            const response = await axios.get('http://77.222.37.34:8000/v1/games/2/get_current_table', {
                withCredentials: true
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

    const getCardImagePath = (card: string) => {
        const [suit] = card.split('_');
        try {
            return new URL(`../../../assets/cards/${suit}/${card}.svg`, import.meta.url).href;
        } catch (error) {
            console.error('Ошибка загрузки изображения:', error);
            return '/assets/cards/default.svg'; // Путь к изображению по умолчанию
        }
    };

    // Обработчик показа карт
    const handleShowCards = () => {
        setShowCards(true);
    };

    return (
        <div className="play-game">
            <h1>Игра в дурака</h1>
            <button onClick={handleShowCards}>Показать карты</button>
            {error && <p>{error}</p>}
            {showCards && gameData && (
                <div className="cards-container">
                    {gameData.hand.map((card) => (
                        <img
                            key={card}
                            src={getCardImagePath(card)}
                            alt={card}
                            className="card-image"
                        />
                    ))}
                </div>
            )}
            <style>{`
        .play-game {
          text-align: center;
          margin: 20px;
        }
        .cards-container {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        }
        .card-image {
          width: 50px;
          height: 70px;
          margin: 5px;
        }
      `}</style>
        </div>
    );
};

export default PlayGame;
