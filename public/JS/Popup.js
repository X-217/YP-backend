'use strict';

class Popup {
  constructor() {
    this.container = document.querySelector(".popup");
    this.title = document.querySelector(".popup__title");
    this.form = document.querySelector(".popup__form");
    this.firstInput = document.querySelector(".popup__input_firstInput");
    this.secondInput = document.querySelector(".popup__input_secondInput");
    this.submitButton = document.querySelector(".popup__button");
    this.closeImg = document.querySelector(".popup__close_form");
  };

  close() {
    this.container.classList.remove('popup_is-opened');
  };
};
