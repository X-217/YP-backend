'use strict';

class ImageViewPopup {
  constructor() {
    this.container = document.querySelector(".popup__image-viewer");
    this.closeImg = document.querySelector(".popup__close_img");
    this.image = document.querySelector('.popup__image')
  };

  setEventListeners() {
    this.closeImg.addEventListener('click', this.close.bind(this), {once: true});
  };

  open(image) {
    this.image.setAttribute('src', image);
    this.container.classList.add('popup_is-opened');
  };

  close() {
    this.container.classList.remove('popup_is-opened');
  };
};
