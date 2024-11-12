import _ from 'lodash';
/*function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());*/

let items = document.querySelectorAll('.frame');
const radios = document.querySelectorAll('.radio-look3');
const prevButton = document.getElementById('arrow21')
const nextButton = document.getElementById('arrow22')
let currentIndex = 0;

items.push(<iframe class="frame" src="https://www.youtube.com/embed/T65C91rTjn0?si=_Qn_fBSpj6xNOGTA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>);
items.push(<iframe class="frame" src="https://www.youtube.com/embed/VVj-2Jdtl4o?si=qD8JeKHZEh9ZFVQ7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>)

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
