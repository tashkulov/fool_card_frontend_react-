import './Kvesty.css';
import kvest1 from '../img/kvest1.svg';
import kvest2 from '../img/kvest2.svg';
import kvest3 from '../img/kvesty3.svg';
import OneKvest from "../../components/OneKvest/OneKvest";
import SkeletonPage from "../../components/SkeletonPage/ui/SkeletPage.tsx";
<<<<<<< HEAD

const Kvesty = () => {

    return (
    <SkeletonPage textHeader={"Квесты"}>
=======
import {useTranslation} from "react-i18next";

const Kvesty = () => {
    const {t} = useTranslation()

    return (
    <SkeletonPage textHeader={t("Квесты")}>
>>>>>>> 21d851925464cc27aef99cc603aa18814cbf6369
        <div className='container-kwest'>
            <div className='kvesty-list'>
                <OneKvest image={kvest1} headText="Выиграть 5000 монет" description="XP 30.5" buttonText='Начать'/>
                <OneKvest image={kvest2} headText="Выиграть 2342 монет" description="XP 30.5" buttonText='Начать'/>
                <OneKvest image={kvest3} headText="Выиграть 5000 монет" description="XP 30.5"
                          buttonText='Получить'/>
                <OneKvest image={kvest3} headText="Выиграть 4534 монет" description="XP 30.5"
                          buttonText='Получить'/>
                <OneKvest image={kvest3} headText="Выиграть 5000 монет" description="XP 30.5"
                          buttonText='Получить'/>
                <OneKvest image={kvest3} headText="Выиграть 523 монет" description="XP 30.5" buttonText='Начать'/>
            </div>
        </div>
<<<<<<< HEAD

=======
>>>>>>> 21d851925464cc27aef99cc603aa18814cbf6369
    </SkeletonPage>
);
};

export default Kvesty;
