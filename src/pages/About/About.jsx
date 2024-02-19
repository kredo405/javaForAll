import Nav from "../../components/Nav/Nav";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { Spin, message } from 'antd';
import { MainServices } from "../../services/mainServices";

const showError = (errorMessage) => {
    message.error(errorMessage);
};

const About = () => {
    const [content, setContent] = useState({
        main: {
            image: "",
            tittle: "",
            text: ""
        },
        secondaryContent: [],
        titleSecondContent: "",
        mainContent: {
            image: "",
            tittle: "",
            otherList: []
        }
    });
    const [secondaryContent, setSecondaryContent] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const state = useSelector(state => state);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        setIsLoading(false);

        const getPageContent = async () => {
            try {
                const pageContent = await MainServices.aboutProjectPageContent(i18n.language);
                setContent(pageContent.data);
                const secondaryContentItems = pageContent.data.secondaryContent.map(el => {
                    return (
                        <div className="p-5 w-full dark:bg-slate-700 bg-slate-50 border-2 border-emerald-50 dark:border-slate-700 border-solid rounded-xl my-2 lg:m-2 shadow shadow-gray-200">
                            <div className="flex justify-center">
                                <img src={el.image} alt="choices" />
                            </div>
                            <h3 className="p-2 text-center dark:text-slate-200 font-semibold">{el.tittle}</h3>
                            <p className="text-center dark:text-slate-200 text-sm text-slate-500">{el.text}</p>
                        </div>
                    )
                });
                setSecondaryContent(secondaryContentItems);
                setIsLoading(true);
            }
            catch (error) {
                console.error(error);
                showError(error.message);
            }
        }

        getPageContent();

    }, [state.lang])

    useEffect(() => {
        if (state.value) {
            const body = document.querySelector('body');
            body.style.backgroundColor = 'rgb(30 41 59)';
            body.style.overflowY = 'scroll';
        } else {
            const body = document.querySelector('body');
            body.style.backgroundColor = 'rgb(255 255 255)';
            body.style.overflowY = 'scroll';
        }
    }, [state.value, isLoading]);

    return (
        <>
            {isLoading ?
                <div className="container dark:bg-slate-800">
                    <Nav />

                    <div className="flex flex-col dark:bg-slate-700 lg:flex-row justify-center items-center lg:justify-between mt-5 bg-slate-50 shadow shadow-gray-200">
                        <div className="p-5 flex flex-col justify-center items-center lg:items-start">
                            <h1 className="text-slate-700 dark:text-slate-200 font-semibold text-2xl lg:text-4xl">{content.main.tittle}</h1>
                            <p className="text-xl dark:text-slate-300 font-serif text-slate-500">
                                {content.main.text}
                            </p>
                        </div>
                        <div>
                            <img src={content.main.image} alt="Главная картинка" />
                        </div>
                    </div>
                    <div className="my-5">
                        <div className="flex justify-center">
                            <h2 className="text-slate-700 dark:text-slate-200 font-semibold text-xl lg:text-4xl">{content.mainContent.tittle}</h2>
                        </div>
                        <div className="lg:flex p-5 dark:bg-slate-700 justify-between bg-slate-50 shadow shadow-gray-200">
                            <div className="lg:w-full flex justify-center">
                                <img src={content.mainContent.image} alt="Технологии" />
                            </div>
                            <div>
                                <div className="w-full flex flex-wrap mb-5 mt-5 lg:mt-0 justify-center lg:justify-start">
                                    <span className="text-center align-middle w-auto p-3 sm:p-5 lg:p-7 text-slate-50 text-xs sm:text-xl lg:text-3xl border-2 m-2 bg-teal-400 border-teal-400 border-solid rounded-3xl">{content.mainContent.otherList[0]}</span>
                                    <span className="text-center align-middle w-auto p-3 sm:p-5 lg:p-7 text-slate-50 text-xs sm:text-xl lg:text-3xl border-2 m-2 bg-orange-400 border-orange-400 border-solid rounded-3xl">{content.mainContent.otherList[1]}</span>
                                    <span className="text-center align-middle w-auto p-3 sm:p-5 lg:p-7 text-slate-50 text-xs sm:text-xl lg:text-3xl border-2 m-2 bg-red-500 border-red-500 border-solid rounded-3xl">{content.mainContent.otherList[2]}</span>
                                    <span className="text-center align-middle w-auto p-3 sm:p-5 lg:p-7 text-slate-50 text-xs sm:text-xl lg:text-3xl border-2 m-2 bg-green-400 border-green-400 border-solid rounded-3xl">{content.mainContent.otherList[3]}</span>
                                    <span className="text-center align-middle w-auto p-3 sm:p-5 lg:p-7 text-slate-50 text-xs sm:text-xl lg:text-3xl border-2 m-2 bg-cyan-400 border-green-400 border-solid rounded-3xl">{content.mainContent.otherList[4]}</span>
                                </div>
                                <span className="font-medium dark:text-slate-300 align-middle text-2xl font-mono">{t('description.part12')}</span>
                            </div>
                        </div>
                    </div>
                    <div className="my-5">
                        <div className="flex justify-center">
                            <h2 className="text-slate-700 text-center dark:text-slate-200 font-semibold text-xl lg:text-4xl">{content.titleSecondContent}</h2>
                        </div>
                        <div className="flex flex-col lg:flex-row">
                            {secondaryContent}
                        </div>
                    </div>
                </div>
                :
                <div className="flex justify-center items-center h-screen">
                    <Spin size="large" />
                </div>

            }
        </>

    )
}

export default About;