'use strict';

class FormValidator {
  constructor() {
  };

  setEventListeners(obj) {
    obj.form.addEventListener('input', () => this.setSubmitButtonState.call(this, obj));
  };

  checkInputValidity(errorMessages) {
    if (this.validity.valueMissing) {
      this.nextElementSibling.textContent = errorMessages.valueMissing;
      return false;
    }
    if (this.validity.tooShort) {
      this.nextElementSibling.textContent = errorMessages.validationLenght;
      return false;
    }
    if (!this.validity.valid) {
      this.nextElementSibling.textContent = errorMessages.isNotURL;
      return false;
    }
    this.nextElementSibling.textContent = "";
    return true;
  };

  setSubmitButtonState(obj) {
    const firstVal = this.checkInputValidity.call(obj.firstInput, obj.errorMessages);
    const secVal = this.checkInputValidity.call(obj.secondInput, obj.errorMessages);
    if (firstVal && secVal) {
      obj.submitButton.removeAttribute("disabled");
      obj.submitButton.classList.add("popup__button_activate");
    } else {
      obj.submitButton.setAttribute("disabled", "");
      obj.submitButton.classList.remove("popup__button_activate");
    }
  };
}