import './Kvesty.css';
import kvest1 from '../img/kvest1.svg';
import kvest2 from '../img/kvest2.svg';
import kvest3 from '../img/kvesty3.svg';
import OneKvest from "../../components/OneKvest/OneKvest";
import Header from "../Widgets/Header/ui/Header";
import Footer from "../../components/Footer/Footer";

const Kvesty = () => {
    return (
        <div className='container-kwest'>
            <Header text='Квесты' />
            <div className='kvesty-list'>
                <OneKvest image={kvest1} headText="Выиграть 5000 монет" description="XP 30.5" buttonText='Начать' />
                <OneKvest image={kvest2} headText="Выиграть 2342 монет" description="XP 30.5" buttonText='Начать' />
                <OneKvest image={kvest3} headText="Выиграть 5000 монет" description="XP 30.5" buttonText='Получить' />
                <OneKvest image={kvest3} headText="Выиграть 4534 монет" description="XP 30.5" buttonText='Получить' />
                <OneKvest image={kvest3} headText="Выиграть 5000 монет" description="XP 30.5" buttonText='Получить' />
                <OneKvest image={kvest3} headText="Выиграть 523 монет" description="XP 30.5" buttonText='Начать' />
            </div>
            <Footer />
        </div>
    );
};

export default Kvesty;
