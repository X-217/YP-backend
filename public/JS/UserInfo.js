'use strict';

class UserInfo {
  constructor() {
    this.name = "Имя";
    this.about = "О себе";
    this.avatar = "";
  };

  setUserInfo(newName, newAbout, newAvatar) {
    this.name = newName;
    this.about = newAbout;
    if (newAvatar) this.avatar = newAvatar;
  };

  showUserInfo() {
    document.querySelector(".user-info__name").textContent = this.name;
    document.querySelector(".user-info__job").textContent = this.about;
    document.querySelector(".user-info__photo").style.backgroundImage = `url(${this.avatar})`;
  };
}
