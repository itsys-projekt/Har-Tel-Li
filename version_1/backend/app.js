document.querySelector('#prev').addEventListener('click', () => {
    slideShow.functions.plusDivs(-1);
});

document.querySelector('#next').addEventListener('click', () => {
    slideShow.functions.plusDivs(1);
});

const slideShow = {
    variables: {
        slideIndex: 1,
        images: document.querySelectorAll('.images'),
        dots: document.querySelectorAll('.dot')
    },

    functions: {
        plusDivs: num => {
            slideShow.functions.showDivs(slideShow.variables.slideIndex += num);
        },

        showDivs: num => {
            num > slideShow.variables.images.length ? slideShow.variables.slideIndex = 1 : null;
            num < 1 ? slideShow.variables.slideIndex = slideShow.variables.images.length : null;

            for (let i = 0; i < slideShow.variables.images.length; i++) {
                slideShow.variables.images[i].style.display = 'none';
            }

            for (let i = 0; i < slideShow.variables.dots.length; i++) {
                slideShow.variables.dots[i].className = slideShow.variables.dots[i].className.replace(" active", "");
            }
            slideShow.variables.images[slideShow.variables.slideIndex - 1].style.display = 'block';
            slideShow.variables.dots[slideShow.variables.slideIndex - 1].className += " active";
        },

        currentSlide: num => {
            slideShow.functions.showDivs(slideShow.variables.slideIndex = num);
        }
    }
};
slideShow.functions.showDivs(4);