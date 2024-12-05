class Explore{
    constructor() {
        this.dragMe = document.querySelector('.explore__slider');
        this.beforeAfter = document.querySelector('.explore__img-relative');

        this.canvas = document.querySelector('.explore__yellow-div');
        this.canvas_div = document.querySelector('.explore__div-yellow');
        this.img = document.querySelector('.explore__img-after')
        
        this.isDragging = false;
        this.init();
    }

    init() {
        if(this.dragMe !== null) {
            this.applyYellowVeil();
            this.dragMe.addEventListener('mousedown', this.onMouseDown.bind(this));
            document.addEventListener('mouseup', this.onMouseUp.bind(this));
            document.addEventListener('mousemove', this.onMouseMove.bind(this));
            this.dragMe.ondragstart = function() {
                return false;
            };
        }
    }

    onMouseDown(e) {
        this.isDragging = true;
        //this.onMouseMove(e);
    }

    onMouseUp(e) {
        this.isDragging = false;
    }

    onMouseMove(e) {
        if (!this.isDragging) return;

        const rect = this.beforeAfter.getBoundingClientRect();
        let offsetX = e.clientX - rect.left;

        // Ограничиваем перемещение ползунка
        if (offsetX < 0) offsetX = 0;
        if (offsetX > rect.width) offsetX = rect.width;

        this.canvas_div.style = 'width:'+offsetX + 'px';
        this.dragMe.style = 'left:'+(offsetX-(this.dragMe.width/2)) + 'px';
    }

    applyYellowVeil() {
        const context = this.canvas.getContext('2d');
    
        // Сохраняем текущее состояние контекста
        context.save();
        
        // Получаем исходные размеры изображения
        const imgWidth = this.img.width;
        const imgHeight = this.img.height;
        
        // Изменяем размеры канваса, чтобы вмещать изображение
        this.canvas.width = imgWidth;
        this.canvas.height = imgHeight;

        // Отрисовываем изображение в полном размере на канвасе
        context.drawImage(this.img, 0, 0, imgWidth, imgHeight);
        
        const imageData = context.getImageData(0, 0, imgWidth, imgHeight);
        const imageDataFiltered = this.yellowVeil(imageData);
        
        context.putImageData(imageDataFiltered, 0, 0);
        
        // Восстанавливаем первоначальное состояние канваса
    }

    yellowVeil(imageData) {
        const pixels = imageData.data;
        for (let i = 0; i < pixels.length; i += 4) {
            // Пример более сложной обработки, чтобы улучшить качество
            const red = Math.min(pixels[i] + 35, 255);
            const green = Math.min(pixels[i + 1] + 25, 255);
            const blue = pixels[i + 2]; // Увеличение синего светит ниже
            pixels[i] = red;
            pixels[i + 1] = green;
            pixels[i + 2] = blue; 
        }
        return imageData;
    }
}

export default {Explore};