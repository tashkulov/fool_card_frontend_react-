import cls from "./Referrals.module.scss"
import SkeletonPage from "../../../components/SkeletonPage/ui/SkeletPage.tsx";

const Referrals = () => {

    return (
        <SkeletonPage textHeader={"Рефералы"}>
            <div className={cls.main}>

            </div>
        </SkeletonPage>
    )
}

export default Referrals;