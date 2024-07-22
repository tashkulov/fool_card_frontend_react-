import cls from "./LeaderBoard.module.scss";
import Header from "../../Widgets/Header/ui/Header.tsx";
import { useEffect, useState } from "react";
import { ITypeLeaderBord } from "../typeLeaderBord/typeLeaderBord.ts";
import { getLeaderBoard } from "../getLeaderBoard/getLeaderBoard.ts";
import SkeletonCurd from "../../../components/SkeletonCurd/ui/SkeletonCurd.tsx";
import imgLeftSvgIcons from "../../img/Frame_Left.svg"
import imgRightSvgIcons from "../../img/Frame_Right.svg"

const LeaderBoard = () => {
    const [leaderBoardList, setLeaderBoardList] = useState<ITypeLeaderBord[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getLeaderBoard();
            if (response && response.data) {
                setLeaderBoardList(response.data);
            } else {
                console.log("что не так с данными из getLeaderBoard", response);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={cls.main}>
            <Header text={"Лидерборд"}/>
            <img className={cls.leftSolid} src={imgLeftSvgIcons} alt=""/>
            <img className={cls.rightSolid} src={imgRightSvgIcons} alt=""/>
            <div className={cls.listLeaderBoard}>
                {/* отображение списка лидерборда */}
                {leaderBoardList.map((item, id) => (
                    <SkeletonCurd key={id}>
                        <div>{item.username} - {item.experience}</div>
                    </SkeletonCurd>
                ))}
            </div>
        </div>
    );
}

export default LeaderBoard;