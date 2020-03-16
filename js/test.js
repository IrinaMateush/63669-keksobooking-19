'use strict';

(function (pin) {

  var similarCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
  var cardElement = similarCardTemplate.cloneNode(true);
  var cardFragment = document.createDocumentFragment();

  console.log('пин - ' + pin); //вызов
  cardElement.querySelector('.popup__title').textContent = pin.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = pin.address;
  cardElement.querySelector('.popup__text--price').textContent = pin.price;
  /*
  cardElement.querySelector('.popup__type').textContent = getType();
  cardElement.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ' выезд до' + pin.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = pin.offer.features;
  cardElement.querySelector('.popup__description').textContent = pin.offer.description;
  cardElement.querySelector('.popup__avatar').setAttribute('src', pin.author.avatar);
  */
  cardFragment.appendChild(cardElement);
  window.test = {
    cardFragment: cardFragment
  };

})(window.pinClick); // передаю в ф-цию пин на который был клик

