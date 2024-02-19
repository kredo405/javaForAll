import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spin, message } from 'antd';
import Main_card from '../../components/Main-card/Main_card';
import Nav from "../../components/Nav/Nav";
import fon from '../../img/maon.png';
import { MainServices } from "../../services/mainServices";
import './main.scss';

const showError = (errorMessage) => {
  message.error(errorMessage);
};

const Main = () => {
  const { t, i18n } = useTranslation();
  const state = useSelector(state => state);
  const [mainContent, setMainContent] = useState({
    main: {
      text: '',
      tittle: '',
    },
    mainContent: {
      image: '',
      text: '',
      tittle: '',
    },
    secondaryContent: []
  });
  const [url, setUrl] = useState('/api/general/main/mainPageContent')
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [language, setLanguage] = useState('')

  const simulatorContent = () => {
    setUrl('/api/general/main/trainerPageContent')
  }

  const handbookContent = () => {
    setUrl('/api/general/main/directoryPageContent')
  }

  useEffect(() => {
    let content = false;
    let cards = mainContent.secondaryContent.map(el => {
      content = !content
      return (
        <Main_card
          key={el.tittle}
          content={content}
          title={el.tittle}
          text={el.text}
          img={el.image}
        />
      )
    })
    setCards(cards)
  }, [mainContent]);


  useEffect(() => {
    setLanguage(i18n.language);
    setIsLoading(false);

    const getContent = async () => {
      try {
        const content = await MainServices.mainContent(url, i18n.language);
        console.log(content.data);
        setMainContent(content.data);
        setIsLoading(true);
      }
      catch (error) {
        console.error(error);
        showError(error.message);
      }
    }

    getContent();
  }, [state.lang, url]);

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
    <div className="container dark:bg-slate-800">
      {isLoading ?
        <>
          < Nav />
          <div className="flex items-center flex-col dark:bg-slate-800 lg:flex-row justify-center lg:justify-between mt-20">
            <div className="p-2 flex flex-col justify-center items-center lg:items-start w-full lg:w-8/12">

              <h1 className="text-4xl mx-auto lg:text-left sm:text-center md:text-center w-full font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="text-indigo-600 ">{mainContent.main.tittle}</span>
              </h1>
              <div className="flex dark:bg-slate-800 justify-start items-start flex-col">
                <p className="mt-3 w-full text-base dark:text-slate-300 text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  {mainContent.main.text}
                </p>
              </div>
              <div className="mt-5 w-full dark:bg-slate-800 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <button
                  onClick={simulatorContent}
                  className="w-full h-full sm-w-40 lg:w-auto mb-2 lg:mb-0 sm:mr-3 lg:mr-7 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg lg:px-10 md:px-5"
                >
                  {t('description.part5')}
                </button>
                <a
                  onClick={handbookContent}
                  className="w-full h-full md-w-40 lg:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-5 lg:px-10"
                >
                  {t('description.part6')}
                </a>
              </div>
            </div>
            <div className="w-full flex justify-center lg:w-4/12">
              <img src={fon} alt="Главная картинка" />
            </div>
          </div>

          <div className="dark:bg-slate-800 mb-5">
            <div className='flex dark:bg-slate-800 items-center lg:justify-center w-full'>
              <div className="flex flex-col w-full dark:bg-slate-800 mt-16 items-center bg-slate-50 p-3 border-2 rounded-2xl border-slate-100 dark:border-slate-700 border-solid">
                <div className='ml-4'>
                  <h2 className='mb-7 dark:text-slate-200 text-lg text-center lg:text-3xl'>{mainContent.mainContent.tittle}</h2>
                  <p className='text-xs dark:text-slate-200 text-center lg:text-xl'>{mainContent.mainContent.text}</p>
                </div>
                <img className='lg:w-6/12 w-full  mt-10' src={mainContent.mainContent.image} alt="card" />
              </div>
            </div>
            {cards}
          </div>
        </>
        :
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      }
    </div>
  );
}

export default Main;