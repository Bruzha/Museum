console.log('Hello');
/*
let items = document.querySelectorAll('.frame');
const radios = document.querySelectorAll('.radio-look3');
const prevButton = document.getElementById('arrow21')
const nextButton = document.getElementById('arrow22')
let currentIndex = 0;

items.push(<iframe width="560" height="315" class="frame" src="https://www.youtube.com/embed/T65C91rTjn0?si=_Qn_fBSpj6xNOGTA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>);
items.push(<iframe width="560" height="315" class="frame" src="https://www.youtube.com/embed/VVj-2Jdtl4o?si=qD8JeKHZEh9ZFVQ7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>)

function updateCarousel() {
    const offset = -currentIndex * 100;
    document.querySelector('.carousel-inner').style.transform = translateX(${offset}%);

    radios.forEach((radio, index) => {
        radio.checked = index === currentIndex;
    });
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
});

// Чтобы переключение работало при клике на радио-кнопки
radios.forEach((radio, index) => {
    radio.addEventListener('change', () => {
        if (radio.checked) {
            currentIndex = index;
            updateCarousel();
        }
    });
});

***

var i = 4;
var i2 = 0;
var i3 = 1;
var i4 = 2;
var i5 = 3;
var src = new Array(
  'https://www.youtube.com/embed/aWmJ5DgyWPI?si=H85tY1qiikp8xfTx',
  'https://www.youtube.com/embed/Vi5D6FKhRmo?si=WhHSVVS17bNR0Rx9',
  'https://www.youtube.com/embed/NOhDysLnTvY?si=5t7R4CF4vOVp_k1n',
  'https://www.youtube.com/embed/T65C91rTjn0?si=N2SCaJZECn2RjIiI',
  'https://www.youtube.com/embed/VVj-2Jdtl4o?si=2eQCWj_A3kqzbJEu'
);
var color = new Array(
  'background-color: rgba(51, 51, 51, 1);',
  'background-color: rgba(153, 153, 153, 1);',
  'background-color: rgba(153, 153, 153, 1);',
  'background-color: rgba(153, 153, 153, 1);',
  'background-color: rgba(153, 153, 153, 1);'
);
function changeVideo() {
  let span21 = document.getElementById('span21');
  let span22 = document.getElementById('span22');
  let span23 = document.getElementById('span23');
  let span24 = document.getElementById('span24');
  let span25 = document.getElementById('span25');
  let frame1 = document.getElementById('frame1');
  let frame2 = document.getElementById('frame2');
  let frame3 = document.getElementById('frame3');
  i++;
  i2++;
  i3++;
  i4++;
  i5++;
  if (imgs[i] === undefined) {
    i = 0;
  }
  if (imgs[i2] === undefined) {
    i2 = 0;
  }
  if (imgs[i3] === undefined) {
    i3 = 0;
  }
  if (imgs[i4] === undefined) {
    i4 = 0;
  }
  if (imgs[i5] === undefined) {
    i5 = 0;
  }

  span21.style = color[i2];
  span22.style = color[i3];
  span23.style = color[i];
  span24.style = color[i5];
  span25.style = color[i];
  frame1.src = src[3];
}
function changeImg2() {
  let image1 = document.getElementById('image1');
  let image2 = document.getElementById('image2');
  let image3 = document.getElementById('image3');
  let r1 = document.getElementById('r1');
  let r2 = document.getElementById('r2');
  let r3 = document.getElementById('r3');
  i++;
  i2++;
  i3++;
  if (imgs[i] === undefined) {
    i = 0;
  }
  if (imgs[i2] === undefined) {
    i2 = 0;
  }
  if (imgs[i3] === undefined) {
    i3 = 0;
  }
  image1.style = imgs[i3];
  image1.innerHTML = text[i3];
  r1.style = color[i3];
  image2.style = imgs[i2];
  image2.innerHTML = text[i2];
  r2.style = color[i2];
  image3.style = imgs[i];
  image3.innerHTML = text[i];
  r3.style = color[i];
}*/
