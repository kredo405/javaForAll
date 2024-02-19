import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
      resources: {
          ru: {
              translation: {
                  description: {
                      part1: 'О проекте',
                      part2: 'Контакты',
                      part3: 'Отзывы',
                      part4: 'В "IT"',
                      part5: 'Тренажёр',
                      part6: 'Справочная литература',
                      part7: 'Написать отзыв',
                      part8: 'Сортировка',
                      part9: 'Отправить',
                      part10: 'Мы в социальных сетях',
                      part11: 'Сообщение',
                      part12: 'Это необходимый минимум для современного backend-разработчика',
                      part13: 'Войдите в ваш аккаунт',
                      part14: 'Email адрес',
                      part15: 'Пароль',
                      part16: 'Запомнить меня',
                      part17: 'Забыли пароль?',
                      part18: 'Войти',
                      part19: 'Еще нет аккаунта?',
                      part20: 'Зарегистрируйтесь',
                      part21: 'Создайте аккаунт',
                      part22: 'Логин',
                      part23: 'Фамилия',
                      part24: 'Имя',
                      part25: 'Страна',
                      part26: 'Город',
                      part27: 'Профессия',
                      part28: 'Загрузить фото',
                      part29: 'Регистрация',
                      part30: 'Уже есть аккаунт? ',
                      part31: 'Войдите',
                      part32: 'Выйти',
                      part33: 'Вы успешно авторизовались',
                      part34: 'Вы можете вернуться на главную страницу или начать учиться!',
                      part35: 'На главную',
                      part36: 'Начать учиться',
                      part37: 'Вы действительно хотите выйти?',
                      part38: 'Да',
                      part39: 'Нет',
                      part40: 'Профиль',
                      part41: 'Вы успешно зарегистрировались',
                      part42: 'Вы можете вернуться на главную страницу или войти',
                  }
              }
          },
          en: {
              translation: {
                  description: {
                      part1: 'About the project',
                      part2: 'Contacts',
                      part3: 'Reviews',
                      part4: 'In "IT"',
                      part5: 'Simulator',
                      part6: 'References',
                      part7: 'Add a review',
                      part8: 'Sorting',
                      part9: 'Send',
                      part10: 'We are in social networks',
                      part11: 'Message',
                      part12: 'This is a necessary minimum for a modern backend developer',
                      part13: 'Log in to your account',
                      part14: 'Email address',
                      part15: 'Password',
                      part16: 'Remember me',
                      part17: 'Forgot your password?',
                      part18: 'Log in',
                      part19: "Don't have an account yet?",
                      part20: 'Register',
                      part21: 'Create an account',
                      part22: 'Nickname',
                      part23: 'Surname',
                      part24: 'Name',
                      part25: 'Country',
                      part26: 'Sity',
                      part27: 'Profession',
                      part28: 'Upload a photo',
                      part29: 'Registration',
                      part30: 'Already have an account?',
                      part31: 'Log in',
                      part32: 'Logout',
                      part33: 'You have successfully logged in',
                      part34: 'You can go back to the main page or start learning!',
                      part35: 'Home',
                      part36: 'Start learning',
                      part37: 'Do you really want to go out?',
                      part38: 'Yes',
                      part39: 'No',
                      part40: 'Profile',
                      part41: 'You have registered successfully',
                      part42: 'You can return to the main page or log in',
                  }
              }
          },
          be: {
            translation: {
                description: {
                    part1: 'Пра праект',
                    part2: 'Кантакты',
                    part3: 'Водгукі',
                    part4: 'В "IT"',
                    part5: 'Трэнажор',
                    part6: 'Даведачная літаратура',
                    part7: 'Напісаць водгук',
                    part8: 'Сартаванне',
                    part9: 'Адправіць',
                    part10: 'Мы ў сацыяльных сетках',
                    part11: 'Паведамленне',
                    part12: 'Гэта неабходны мінімум для сучаснага backend-распрацоўніка',
                    part13: 'Увайдзіце ў ваш рахунак',
                    part14: 'Email адрас',
                    part15: 'Пароль',
                    part16: 'Запомніць мяне',
                    part17: 'Забыліся пароль?',
                    part18: 'Увайсці',
                    part19: 'Яшчэ няма акаўнта?',
                    part20: 'Зарэгістравацца',
                    part21: 'Стварыце рахунак',
                    part22: 'Нікнэйм',
                    part23: 'Прозвішча',
                    part24: 'Імя',
                    part25: 'Краіна',
                    part26: 'Горад',
                    part27: 'Прафесія',
                    part28: 'Загрузіць фота',
                    part29: 'Рэгістрацыя',
                    part30: 'Ужо ёсць рахунак?',
                    part31: 'Увайсці',
                    part32: 'Выйсці',
                    part33: 'Вы паспяхова аўтарызаваліся',
                    part34: 'Вы можаце вярнуцца на галоўную старонку або пачаць вучыцца!',
                    part35: 'На галоўную',
                    part36: 'Пачаць вучыцца',
                    part37: 'Вы сапраўды хочаце выйсці?',
                    part38: 'Так',
                    part39: 'Не',
                    part40: 'Профіль',
                    part41: 'Вы паспяхова зарэгістраваліся',
                    part42: 'Вы можаце вярнуцца на галоўную старонку або ўвайсці',
                }
            }
        },
      }
  });

export default i18n;