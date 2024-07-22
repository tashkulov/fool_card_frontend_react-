import cls from "./LeaderBoard.module.scss"
import Header from "../../Widgets/Header/ui/Header.tsx";
import SkeletonCurd from "../../../components/SkeletonCurd/ui/SkeletonCurd.tsx";

const LeaderBoard = () => {

    return (
        <div className={cls.main}>
            <Header text={"Лидерборд"}/>
            <SkeletonCurd></SkeletonCurd>
        </div>
    );
};

export default LeaderBoard;