import { useState } from 'react';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spin, message } from 'antd';
import Nav from '../../components/Nav/Nav';
import DropdownMain from '../../components/Dropdown/Dropdown';
import Review from '../../components/Review/Review';
import Review_modal from '../../components/Review_modal/Review_modal';
import RefreshToken from '../../utils/refreshToken/refreshToken';
import { MainServices } from '../../services/mainServices';

const showError = (errorMessage) => {
  message.error(errorMessage);
};

const Reviews = () => {
  const [dataReviews, setDataReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [headerContent, setHeaderContent] = useState({
    content: {
      image: "",
      tittle: "",
      text: ""
    },
    countReviews: ""
  });
  const expiresIn = sessionStorage.getItem('expires_in');
  const state = useSelector(state => state);
  const isAuth = sessionStorage.getItem('isAuth');
  const dispatch = useDispatch();

  const getRewiewList = async () => {
    setIsLoading(false);
    try {
      const list = await MainServices.reviewList(Boolean(isAuth), state.lang, state.token);
      console.log(list.data);

      let data = list.data.reviews.map(el => {
        return (
          <Review
            getRewiewList={getRewiewList}
            key={el.id}
            id={el.id}
            title={el.tittle}
            text={el.text}
            date={el.date}
            reviewRating={el.rating}
            username={el.user.username}
            avatar={el.user.avatar}
            owner={el.owner} />
        )
      });
      setDataReviews(data);
      setIsLoading(true);
    }
    catch (error) {
      setIsLoading(true);
      console.error(error);
      if (error.response.status !== 401) {
        showError(error.message);
      }
    }
  }

  useEffect(() => {
    setIsLoading(false);
    const getPageContent = async () => {
      try {
        const pageContent = await MainServices.reviewPageContent(state.lang);
        console.log(pageContent.data);
        setHeaderContent(pageContent.data)
      }
      catch (error) {
        console.error(error);
        showError(error.message);
      }
    }

    getPageContent();

    if (+Date.now() >= +expiresIn && isAuth) {
      RefreshToken()
        .then((response) => {
          console.log(response);
          sessionStorage.setItem('token', response.data.access_token);
          sessionStorage.setItem('refresh_token', response.data.refresh_token);
          sessionStorage.setItem('expires_in', Date.now() + (response.data.expires_in * 1000));
          sessionStorage.setItem('isAuth', true);
          dispatch({
            type: 'TOKEN',
            payload: response.data.access_token,
          })
          getRewiewList()
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      getRewiewList()
    }
  }, [state.lang, state.token])

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
          <div className="flex justify-center">
            <h1 className='text-3xl md:text-5xl dark:text-slate-200 text-neutral-700'>{headerContent.content.tittle}</h1>
          </div>
          <div className="flex justify-center py-3">
            <img className='w-6/12' src={headerContent.content.image} alt="reivew" />
          </div>
          <p className="text-center text-xl dark:text-slate-300 px-3 md:px-20 font-mono text-neutral-700">
            {headerContent.content.text}
          </p>
          <div className="flex justify-between mb-2">
            <span className='dark:text-slate-200'>{headerContent.countReviews}</span>
            <Review_modal getReview={getRewiewList} />
          </div>
          <hr />
          <div className="flex justify-start p-3">
            <DropdownMain />
          </div>
          <div className='h-full px-2 md:px-5 lg:px-20'>
            {dataReviews}
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

export default Reviews;