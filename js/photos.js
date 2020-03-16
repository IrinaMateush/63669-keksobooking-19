'use strict';
// расписать как работает этот модуль или переписать его
// фото должны отрисовываться в карточке рандомно. Сейчас мы получаем массив фоток пинов при загрузке карты
(function (photoArr, cartsArr) {

  var popupPhotos = cartsArr.querySelector('.popup__photos'); // блок для фото в крточке
  var photoImage = cartsArr.querySelector('.popup__photo'); // фотография из карточки

  for (var i = 0; i < photoArr.length; i++) { //перебираем массив пинов откуда?
    var photos = photoArr[i].offer.photos;
  }

  var photosLength = photos.length;
  console.log(photosLength);
  for (var j = 0; j < photosLength - 1; j++) {
    popupPhotos.appendChild(photoImage.cloneNode(true));
  }

  var allPhotoImages = popupPhotos.querySelectorAll('.popup__photo');
  for (var k = 0; k < photosLength; k++) {
    allPhotoImages[k].setAttribute('src', photos[k]);
  }

  window.photos = {
    allPhotoImages: allPhotoImages //получаем из модуля
  };

})(window.pinsObject, window.cardElement); //передаем в модуль что?

