let phrases = [
  'отправить другу смешную гифку',
  'посмотреть скидки на авиабилеты',
  'разобраться, о чём поют рэперы',
  'Юрий Дудь',
  'расставить книги на полке по цвету',
  'читать про зарплаты в Сан-Франциско',
];

function getRandomElement(arr) {
  let randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
}
let button = document.querySelector('.button');
let advice = document.querySelector('.advice');
let phrase = document.querySelector('.phrase');
let image = document.querySelector('.image');
phrase.textContent = getRandomElement(phrases);
