import './play-game.css';
import icon from '../img/kvest2.svg';
import card1 from '../../../assets/img/card1.svg';
import card2 from '../../../assets/img/card2.svg';
import card3 from '../../../assets/img/card3.svg';
import Ramki from './images/Ramki.svg';
// import izum from './images/Izumrud.svg';
// import paint1 from './images/paint1.svg';
// import paint2 from './images/paint2.svg';
import leftarea from './images/Left Safe Area.svg';
import rightarea from './images/Right Safe Area.svg';

const PlayGame = () => {
    return (
        <div className="container">
            <div className="header">
                <div className="stafka">
                    <img src={icon} alt="icon" width={24} height={24} />
                    <h2>4K</h2>
                </div>
                <div className="game-mode">
                    <img src={card1} alt="card1" width={17} height={22} />
                    <img src={card2} alt="card2" width={17} height={22} />
                    <img src={card3} alt="card3" width={17} height={22} />
                </div>
            </div>

            <div className="illustration">
                <div className="left-side">
                    <img src={leftarea} alt="leftarea" width={20} height={715}/>

                </div>
                {/*<img src={paint1} width={30} height={53} alt="izum"/>*/}
                {/*<img src={izum} width={75} height={75} alt="izum"/>*/}
                {/*<img src={paint2} width={52} height={27} alt="izum"/>*/}
                <img src={Ramki} width={355} height={200} alt="ramki" className={'ramki'}/>
                <div className="right-side">
                    <img src={rightarea} alt="rightarea" width={20} height={715}/>
                </div>
            </div>
        </div>
    );
};

export default PlayGame;
