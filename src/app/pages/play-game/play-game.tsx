// src/components/PlayPage.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './play-game.css'
interface Card {
    id: number;
    imagePath: string;
    isCardClicked: boolean;
    isCardBeaten: boolean;
    isCardDropped: boolean;
    targetX?: number;
    targetY?: number;
    stX?: number;
    stY?: number;
    bX?: number;
    bY?: number;
}

interface Deck {
    id: number;
    imagePath: string;
    stX?: number;
    stY?: number;
    rotDeg?: number;
}

const PlayPage: React.FC = () => {
    const [isReady, setIsReady] = useState<boolean>(false);
    const [isMyTurn, ] = useState<boolean>(false);
    const [decks, ] = useState<Deck[]>([
        { imagePath: 'assets/img/card-cover.png', id: 0, stX: -80, stY: -450 }
    ]);
    const [botCards] = useState<Deck[]>([
        { id: 1, imagePath: 'assets/img/card-cover.png', stX: 113, stY: -630, rotDeg: 0 },
        { id: 2, imagePath: 'assets/img/card-cover.png', stX: 93, stY: -630, rotDeg: 20 },
        { id: 3, imagePath: 'assets/img/card-cover.png', stX: 133, stY: -630, rotDeg: -20 },
    ]);
    const [cards, setCards] = useState<Card[]>([
        { id: 1, imagePath: 'assets/img/sp_14.svg', isCardClicked: false, isCardBeaten: false, isCardDropped: false, bX: 300, bY: -400, targetX: 50, targetY: -370, stX: 0, stY: 0 },
        { id: 2, imagePath: 'assets/img/sp_14.svg', isCardClicked: false, isCardBeaten: false, isCardDropped: false, bX: 300, bY: -400, targetX: 100, targetY: -370, stX: 45, stY: 0 },
        { id: 3, imagePath: 'assets/img/sp_14.svg', isCardClicked: false, isCardBeaten: false, isCardDropped: false, bX: 300, bY: -400, targetX: 150, targetY: -370, stX: 90, stY: 0 },
        { id: 4, imagePath: 'assets/img/sp_14.svg', isCardClicked: false, isCardBeaten: false, isCardDropped: false, bX: 300, bY: -400, targetX: 50, targetY: -300, stX: 135, stY: 0 },
        { id: 5, imagePath: 'assets/img/sp_14.svg', isCardClicked: false, isCardBeaten: false, isCardDropped: false, bX: 300, bY: -400, targetX: 100, targetY: -300, stX: 180, stY: 0 },
        { id: 6, imagePath: 'assets/img/sp_14.svg', isCardClicked: false, isCardBeaten: false, isCardDropped: false, bX: 300, bY: -400, targetX: 150, targetY: -300, stX: 225, stY: 0 }
    ]);
    const [,setDroppedCards] = useState<Card[]>([]);

    const navigate = useNavigate();

    const navigateTo = (path: string) => {
        navigate(path);
    };

    const onCardClick = (card: Card) => {
        if (!card.isCardBeaten) {
            card.isCardClicked = !card.isCardClicked;
            card.isCardDropped = !card.isCardDropped;
            addToDroppedCards(card);
            setCards([...cards]);
        }
    };

    const addToDroppedCards = (card: Card) => {
        setDroppedCards(prev => [...prev, card]);
    };

    const cardBeat = () => {
        setCards(cards.map(card => ({
            ...card,
            isCardBeaten: !card.isCardBeaten
        })));
    };

    const inPlayPageMainButtonHandler = () => {
        if (!isReady) {
            setIsReady(true);
        } else if (isReady) {
            if (!isMyTurn) {
                cardBeat();
            }
        }
    };

    useEffect(() => {
        // Here you can include any side effects related to Rive animations or other initializations.
    }, []);

    return (
        <div className="wrapper">
            <style>{`
        .wrapper {
          background: radial-gradient(67.00% 54.00% at 49% 56.00000000000001%, rgb(35, 98, 69), rgb(34, 94, 67) 32%, rgb(31, 85, 62) 57%, rgb(26, 69, 54) 79%, rgb(19, 46, 42) 99%, rgb(19, 45, 42) 100%);
        }
      `}</style>

            <div className="plays">
                <section className="play-header">
                    <div className="container">
                        <div className="play-header-wrapper">
                            <div className="play-header-block">
                                <a className="play-header-back block-obvodka" onClick={() => navigateTo('')}>
                                    <img src="../../../assets/img/Arrow1.svg" alt="Back" />
                                </a>
                                <div className="play-header-coin">
                                    <img src="../../../assets/img/coins.svg" alt="Coins" />
                                    <p>4K</p>
                                </div>
                            </div>
                            <div className="play-header-rejim block-obvodka">
                                <img src="../../../assets/img/card1.svg" alt="Card 1" />
                                <img src="../../../assets/img/card2.svg" alt="Card 2" />
                                <img src="../../../assets/img/card3.svg" alt="Card 3" />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="play-header-polosa"></div>
                <div className="play-header-polosa"></div>
            </div>

            <div className="main play-wrapper play-krug">
                <div style={{ zIndex: 500 }} className="main-wrapper-plays">
                    <div className="container">
                        <div className="wrapper-plays-header"></div>
                        <div className="wrapper-plays-game">
                            <div className="players-blocks">
                                <div className="player-block user-dumaet footer-ava-wp">
                                    <img src="../../../assets/img/Gameplay_Avatar.svg" alt="User Avatar" />
                                </div>
                                <div className="players-flex">
                                    <div className="player-block footer-ava-wp">
                                        <img src="assets/img/Gameplay_Avatar.svg" alt="Player Avatar" />
                                    </div>
                                    <div className="player-block footer-ava-wp">
                                        <img src="../../../assets/img/Gameplay_Avatar.svg" alt="Player Avatar" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        justifyContent: isReady ? 'end' : 'center',
                        overflow: isReady ? 'visible' : 'hidden',
                    }}
                    className="play-page-play-round"
                >
                    <h1 className="ready-text">{!isReady ? 'Нажмите готов' : ''}</h1>
                    <div></div>
                    <div className="play-page-client-cards">
                        <div className="card-container">
                            {decks.map((deck) => (
                                <img
                                    key={deck.id}
                                    style={{ top: deck.stY, left: deck.stX, width: '90px', height: '127px' }}
                                    className="card-deck"
                                    src={deck.imagePath}
                                    alt={`Deck ${deck.id}`}
                                />
                            ))}
                            {botCards.map((botCard) => (
                                <img
                                    key={botCard.id}
                                    className="bot-card"
                                    style={{
                                        left: isReady ? botCard.stX : decks[0].stX,
                                        top: isReady ? botCard.stY : decks[0].stY,
                                        transform: isReady ? `rotate(${botCard.rotDeg}deg)` : 'rotate(0deg)',
                                        width: '90px',
                                        height: '127px',
                                    }}
                                    src={botCard.imagePath}
                                    alt={`Bot Card ${botCard.id}`}
                                />
                            ))}
                            {cards.map((card) => (
                                <img
                                    key={card.id}
                                    className={`play-page-card ${card.isCardClicked ? 'play-page-card-clicked' : ''}`}
                                    style={{
                                        left: card.bX,
                                        top: card.bY,
                                        width: '90px',
                                        height: '127px',
                                    }}
                                    src={card.imagePath}
                                    alt={`Card ${card.id}`}
                                    onClick={() => onCardClick(card)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="play-page-controls">
                        <div className="play-page-controls-buttons">
                            <div
                                style={{ visibility: isReady ? 'hidden' : 'visible' }}
                                className="play-page-controls-button play-page-controls-start"
                                onClick={() => inPlayPageMainButtonHandler()}
                            >
                                <img src="../../../assets/img/Start_Button.svg" alt="Start" />
                            </div>
                            <div
                                style={{ visibility: isReady ? 'hidden' : 'visible' }}
                                className="play-page-controls-button play-page-controls-ready"
                                onClick={() => inPlayPageMainButtonHandler()}
                            >
                                <img src="../../../assets/img/Ready_Button.svg" alt="Ready" />
                            </div>
                        </div>
                        <div className="play-page-controls-background">
                            <div className="play-page-controls-background-curve"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayPage;
