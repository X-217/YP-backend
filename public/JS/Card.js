class Card {
  constructor(imageViewPopup) {
    this.name = '';
    this.link = '';
    this.cardContainer = '';
    this.container = {};
    this.imageViewPopup = imageViewPopup;
  }

  create(item, cardContainer) {
    this.name = item.name;
    this.link = item.link;
    this.cardContainer = cardContainer;
    const cardTemplate = `<div class="place-card">
                    <div class="place-card__image" style="background-image: url(${this.link})">
                        <button class="place-card__delete-icon"></button>
                    </div>
                    <div class="place-card__description">
                        <h3 class="place-card__name">${this.name}</h3>
                        <button class="place-card__like-icon"></button>
                    </div>
                </div>`;
    this.cardContainer.insertAdjacentHTML('beforeend', cardTemplate);
    this.container = this.cardContainer.lastChild;
    this.setEventListeners();
  };

  setEventListeners() {
    this.container.querySelector(".place-card__like-icon").addEventListener('click', this.like);
    this.container.querySelector(".place-card__delete-icon").addEventListener('click', this.remove);
    this.container.querySelector(".place-card__image").addEventListener('click', this.showViewer.bind(this));
  };

  like(event) {
    event.target.classList.toggle("place-card__like-icon_liked");
  };

  remove(event) {
    event.stopImmediatePropagation();
    event.target.parentElement.parentElement.parentElement.removeChild(event.target.parentElement.parentElement);
  };

  showViewer(event) {
    const url = event.target.style.backgroundImage;
    const imgSrc = url.slice(5, url.length - 2);
    this.imageViewPopup.open(imgSrc);
    this.imageViewPopup.setEventListeners();
  };
}