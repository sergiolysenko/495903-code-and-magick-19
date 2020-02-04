'use strict';

var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_QUANTITY = 4;

var wizards = [];
var wizardCoat = document.querySelector('.wizard-coat');
var wizardEyes = document.querySelector('.wizard-eyes');
var fireball = document.querySelector('.setup-fireball-wrap');
var coatColorInput = document.querySelector('input[name=coat-color]');
var eyesColorInput = document.querySelector('input[name=eyes-color]');
var fireballColorInput = document.querySelector('input[name=fireball-color]');

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
var similarList = document.querySelector('.setup-similar-list');


var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomWizards = function () {
  for (var i = 0; i < WIZARDS_QUANTITY; i++) {
    wizards.push({
      name: WIZARDS_NAMES[getRandomInt(0, WIZARDS_NAMES.length - 1)] + ' ' + WIZARDS_SURNAMES[getRandomInt(0, WIZARDS_SURNAMES.length - 1)],
      coatColor: COAT_COLORS[getRandomInt(0, COAT_COLORS.length - 1)],
      eyesColor: EYES_COLORS[getRandomInt(0, EYES_COLORS.length - 1)]
    });
  }
  return wizards;
};
getRandomWizards();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarList.appendChild(fragment);

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');

var openPopup = function () {
  setup.classList.remove('hidden');
  setupOpen.removeEventListener('click', openPopup);
  setupClose.addEventListener('click', closePopup);
  document.addEventListener('keydown', onPopupEscPress);
  document.removeEventListener('keydown', openPopup);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setupClose.removeEventListener('click', closePopup);
  setupOpen.addEventListener('click', openPopup);
};

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
};

setupOpen.addEventListener('click', openPopup);
setupClose.addEventListener('click', closePopup);


setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});
setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

var userNameInput = setup.querySelector('.setup-user-name');
userNameInput.addEventListener('invalid', function () {
  switch (true) {
    case userNameInput.validity.tooShort:
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
      break;
    case userNameInput.validity.tooLong:
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
      break;
    case userNameInput.validity.valueMissing:
      userNameInput.setCustomValidity('Обязательное поле');
      break;
    default:
      userNameInput.setCustomValidity('');
      break;
  }
});

var getRandomArrElem = function (arr) {
  for (var n = 0; n < arr.length; n++) {
    var randomElem = arr[getRandomInt(0, arr.length - 1)];
  }
  return randomElem;
};

wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = getRandomArrElem(COAT_COLORS);
  coatColorInput.value = wizardCoat.style.fill;
});

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = getRandomArrElem(EYES_COLORS);
  eyesColorInput.value = wizardEyes.style.fill;
});

fireball.addEventListener('click', function () {
  var fireballRandomColor = getRandomArrElem(FIREBALL_COLORS);
  fireball.style.backgroundColor = fireballRandomColor;
  fireballColorInput.value = fireballRandomColor;
});
