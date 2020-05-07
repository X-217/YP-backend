'use strict';

class CardList {
  constructor(cardContainer, card,) {
    this.cardContainer = cardContainer;
    this.card = card;
  };

  addCard(item) {
    this.card.create(item, this.cardContainer);
  };

  render(initialCards) {
    initialCards.forEach(item => this.addCard(item));
  };
};