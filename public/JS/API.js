'use strict';

class API {
  constructor(userParams) {
    this.baseUrl = userParams.baseUrl;
    this.token = userParams.token;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`,
      {
        headers: {authorization: this.token},
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status
        }`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`,
      {
        headers: {authorization: this.token},
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status
        }`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateUserInfo(newName, newAbout, newAvatar) {
    return fetch(`${this.baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: {
          authorization: this.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newName,
          about: newAbout,
          avatar: newAvatar,
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status
        }`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}