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
    'Total €' + (cost * count3 + cost * count4).toString();
}
