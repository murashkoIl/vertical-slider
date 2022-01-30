// Использовал эту реализацию слайдера, так как она не является сложной
// и все здесь интуитивно понятно 
// Реализовано пролистывание слайдов с помощью свайпа(проверять нужно
// переключив на мобильный режим)
// Слайды переключаются раз в 5 секунд автоматически
const sliderContainer = document.querySelector('.slider-container');
const slideRight = document.querySelector('.right-slide');
const slideLeft = document.querySelector('.left-slide');
const upButton = document.querySelector('.up-button');
const downButton = document.querySelector('.down-button');
const slidesLength = slideRight.querySelectorAll('div').length;
let activeSlideIndex = 0;
let y1 = null;
let y2 = null;
let dragX = null;

slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`;
console.log(slideLeft);

upButton.addEventListener('click', () => changeSlide('up'));
downButton.addEventListener('click', () => changeSlide('down'));

sliderContainer.addEventListener('touchstart', handleTouchStart, false);
sliderContainer.addEventListener('touchmove', handleTouchMove, false);

sliderContainer.addEventListener('mousedown', (event => {
    slideRight.style.cursor = 'grabbing';
    slideLeft.style.cursor = 'grabbing';
    y1 = event.offsetY;
}));
sliderContainer.addEventListener('mouseenter', (event => {sliderContainer.style.cursor = 'grab';}));


slideRight.addEventListener('mouseup', event => {
    slideRight.style.cursor = 'grab';
    y2 = event.offsetY;
    let yDiff = y2 - y1;
    if(yDiff == 0){
        return;
    } else if(yDiff > 0){
        changeSlide('down')
    } else {
        changeSlide('up');
    }
    y1 = null;
    y2 = null;
});

slideLeft.addEventListener('mouseup', event => {
    slideLeft.style.cursor = 'grab';
    y2 = event.offsetY;
    let yDiff = y2 - y1;
    if(yDiff == 0){
        return;
    } else if(yDiff > 0){
        changeSlide('down')
    } else {
        changeSlide('up');
    }
    y1 = null;
    y2 = null;
});

const changeSlide = function(direction){
    const sliderHeight = sliderContainer.clientHeight;
    if(direction === 'up'){
        activeSlideIndex++;
        if(activeSlideIndex > slidesLength - 1) activeSlideIndex = 0;
    } else if(direction === 'down'){
        activeSlideIndex--;
        if(activeSlideIndex < 0) activeSlideIndex = slidesLength - 1;
    }
    slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
    slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
    console.log(activeSlideIndex, slidesLength);
}

function handleTouchStart(event){
    const firstTouch = event.touches[0];
    y1 = firstTouch.clientY;
}

function handleTouchMove(event){
    if(!y1) return false;
    let y2 = event.touches[0].clientY;
    let yDiff = y2 - y1;
    if(yDiff > 0){
        changeSlide('down');
    } else{
        changeSlide('up')
    }
    y1 = null;
}

/*setInterval(function(){
    changeSlide('down');
}, 5000);
*/

