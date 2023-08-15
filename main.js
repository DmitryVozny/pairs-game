let cardColumn
let cardRow
let array = [];

let firstCard = null
let secondCard = null
let successPairs = 0

// Создаем массив чисел
function createNumbersArray(count) {
  for (let i = 1; i <= count; i++) {
    array.push(i, i);
  }
  return array;
}


// Перемешиваем массив
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//Функция создания полей ввода для старта игры
function getInput(placeholder, id) {
  let inp = document.createElement('input')
  inp.type = "number"
  inp.placeholder = `${placeholder}`
  inp.classList.add('input-start')
  inp.id = `${id}`
  return inp
}

// Функция создания кнопки
function getButton(text) {
  let btn = document.createElement('button')
  btn.classList.add('btn-start', 'btn')
  btn.textContent = `${text}`
  //btn.type = 'submit'
  return btn
}

//Функция создания одной карточки
function printOneCard() {
  let card = document.createElement('div')
  card.classList.add('card')
  return card
}

//Функция создания одной строки
function printOneRow() {
  let row = document.createElement('div')
  row.classList.add('row')
  for (let i = 0; i < cardColumn; i++) {
    row.append(printOneCard())
  }
  return row
}


//Функция создания поля строк
function printGameField() {
  let gameField = document.createElement('div')
  gameField.classList.add('container', 'game-field')
  for (let i = 0; i < cardRow; i++) {
    gameField.append(printOneRow())
  }
  return gameField
}


//Создаем игровое поле

// Здесь задаем инпуты и кнопку для старта игры

let box = document.createElement('div')
box.classList.add('container')
let form = document.createElement('div')
form.classList.add('form-startgame')
let cardColumnInp = getInput('Карточки по вертикали', 'cardColumn')
let cardRowInp = getInput('Карточки по горизонтали', 'cardRow')
let startBtn = getButton('Начать игру')

form.append(cardColumnInp, cardRowInp, startBtn)
box.append(form)
document.body.append(box)




// По клику создаем игровое поле заданных размеров
startBtn.onclick = function () {

  let field = document.querySelector('.game-field')
  if (field != null) {
    field.remove();
  }

  cardColumn = Number(cardColumnInp.value);
  cardRow = Number(cardRowInp.value);
  if (cardColumn < 2 || cardColumn > 10 || cardColumn % 2 != 0) {
    cardColumn = 4
  }

  if (cardRow < 2 || cardRow > 10 || cardRow % 2 != 0) {
    cardRow = 4
  }

  let gameField = printGameField()
  document.body.append(gameField)
  let count = cardColumn * cardRow / 2;

  //Вызываем и перемешиваем массив
  createNumbersArray(count);
  shuffle(createNumbersArray());

  //Логика Игры

  // Получаем массив всех карточек
  let cardsArray = document.querySelectorAll('.card');

  //Циклом вписываем текст в карточки
  for (let i = 0; i < cardsArray.length; i++) {
    cardsArray[i].textContent = array[i];
  }


  // Показываем число в карточке по клику
  for (let card of cardsArray) {
    card.onclick = function () {
      // Сравнение чисел в двух отрытых карточках
      if (firstCard !== null && secondCard !== null) {
        if (firstCard.textContent !== secondCard.textContent) {
          firstCard.classList.remove('visible')
          secondCard.classList.remove('visible')
          firstCard = null
          secondCard = null
        }
      }
      card.classList.add('visible')
      if (firstCard == null) {
        firstCard = card
      } else {
        if (secondCard == null) {
          secondCard = card
        }
      }

      // Сравнение чисел в двух отрытых карточках
      if (firstCard !== null && secondCard !== null) {
        if (firstCard.textContent === secondCard.textContent) {
          firstCard.classList.add('success')
          secondCard.classList.add('success')
          firstCard = null
          secondCard = null
          successPairs++
        }
      }

      // Здесь делаем сброс значений переменных по окончанию игры
      if (successPairs === count) {
        alert('Поздравляем!!! Вы выйграли!!!')
        successPairs = 0
        array = [];
        firstCard = null
        secondCard = null
        cardColumnInp.value = ''
        cardRowInp.value = ''
        gameField.remove()
      }
    }
  }
}
