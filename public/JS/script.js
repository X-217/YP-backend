'use strict';

const cardContainer = document.querySelector(".places-list");
const userParams = {
  baseUrl: "http://95.216.175.5/cohort7",
  token: "e68c9d86-cb48-42e5-bf67-da81383a3bce",
};
const api = new API(userParams);
const imageViewPopup = new ImageViewPopup();
const card = new Card(imageViewPopup);
const cardList = new CardList(cardContainer, card);
const userInfo = new UserInfo(api);
const formValidator = new FormValidator();
const addPlacePopup = new AddPlacePopup(cardList, formValidator);
const editUserPopup = new EditUserPopup(userInfo, formValidator, api);

document.querySelector('.profile').addEventListener('click', mainPopupShow);

loadInitialData(api, userInfo, cardList);

function mainPopupShow(event) {
  if (event.target.closest(".user-info__edit-button")) {
    editUserPopup.open();
  } else if (event.target.closest(".user-info__button")) {
    addPlacePopup.open();
  }
}

function loadInitialData(api, userInfo, cardList) {
  api.getUserInfo().then((result) => {
    userInfo.setUserInfo(result.name, result.about, result.avatar);
    userInfo.showUserInfo();
  });
  api.getInitialCards().then((result) => {
    cardList.render(result);
  });
}


/**
 * Здравствуйте.
 * Надо исправить: Название файлов должна быть идентично названию класса Например если класс назвается FormValidator, то файл должен называться FormValidator
 *
 *  Надо исправить: Для начала вам необходимо создать класс API в котором каждый метод
 * Все запросы должны быть методами этого класс. Если мы получаем список карточек, то в классе должен быть метод getInitialCards
 * Если профиль пользователя то getUserInfo и так далее
 *
 *   Надо исправить: Необходимо вынести такие параметры как IP адрес в отдельный и передавать
 в качестве параметра при инициализации будущего класса
 Хочу заметить что данные авторизации лучше передать при создании класса API в ввиде объекта

 * Самый правильный способ, как пример указан в брифе
 // url лучше передавать при инициализации класса в конструктор
 fetch(`url/cards`,
 {
       headers: {
                        // ключ который надо передавать в параметрах
      authorization: param.authorization
                    }
                })
 .then(res => {
        if (res.ok) {
       return res.json();
                }
                // если ошибка, переходим в catch
       return Promise.reject(`Ошибка: ${res.status
                }`);
            })
 .then((result) => {
                // обрабатываем результат
                // а точнее возвращает результат работы прямо в тот класс откуда вызывали
            })
 .catch((err) => {
      console.log(err); // выведем ошибку в консоль
                });


 * Вызывать же методы класса Api лучше из других классов
 *
 * Стоит отметить, что реализации в классе API быть не должно. Точнее прямого взаимодействия. Методы могут вызываться
 * из других классов и возвращать данные, а работа с этими данными должны быть непосредственно в классах создаваемых в 8 спринте
 *
 * работа принимается только при исправлении всех "Надо исправить"
 *
 *
 * Класс Api это отдельный класс который ничего не знает о других классах и методах
 * Вы можете только получать данные из этого класса и использовать эти данные.
 * Представьте, что я дам Вам другой класс(допустим DataBase) к внутренностям которого вы не будете иметь доступ и даже прочитать этот файл не сможете
 * скажу что у него есть несколько методов  getInitialCards deleteCard addCard, editUserInfo, setUserInfo и так далее
 * Который только возвращает данные, а вы можите получить только обращась к этим методам.
 * Соответственно в классе нельзя реализовать такие методы как querySelector или обратиться к другому классу, а только обратитьсяк методам.
 * Отдельная обязанность. Таким же способом Вы обращаетесь к серверу. Вы не знаете, что на сервере, даже язык программирования, но вы знаете методы
 * к которым обращаетесь и способ обращения. Это и есть обязанность отдельного класса.

 *
 */

/**
 * Здравствуйте, спасибо что всё поправили
 *
 * Вопрос, а если вам понадобится название "Должно быть от 2 до 30 символов" в другом классе ?
 * Самое идельное, это вынести названия в отдельный объект и передавать в качестве параметров
 *  как пример взаимодействия классов и объектов
 const container = document.querySelector('.places-list'); // место куда записывать карточки
 const cards = []; // массив с карточками
 const words = {ru: { validationLenght: 'Должно быть от 2 до 30 символов'}};
 const config = {authorization: "ключ",ip: "http://95.216.175.5/cohort7",}; // настройки
 const api = new Api(config);
 const card = new Card(api);
 const validation = new FormValidator({words:words});
 const cardList = new CardList({card:card, api:api});
 cardList.render(container, cards);
 const popupCard = new PopupCard({ validation:validation,api:api});
 const popupProfile = new PopupProfile({ validation:validation,api:api});
 const popupImage = new PopupImage();
 *
 *
 * Работа принимается
 *
 */