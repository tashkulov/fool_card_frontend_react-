import cls from "./Referrals.module.scss"
import Footer from "../../../components/Footer/Footer.tsx";
import Header from "../../Widgets/Header/ui/Header.tsx";
import imgLeftSvgIcons from "../../img/Frame_Left.svg"
import imgRightSvgIcons from "../../img/Frame_Right.svg"

const Referrals = () => {

    return (
        <div className={cls.main}>
            <Header text={"Лидерборд"}/>
            <img className={cls.leftSolid} src={imgLeftSvgIcons} alt=""/>
            <img className={cls.rightSolid} src={imgRightSvgIcons} alt=""/>
            <Footer/>
        </div>
    )
}

export default Referrals;