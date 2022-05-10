let isEnglish = true;
if (JSON.parse(localStorage.getItem('lang')) === 'false') {
  isEnglish = false;
}

const sL1 = [
  ['Console', '`', '~', 'ё', 'Ё'],
  ['Digit1', '1', '!', '1', '!'],
  ['Digit2', '2', '@', '2', '"'],
  ['Digit3', '3', '#', '3', '№'],
  ['Digit4', '4', '$', '4', ';'],
  ['Digit5', '5', '%', '5', '%'],
  ['Digit6', '6', '^', '6', ':'],
  ['Digit7', '7', '&', '7', '?'],
  ['Digit8', '8', '*', '8', '*'],
  ['Digit9', '9', '(', '9', '('],
  ['Digit0', '0', ')', '0', ')'],
  ['Minus', '-', '_', '-', '_'],
  ['Equal', '=', '+', '=', '+'],
  ['Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace']];
const sL2 = [
  ['Tab', 'Tab', 'Tab', 'Tab', 'Tab'],
  ['KeyQ', 'q', 'Q', 'й', 'Й'],
  ['KeyW', 'w', 'W', 'ц', 'Ц'],
  ['KeyE', 'e', 'E', 'у', 'У'],
  ['KeyR', 'r', 'R', 'к', 'К'],
  ['KeyT', 't', 'T', 'е', 'Е'],
  ['KeyY', 'y', 'Y', 'н', 'Н'],
  ['KeyU', 'u', 'U', 'г', 'Г'],
  ['KeyI', 'i', 'I', 'ш', 'Ш'],
  ['KeyO', 'o', 'O', 'щ', 'Щ'],
  ['KeyP', 'p', 'P', 'з', 'З'],
  ['BracketLeft', '[', '{', 'х', 'Х'],
  ['BracketRight', ']', '}', 'ъ', 'Ъ'],
  ['Backslash', '\\', '|', '\\', '/'],
  ['Delete', 'Del', 'Del', 'Del', 'Del']];
const sL3 = [
  ['CapsLock', 'CapsLock', 'CapsLock', 'CapsLock', 'CapsLock'],
  ['KeyA', 'a', 'A', 'ф', 'Ф'],
  ['KeyS', 's', 'S', 'ы', 'Ы'],
  ['KeyD', 'd', 'D', 'в', 'В'],
  ['KeyF', 'f', 'F', 'а', 'А'],
  ['KeyG', 'g', 'G', 'п', 'П'],
  ['KeyH', 'h', 'H', 'р', 'Р'],
  ['KeyJ', 'j', 'J', 'о', 'О'],
  ['KeyK', 'k', 'K', 'л', 'Л'],
  ['KeyL', 'l', 'L', 'д', 'Д'],
  ['Semicolon', ';', ':', 'ж', 'Ж'],
  ['Quote', '∖', '∖', 'э', 'Э'],
  ['Enter', 'Enter', 'Enter', 'Enter', 'Enter']];
const sL4 = [
  ['ShiftLeft', 'Shift', 'Shift', 'Shift', 'Shift'],
  ['Forwardslash', '\\', '|', '\\', '/'],
  ['KeyZ', 'z', 'Z', 'я', 'Я'],
  ['KeyX', 'x', 'X', 'ч', 'Ч'],
  ['KeyC', 'c', 'C', 'с', 'С'],
  ['KeyV', 'v', 'V', 'м', 'М'],
  ['KeyB', 'b', 'B', 'и', 'И'],
  ['KeyN', 'n', 'N', 'т', 'Т'],
  ['KeyM', 'm', 'M', 'ь', 'Ь'],
  ['Comma', ',', '<', 'б', 'Б'],
  ['Period', '.', '>', 'ю', 'Ю'],
  ['Slash', '/', '?', '.', ','],
  ['ArrowUp', '&uarr;', '&uarr;', '&uarr;', '&uarr;'],
  ['ShiftRight', 'Shft', 'Shft', 'Shft', 'Shft']];
const sL5 = [
  ['ControlLeft', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl'],
  ['WinButton', 'Win', 'Win', 'Win', 'Win'],
  ['AltLeft', 'Alt', 'Alt', 'Alt', 'Alt'],
  ['Space', ' ', ' ', ' ', ' '],
  ['AltRight', 'Alt', 'Alt', 'Alt', 'Alt'],
  ['ControlRight', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl'],
  ['ArrowLeft', '&larr;', '&larr;', '&larr;', '&larr;'],
  ['ArrowDown', '&darr;', '&darr;', '&darr;', '&darr;'],
  ['ArrowRight', '&rarr;', '&rarr;', '&rarr;', '&rarr;']];

const text = document.createElement('textarea');

text.setAttribute('cols', '50');
text.setAttribute('rows', '10');
text.setAttribute('spellcheck', 'false');

document.body.appendChild(text);

const keyboard = document.createElement('div');
keyboard.setAttribute('class', 'keyboard');
document.body.appendChild(keyboard);

const description = document.createElement('p');
description.style.cssText = 'font-size: 18px';
description.innerText = 'Смена языка: Alt + Ctrl. Система: Windows';
document.body.appendChild(description);

const linkPR = document.createElement('a');
linkPR.setAttribute('href', 'https://github.com/koviatsinets/virtual-keyboard/pull/3')
linkPR.style.cssText = 'font-size: 18px; margin-bottom: 20px';
linkPR.innerText = 'Ссылка на Pull Request';
document.body.prepend(linkPR);

const buttonLines = []; // генерация  рядов клавиш
for (let i = 1; i <= 5; i += 1) {
  buttonLines[i] = document.createElement('div');
  buttonLines[i].setAttribute('class', `but-line-${i}`);
  keyboard.appendChild(buttonLines[i]);
}

let isShiftOn = false;
let isCapsLock = false;

class Key {
  constructor(letName, engVariant, engShiftVariant, ruVariant, ruShiftVariant, parent) {
    this.letName = letName;
    this.parent = parent;
    this.ruVariantValue = ruVariant;
    this.ruShiftVariantValue = ruShiftVariant;
    this.engVariantValue = engVariant;
    this.engShiftVariantValue = engShiftVariant;
    this.createKey = () => {
      this.div = document.createElement('div'); // создаем саму кнопку
      this.div.className = 'key';
      this.div.id = letName;
      this.parent.append(this.div);

      this.engVariant = document.createElement('span'); // создаем англ. символы
      this.engVariant.innerHTML = this.engVariantValue;
      this.engVariant.style.pointerEvents = 'none';
      this.div.appendChild(this.engVariant);

      this.ruVariant = document.createElement('span'); // создаем рус. символы
      this.ruVariant.innerHTML = this.ruVariantValue;
      this.ruVariant.style.pointerEvents = 'none';
      this.div.appendChild(this.ruVariant);

      if (isEnglish) {
        this.engVariant.style.display = 'block'; // начальное состояние языка при загрузке страницы
        this.ruVariant.style.display = 'none';
        this.currentVariant = engVariant;
      } else {
        this.engVariant.style.display = 'none';
        this.ruVariant.style.display = 'block';
        this.currentVariant = ruVariant;
      }
    };
    this.changeLang = () => { // смена языка
      if (isEnglish) {
        this.currentVariant = ruVariant;
        this.engVariant.style.display = 'none';
        this.ruVariant.style.display = 'block';
      } else {
        this.currentVariant = engVariant;
        this.engVariant.style.display = 'block';
        this.ruVariant.style.display = 'none';
      }
    };
    this.changeLargeSymbols = () => { // реализация работы шифта
      if (isEnglish) {
        if (isShiftOn === true) {
          this.currentVariant = engShiftVariant;
        } else {
          this.currentVariant = engVariant;
        }
      } else if (isShiftOn === true) {
        this.currentVariant = ruShiftVariant;
      } else {
        this.currentVariant = ruVariant;
      }
    };
  }
}

// -------------- Генерация клавиш в каждом ряду --------------

const lnOneK = [];
const lnTwoK = [];
const lnThrK = [];
const lnFouK = [];
const lnFivK = [];

for (let j = 0; j < sL1.length; j += 1) {
  lnOneK[j] = new Key(sL1[j][0], sL1[j][1], sL1[j][2], sL1[j][3], sL1[j][4], buttonLines[1]);
  lnOneK[j].createKey();
}

for (let j = 0; j < sL2.length; j += 1) {
  lnTwoK[j] = new Key(sL2[j][0], sL2[j][1], sL2[j][2], sL2[j][3], sL2[j][4], buttonLines[2]);
  lnTwoK[j].createKey();
}

for (let j = 0; j < sL3.length; j += 1) {
  lnThrK[j] = new Key(sL3[j][0], sL3[j][1], sL3[j][2], sL3[j][3], sL3[j][4], buttonLines[3]);
  lnThrK[j].createKey();
}

for (let j = 0; j < sL4.length; j += 1) {
  lnFouK[j] = new Key(sL4[j][0], sL4[j][1], sL4[j][2], sL4[j][3], sL4[j][4], buttonLines[4]);
  lnFouK[j].createKey();
}

for (let j = 0; j < sL5.length; j += 1) {
  lnFivK[j] = new Key(sL5[j][0], sL5[j][1], sL5[j][2], sL5[j][3], sL5[j][4], buttonLines[5]);
  lnFivK[j].createKey();
}

const allLineKeys = lnOneK.concat(lnTwoK, lnThrK, lnFouK, lnFivK);

// -------------- Нажатие и отжатие клавиши --------------

function type(EO) {
  allLineKeys.forEach((a) => {
    const paramA = a;
    if (EO.code === paramA.letName) {
      paramA.div.style.backgroundColor = '#88c200';
      paramA.div.style.transform = 'scale(0.8)'; // анимация при нажатии
      if ((EO.altKey) && (EO.ctrlKey)) { // задаем комбинацию клавиш для смены языка
        allLineKeys.forEach((b) => {
          const paramB = b;
          paramB.changeLang();
        });
        isEnglish = !isEnglish;
        localStorage.setItem('lang', JSON.stringify(`${isEnglish}`));
      }
      switch (EO.code) { // задаем логику работы "функциональным" клавишам
        case 'ShiftLeft':
          isShiftOn = !isShiftOn;
          allLineKeys.forEach((c) => {
            const paramC = c;
            paramC.changeLargeSymbols();
          });
          break;

        case 'ShiftRight':
          isShiftOn = !isShiftOn;
          allLineKeys.forEach((d) => {
            const paramD = d;
            paramD.changeLargeSymbols();
          });
          break;

        case 'CapsLock':
          isCapsLock = !isCapsLock;
          if (isCapsLock) {
            paramA.div.style.backgroundColor = '#88c200';
          } else {
            paramA.div.style.backgroundColor = null;
            paramA.div.style.transform = null;
          }
          isShiftOn = !isShiftOn;
          allLineKeys.forEach((e) => {
            const paramE = e;
            paramE.changeLargeSymbols();
          });
          break;

        case 'Enter':
          text.value += '\n';
          break;

        case 'Backspace':
          break;

        case 'Delete':
          break;

        case 'Tab':
          text.value += '\t';
          break;

        case 'ControlLeft':
          EO.preventDefault();
          text.selectionStart += 1;
          break;

        case 'ControlRight':
          EO.preventDefault();
          break;

        case 'AltLeft':
          EO.preventDefault();
          break;

        case 'Space':
          break;

        case 'AltRight':
          break;

        case 'MetaLeft':
          break;

        case 'ArrowUp':
          break;

        case 'ArrowDown':
          break;

        case 'ArrowLeft':
          text.selectionStart += -1;
          text.selectionEnd += -1;
          EO.preventDefault();
          break;

        case 'ArrowRight':
          text.selectionStart += 1;
          text.selectionEnd += 1;
          EO.preventDefault();
          break;

        default:
          EO.preventDefault();
          text.value += a.currentVariant; // если нажата обычная клавиша - выводим ее в строку
          break;
      }
      text.focus();
    }
  });
}

function drop(EO) {
  allLineKeys.forEach((f) => {
    const paramF = f;
    if (EO.code === paramF.letName && paramF.letName !== 'CapsLock') {
      paramF.div.style.backgroundColor = null; // возврат исходного вида клавиши при отжатии
      paramF.div.style.transform = null;
    }
    if ((EO.code === 'ShiftLeft') || (EO.code === 'ShiftRight')) { // возврат шифта в начальное положение
      isShiftOn = !isShiftOn;
      allLineKeys.forEach((a) => {
        a.changeLargeSymbols();
      });
    }
  });
}

document.addEventListener('keydown', type);
document.addEventListener('keyup', drop);

let clickTarget = '';
function clickMouse(EO) {
  const event = new Event('keydown');
  event.code = EO.target.id;
  clickTarget = EO.target.id;
  document.dispatchEvent(event);
}

function dropMouse(EO) {
  const evEO = EO;
  const event = new Event('keyup');
  evEO.target.style.transform = null;
  event.code = clickTarget;
  document.dispatchEvent(event);
}

document.addEventListener('mousedown', clickMouse);
document.addEventListener('mouseup', dropMouse);

function focus() {
  text.focus();
}

text.focus();

window.addEventListener('click', focus);
