'use strict';

class EditUserPopup extends Popup {
  constructor(userInfo, formValidator, api) {
    super();
    this.userInfo = userInfo;
    this.api = api;
    this.text = {
      title: "Редактировать профиль",
      firstPlaceholder: "Имя",
      secondPlaceholder: "О себе",
      buttonText: "Сохранить",
    };
    this.errorMessages = {
      valueMissing: "Это обязательное поле",
      validationLength: "Должно быть от 2 до 30 символов",
      isNotURL: "",
    };
    this.formValidator = formValidator;
  };

  setEventListeners() {
    this.form.addEventListener('submit', this.sendForm.bind(this), {once: true});
    this.closeImg.addEventListener('click', this.close.bind(this), {once: true});
  };

  sendForm(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.api.updateUserInfo(this.firstInput.value, this.secondInput.value).then((result) => {
      this.userInfo.setUserInfo(result.name, result.about, result.avatar);
      this.userInfo.showUserInfo();
    });
    this.close();
  };

  open() {
    this.title.textContent = this.text.title;
    this.firstInput.value = this.userInfo.name;
    this.firstInput.placeholder = this.text.firstPlaceholder;//
    this.secondInput.value = this.userInfo.about;
    this.secondInput.placeholder = this.text.secondPlaceholder;
    this.secondInput.setAttribute("minlength", "2");
    this.secondInput.setAttribute("maxlength", "30");
    this.secondInput.type = "text";
    this.submitButton.textContent = this.text.buttonText;
    this.submitButton.classList.add("popup__button_save");
    this.setEventListeners(this);
    this.formValidator.setEventListeners(this);
    this.formValidator.setSubmitButtonState(this);
    this.container.classList.add('popup_is-opened');
  };
}
