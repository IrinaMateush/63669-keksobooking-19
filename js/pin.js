'use strict';
// модуль, который отвечает за создание коллекции меток

(function (pinsArr) {
    var fragment = document.createDocumentFragment();
    var pinHalfWidth = 23;
    var pinHeight = 64;
    var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  for (var i = 0; i < pinsArr.length; i++) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.setAttribute('style', 'left:' + (pinsArr[i].location.x - pinHalfWidth) + 'px; top:' + (pinsArr[i].location.y - pinHeight) + 'px;');
    pinElement.avatar = pinsArr[i].author.avatar;
    pinElement.querySelector('img').setAttribute('src', pinElement.avatar);
    pinElement.title = pinsArr[i].offer.title;
    pinElement.querySelector('img').setAttribute('alt', pinElement.title);
    pinElement.price = pinsArr[i].offer.price + ' ₽/ночь';
    pinElement.address = pinsArr[i].offer.address;
    pinElement.type = getType();
    pinElement.capacity = pinsArr[i].offer.rooms + ' комнаты для ' + pinsArr[i].offer.guests + ' гостей';
    pinElement.time = 'Заезд после ' + pinsArr[i].offer.checkin + ' выезд до' + pinsArr[i].offer.checkout;
    pinElement.features = pinsArr[i].offer.features;
    pinElement.description = pinsArr[i].offer.description;

    fragment.appendChild(pinElement);
  }

  window.pin = {
    fragment: fragment
  };

})(window.pins);
