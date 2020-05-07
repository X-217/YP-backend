'use strict';

class AddPlacePopup extends Popup {
  constructor(cardList, formValidator) {
    super();
    this.text = {
      title: "Новое место",
      firstPlaceholder: "Название",
      secondPlaceholder: "Ссылка на картинку",
      buttonText: "+",
    };
    this.errorMessages = {
      valueMissing: "Это обязательное поле",
      validationLength: "Должно быть от 2 до 30 символов",
      isNotURL: "Здесь должна быть ссылка",
    };
    this.formValidator = formValidator;
    this.cardList = cardList;
  };

  setEventListeners() {
    this.form.addEventListener('submit', this.sendForm.bind(this), {once: true});
    this.closeImg.addEventListener('click', this.close.bind(this), {once: true});
  };

  sendForm(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.cardList.addCard({name: this.firstInput.value, link: this.secondInput.value});
    this.close();
  };

  open() {
    this.title.textContent = this.text.title;
    this.firstInput.value = "";
    this.firstInput.placeholder = this.text.firstPlaceholder;
    this.secondInput.value = "";
    this.secondInput.placeholder = this.text.secondPlaceholder;
    this.secondInput.removeAttribute("minlength");
    this.secondInput.removeAttribute("maxlength");
    this.secondInput.type = "url";
    this.submitButton.textContent = this.text.buttonText;
    this.submitButton.classList.remove("popup__button_save");
    this.setEventListeners(this);
    this.formValidator.setEventListeners(this);
    this.formValidator.setSubmitButtonState(this);
    this.container.classList.add('popup_is-opened');
  };
}
