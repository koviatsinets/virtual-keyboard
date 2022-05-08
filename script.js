let isEnglish = true;
if (JSON.parse(localStorage.getItem('lang')) === 'false') {
    isEnglish = false;
}

let symbolsLine1 = [
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
let symbolsLine2 = [
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
let symbolsLine3 = [
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
    ['Quote', '\'', '\"', 'э', 'Э'],
    ['Enter', 'Enter', 'Enter', 'Enter', 'Enter']];
let symbolsLine4 = [
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
let symbolsLine5 = [
    ['ControlLeft', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl'],
    ['WinButton', 'Win', 'Win', 'Win', 'Win'],
    ['AltLeft', 'Alt', 'Alt', 'Alt', 'Alt'],
    ['Space', ' ', ' ', ' ', ' '],
    ['AltRight', 'Alt', 'Alt', 'Alt', 'Alt'],
    ['ControlRight', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl'],
    ['ArrowLeft', '&larr;', '&larr;', '&larr;', '&larr;'],
    ['ArrowDown', '&darr;', '&darr;', '&darr;', '&darr;'],
    ['ArrowRight', '&rarr;', '&rarr;', '&rarr;', '&rarr;']];

let text = document.createElement('textarea');

text.setAttribute('cols', '50');
text.setAttribute('rows', '10');
text.setAttribute('spellcheck', 'false');

document.body.appendChild(text);

let keyboard = document.createElement('div');
keyboard.setAttribute('class', 'keyboard');
document.body.appendChild(keyboard);

let description = document.createElement('p');
description.style.cssText = 'font-size: 18px; left: -260px; position: relative';
description.innerText = 'Смена языка: Alt + Ctrl. Система: Windows';
document.body.appendChild(description);

let buttonLines = []; // генерация  рядов клавиш
for (i = 1; i <= 5; i++) {
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
        this.createKey = function() {
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
        }
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
        }
        this.changeLargeSymbols = () => { // реализация работы шифта
            if (isEnglish) {
                if (isShiftOn === true) {
                    this.currentVariant = engShiftVariant;
                } else {
                    this.currentVariant = engVariant;
                }
            } else {
                if (isShiftOn === true) {
                    this.currentVariant = ruShiftVariant;
                } else {
                    this.currentVariant = ruVariant;
                }
            }
        }
    }
}

// -------------- Генерация клавиш в каждом ряду --------------

let lineOneKeys = [];
let lineTwoKeys = [];
let lineThreeKeys = [];
let lineFourKeys = [];
let lineFiveKeys = [];

for (j = 0; j < symbolsLine1.length; j++) {
    lineOneKeys[j] = new Key(symbolsLine1[j][0], symbolsLine1[j][1], symbolsLine1[j][2], symbolsLine1[j][3], symbolsLine1[j][4], buttonLines[1])
    lineOneKeys[j].createKey();
}

for (j = 0; j < symbolsLine2.length; j++) {
    lineTwoKeys[j] = new Key(symbolsLine2[j][0], symbolsLine2[j][1], symbolsLine2[j][2], symbolsLine2[j][3], symbolsLine2[j][4], buttonLines[2])
    lineTwoKeys[j].createKey();
}

for (j = 0; j < symbolsLine3.length; j++) {
    lineThreeKeys[j] = new Key(symbolsLine3[j][0], symbolsLine3[j][1], symbolsLine3[j][2], symbolsLine3[j][3], symbolsLine3[j][4], buttonLines[3])
    lineThreeKeys[j].createKey();
}

for (j = 0; j < symbolsLine4.length; j++) {
    lineFourKeys[j] = new Key(symbolsLine4[j][0], symbolsLine4[j][1], symbolsLine4[j][2], symbolsLine4[j][3], symbolsLine4[j][4], buttonLines[4])
    lineFourKeys[j].createKey();
}

for (j = 0; j < symbolsLine5.length; j++) {
    lineFiveKeys[j] = new Key(symbolsLine5[j][0], symbolsLine5[j][1], symbolsLine5[j][2], symbolsLine5[j][3], symbolsLine5[j][4], buttonLines[5])
    lineFiveKeys[j].createKey();
}

let allLineKeys = lineOneKeys.concat(lineTwoKeys, lineThreeKeys, lineFourKeys, lineFiveKeys); // объединение всех клавиш в один массив для дальнейших манипуляций с клавишами

// -------------- Нажатие и отжатие клавиши -------------- 

document.addEventListener('keydown', type);
document.addEventListener('keyup', drop);

function type(EO) {
    console.log(EO.code)
    allLineKeys.forEach(a => {
        if (EO.code === a.letName) {
            a.div.style.backgroundColor = '#88c200';
            a.div.style.transform = 'scale(0.8)'; //анимация при нажатии
            if ((EO.altKey) && (EO.ctrlKey)) {   // задаем комбинацию клавиш для смены языка
                allLineKeys.forEach((a) => {
                    a.changeLang();
                });
                isEnglish = !isEnglish;
                    localStorage.setItem(`lang`, JSON.stringify(`${isEnglish}`));
            }
            switch(EO.code) { // задаем логику работы "функциональным" клавишам
                case 'ShiftLeft':
                    isShiftOn = !isShiftOn
                    allLineKeys.forEach((a) => {
                        a.changeLargeSymbols();
                    });
                    break;

                case 'ShiftRight':
                    isShiftOn = !isShiftOn
                    allLineKeys.forEach((a) => {
                        a.changeLargeSymbols();
                    });
                    break;

                case 'CapsLock':
                    isCapsLock = !isCapsLock;
                    if (isCapsLock) {
                        a.div.style.backgroundColor = '#88c200';
                    } else {
                        a.div.style.backgroundColor = null;
                        a.div.style.transform = null;
                    }
                    isShiftOn = !isShiftOn
                    allLineKeys.forEach((a) => {
                        a.changeLargeSymbols();
                    });
                    break;
                
                case 'Enter':
                    text.value += '\n'
                    break;
              
                case 'Backspace':
                    break;

                case 'Delete':
                    break;

                case 'Tab':
                    text.value = text.value + '\t';

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
    allLineKeys.forEach(b => {
        if (EO.code === b.letName && b.letName !== 'CapsLock') {
            b.div.style.backgroundColor = null; // возврат исходного вида клавиши при отжатии (кроме капслока)
            b.div.style.transform = null;
        }
        if ((EO.code === 'ShiftLeft') || (EO.code === 'ShiftRight')) { // возврат шифта в начальное положение
            isShiftOn = !isShiftOn;
            allLineKeys.forEach((a) => {
                a.changeLargeSymbols();
            })
        }
    })
}

document.addEventListener('mousedown', clickMouse);
document.addEventListener('mouseup', dropMouse);

let clickTarget = '';
function clickMouse(EO) {
    let event = new Event('keydown');
    event.code = EO.target.id;
    clickTarget = EO.target.id;
    document.dispatchEvent(event);
}

function dropMouse(EO) {
    let event = new Event('keyup');
    EO.target.style.transform = null;
    event.code = clickTarget;
    document.dispatchEvent(event);
}

text.focus();

window.addEventListener('click', focus);
function focus() {
    text.focus();
}