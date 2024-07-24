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

// Define a type for the game data structure
interface GameData {
    trump_card: string;
    hand: string[];
}

const PlayGame = () => {
    const [gameData, setGameData] = useState<GameData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error] = useState<string | null>(null);
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const cardAnimationContainerRef = useRef<HTMLDivElement | null>(null);
    const handRef = useRef<HTMLDivElement | null>(null);

    const fetchGameData = async () => {
        try {
            const response = await axios.get<GameData>('http://77.222.37.34:8001/v1/games/6/get_current_table', {
                headers: {
                    'Authorization': '461cc7f4f326092bd3967341eda52b594d0cee1932a3759e'
                },
            });
            setGameData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching game data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGameData();
    }, []);

    useEffect(() => {
        if (selectedCard) {
            setIsAnimating(true);
            const timer = setTimeout(() => {
                setIsAnimating(false);
                setSelectedCard(null);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [selectedCard]);

    const getCardImagePath = (card: string) => {
        const [suit] = card.split('_');
        const path = new URL(`../../../assets/cards/${suit}/${card}.svg`, import.meta.url).href;
        return path;
    };

    const handleCardClick = (card: string, e: React.MouseEvent<HTMLImageElement>) => {
        if (!cardAnimationContainerRef.current || !handRef.current) return;

        const cardRect = e.currentTarget.getBoundingClientRect();

        setSelectedCard(card);

        const bitaContainerRect = cardAnimationContainerRef.current.getBoundingClientRect();

        const translateX = bitaContainerRect.left - cardRect.left;
        const translateY = bitaContainerRect.top - cardRect.top;

        e.currentTarget.style.transform = `translate(${translateX}px, ${translateY}px) scale(1.5)`;

        setTimeout(() => {
            e.currentTarget.style.transform = '';
        }, 500);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const angle = 20;
    const offset = 30;
    const middle = gameData ? Math.floor(gameData.hand.length / 2) : 0;

    return (
        <>
            <div className="wrapper">
                <div className="plays">
                    <section className="play-header">
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
                    </section>
                    <div className="play-header-polosa"></div>
                    <div className="play-header-polosa"></div>
                </div>
                <div className="main play-wrapper play-krug">
                    <div className="main-wrapper-plays">
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
                                {gameData && (
                                    <img
                                        key={'trump_card'}
                                        src={getCardImagePath(gameData.trump_card)}
                                        alt={"card"}
                                        width={64}
                                        height={90}
                                        className="trump-card"
                                    />
                                )}
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

                        <div className="bita-container" ref={cardAnimationContainerRef}>
                            {selectedCard && (
                                <img
                                    src={getCardImagePath(selectedCard)}
                                    alt={selectedCard}
                                    className={`bita-card ${isAnimating ? 'animate' : ''}`}
                                    onAnimationEnd={() => {
                                        setIsAnimating(false);
                                        setSelectedCard(null);
                                    }}
                                />
                            )}
                        </div>

                        <div className="hand" ref={handRef}>
                            {gameData && gameData.hand.map((card: string, index: number) => {
                                const rotation = (index - middle) * angle;
                                const position = (index - middle) * offset;

                                return (
                                    <img
                                        key={card}
                                        src={getCardImagePath(card)}
                                        alt={card}
                                        style={{
                                            left: `calc(50% + ${position}px)`,
                                            transform: `rotate(${rotation}deg)`,
                                            transition: 'transform 0.2s ease',
                                            zIndex: 10,
                                        }}
                                        onClick={(e) => handleCardClick(card, e)}
                                    />
                                );
                            })}
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
                        <div className="play-footer-block">
                            <div className="play-footer-play">Играть</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlayGame;
