import { useEffect } from "react";
import React from 'react';
import { AppRouter } from "./Router";
import cls from "./main.module.scss";

export const user = {
    photo_url: 'URL_TO_PHOTO',
    first_name: 'Имя пользователя',
};

const App: React.FC = () => {

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.ready(() => {
                window.Telegram.WebApp.setViewSize(393, 852);
            });

            window.Telegram.WebApp.onEvent('viewportChanged', () => {
                window.Telegram.WebApp.setViewSize(393, 852);
            });
        }
    }, []);


    return (

        <div className={cls.main}>
            <AppRouter />

        </div>

    );
};

export default App;
