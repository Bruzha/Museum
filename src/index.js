import _ from 'lodash';
/*function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}*/

let count = 0;
let minus = document.getElementById('minus1');
minus.onclick = function () {
  count--;
  if (count < 0) document.getElementById('count1').textContent = 0;
  else document.getElementById('count1').textContent = count;

  Cost();
};
let plus = document.getElementById('plus1');
plus.onclick = function () {
  if (count < 0) count = 0;
  count++;
  document.getElementById('count1').textContent = count;

  Cost();
};
let count2 = 0;
let minus2 = document.getElementById('minus2');
minus2.onclick = function () {
  count2--;
  if (count2 < 0) document.getElementById('count2').textContent = 0;
  else document.getElementById('count2').textContent = count2;

  Cost();
};
let plus2 = document.getElementById('plus2');
plus2.onclick = function () {
  if (count2 < 0) count2 = 0;
  count2++;
  document.getElementById('count2').textContent = count2;

  Cost();
};

let cost = 0;
document.getElementById('r1').onchange = () => {
  cost = 12;
  Cost();
};
document.getElementById('r2').onchange = () => {
  cost = 14;
  Cost();
};
document.getElementById('r3').onchange = () => {
  cost = 16;
  Cost();
};

function Cost() {
  let count3 = document.getElementById('count1').textContent;
  let count4 = document.getElementById('count2').textContent;
  document.getElementById('cost').textContent =
    'Total €' + (20 * count3 + 10 * count4).toString();
}

let b2 = document.getElementById('b2');
b2.onclick = function () {
  second_window = window.open('../dist/booking.html', '_blank');
};

let i_img = 0;
let mas_img = new Array(
  'C:/Users/DEll/Desktop/ПССИП/Практика КОДДОТ/Museum/src/img/1.png',
  'C:/Users/DEll/Desktop/ПССИП/Практика КОДДОТ/Museum/src/img/2.png',
  'C:/Users/DEll/Desktop/ПССИП/Практика КОДДОТ/Museum/src/img/3.png',
  'C:/Users/DEll/Desktop/ПССИП/Практика КОДДОТ/Museum/src/img/4.png',
  'C:/Users/DEll/Desktop/ПССИП/Практика КОДДОТ/Museum/src/img/5.png'
);

let first_img = document.getElementById('main_img');
let radio = document.querySelectorAll('.class1');
document.getElementById('arrow1').onclick = function () {
  i_img--;
  if (i_img < 0) i_img = 4;
  first_img.src = mas_img[i_img];
  document.getElementById('count_img').textContent =
    '0' + (i_img + 1).toString();
  for (let i = 0; i < 5; i++) {
    if (i === i_img) radio[i].className = 'radio-look2';
    else radio[i].className = 'radio-look';
  }
};
document.getElementById('arrow2').onclick = function () {
  i_img++;
  if (i_img > 4) i_img = 0;
  first_img.src = mas_img[i_img];
  document.getElementById('count_img').textContent =
    '0' + (i_img + 1).toString();
  for (let i = 0; i < 5; i++) {
    if (i === i_img) radio[i].className = 'radio-look2';
    else radio[i].className = 'radio-look';
  }
};

/*let i_video = 0;
let i_video2 = 0;
let i_video3 = 0;*/
let video = document.querySelectorAll('.frame');
let span = document.querySelectorAll('.class2');
let video_src = new Array(
  'https://www.youtube.com/embed/aWmJ5DgyWPI?si=H85tY1qiikp8xfTx',
  'https://www.youtube.com/embed/Vi5D6FKhRmo?si=WhHSVVS17bNR0Rx9',
  'https://www.youtube.com/embed/NOhDysLnTvY?si=5t7R4CF4vOVp_k1n',
  'https://www.youtube.com/embed/VVj-2Jdtl4o?si=2eQCWj_A3kqzbJEu',
  'https://www.youtube.com/embed/zp1BXPX8jcU?si=Zy4Job7HFMv4NsT5'
);
let i_video = new Array(0, 4, 3);
document.getElementById('arrow21').onclick = function () {
  i_video[0]--;
  i_video[1]--;
  i_video[2]--;
  if (i_video[0] < 0) i_video[0] = 4;
  if (i_video[1] < 0) i_video[1] = 4;
  if (i_video[2] < 0) i_video[2] = 4;
  for (let i = 0; i < 3; i++) {
    video[i].src = video_src[i_video[i]];
  }
  for (let i = 0; i < 5; i++) {
    if (i === i_video[0]) span[i].className = 'radio-look4';
    else span[i].className = 'radio-look3';
  }
};
document.getElementById('arrow22').onclick = function () {
  i_video[0]++;
  i_video[1]++;
  i_video[2]++;
  if (i_video[0] > 4) i_video[0] = 0;
  if (i_video[1] > 4) i_video[1] = 0;
  if (i_video[2] > 4) i_video[2] = 0;
  for (let i = 0; i < 3; i++) {
    video[i].src = video_src[i_video[i]];
  }
  for (let i = 0; i < 5; i++) {
    if (i === i_video[0]) span[i].className = 'radio-look4';
    else span[i].className = 'radio-look3';
  }
  for (let i = 0; i < 5; i++) {
    if (i === i_video[0]) span[i].className = 'radio-look4';
    else span[i].className = 'radio-look3';
  }
};
