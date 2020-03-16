'use strict';

var ENTER_KEY = 'Enter';

var similarCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
var cardElement = similarCardTemplate.cloneNode(true);

window.cardFragment = document.createDocumentFragment();

var getCardElement = function (pin) {
  cardElement.querySelector('.popup__title').textContent = pin.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = pin.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = pin.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getType();
  cardElement.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ' выезд до' + pin.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = pin.offer.features;
  cardElement.querySelector('.popup__description').textContent = pin.offer.description;
  cardElement.querySelector('.popup__avatar').setAttribute('src', pin.author.avatar);
  window.cardFragment.appendChild(cardElement);
  return window.cardFragment;
};

var getPhotos = function (photoArr, cartsArr) {
  var photostest = cartsArr.querySelector('.popup__photos');
  var photoImage = cartsArr.querySelector('.popup__photo');

  for (var i = 0; i < photoArr.length; i++) {
    var photos = photoArr[i].offer.photos;
  }
  var photosLength = photos.length;
  for (var j = 0; j < photosLength - 1; j++) {
    photostest.appendChild(photoImage.cloneNode(true));
  }
  var allPhotoImages = photostest.querySelectorAll('.popup__photo');
  for (var k = 0; k < photosLength; k++) {
    allPhotoImages[k].setAttribute('src', photos[k]);
  }
  return allPhotoImages;
};

// баг, нужно вызывать для должен дергаться при клике на пин
getPhotos(pinsObject, cardElement);

var openCard = function (evt, avatar) {
  if (evt.target) {
    for (var i = 0; i < pinsObject.length; i++) {
      var cardsAvatar = pinsObject[i].author.avatar;
      if (avatar === cardsAvatar) {

        getCardElement(window.pins[i]);

        //window.test.cardFragment;
       // pinListElement.appendChild(window.pin.fragment);

        map.insertBefore(window.test.cardFragment, mapFiltersContainer);

        var popupClose = document.querySelector('.popup__close');
        var popup = document.querySelector('.popup');

        popupClose.addEventListener('click', function () {
          popup.remove();
        });

        popupClose.addEventListener('keydown', function () {
          if (evt.key === ENTER_KEY) {
            popup.remove();
          }
        });

        document.addEventListener('keydown', function (close) {
          if (close.key === ESC_KEY) {
            popup.remove();
          }
        });
      }
    }
  }
};
