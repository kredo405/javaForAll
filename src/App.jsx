import Main from './pages/main/Main';
import Auth from './pages/Auth/Auth';
import Reviews from './pages/Reviews/Reviews';
import Simulator from './pages/Simulator/Simulator';
import About from './pages/About/About';
import Contacts from './pages/Contacts/Contacts';
import Registration from './pages/Registration/Registration';
import Page404 from './pages/Page404/Page404';
import RegistrationSuccess from './components/RefistrationSucces/RegistrationSucces';
import { Routes, Route, Navigate } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './App.scss';

const App = () => {
  const state = useSelector(state => state);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'LANG',
      payload: i18n.language,
    })
  }, []);

  return (
    <div className={state.theme}>
      <Routes>
        <Route path="/*" element={<Navigate replace to="/page404" />} />
        <Route path="/page404" element={<Page404 />} />
        <Route path="/registrationSuccess" element={<RegistrationSuccess />} />
        <Route path="/main" element={<Main />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/"
          element={
            <Navigate replace to="/main" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
