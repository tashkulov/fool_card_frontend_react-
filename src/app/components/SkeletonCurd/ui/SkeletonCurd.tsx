import { FC, ReactNode } from 'react';
import cls from "./SkeletonCurd.module.scss";

interface SkeletonCurdProps {
    children?: ReactNode;
}

const SkeletonCurd: FC<SkeletonCurdProps> = ({ children }) => {
    return (
        <div className={cls.main}>
            {children}
        </div>
    );
};

export default SkeletonCurd;
