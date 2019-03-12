//For the slideable Pictures

var container = document.querySelector('.container');
N = container.children.length;

var i = 0,
    x0 = null,
    locked = false;

function unify(e) {
    return e.changedTouches ? e.changedTouches[0] : e;
}

function lock(e) {
    x0 = unify(e).clientX;

    container.classList.toggle('smooth', !(locked = true));
}

function drag(e) {
    e.preventDefault();

    if (locked) {
        container.style.setProperty('--tx', ''.concat(Math.round(unify(e).clientX - x0), 'px'));
    }
}

function move(e) {
    if (locked) {
        let dx = unify(e).clientX - x0,
            s = Math.sign(dx);
        if ((i > 0 || s < 0) && (i < N - 1 || s > 0)) container.style.setProperty('--i', i -= s);

        container.style.setProperty('--tx', '0px');

        container.classList.toggle('smooth', !(locked = false));

        x0 = null;
    }
}

container.style.setProperty('--n', N);

container.addEventListener('mousedown', lock, false);

container.addEventListener('touchstart', lock, false);

container.addEventListener('mousemove', drag, false);

container.addEventListener('touchmove', drag, false);

container.addEventListener('mouseup', move, false);

container.addEventListener('touchend', move, false);

function newPic10Sec() {
    var timeleft = 10;
    var iMax = document.querySelectorAll("div.picDiv").length;

    if (timeleft == 10) {
        var timer = setInterval(function () {
            timeleft -= 1;

            if (timeleft <= 0) {
                //console.log("nächstes Bild");
                if (i < iMax) {
                    container.style.setProperty('--i', i++);
                    container.classList.toggle('smooth', !(locked = false));
                } else if (i = iMax) {
                    container.style.setProperty('--i', i = 0);
                    container.classList.toggle('smooth', !(locked = false));
                }

                clearInterval(timer);
                newPic10Sec();
            }

            console.log(timeleft);
        }, 1000);

    }
}
newPic10Sec();


//For StarRating
class StarRating extends HTMLElement {
    get value() {
        return this.getAttribute('value') || 0;
    }

    set value(val) {
        this.setAttribute('value', val);
        this.highlight(this.value - 1);
    }

    get number() {
        return this.getAttribute('number') || 5;
    }

    set number(val) {
        this.setAttribute('number', val);

        this.stars = [];

        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }

        for (let i = 0; i < this.number; i++) {
            let s = document.createElement('div');
            s.className = 'star';
            this.appendChild(s);
            this.stars.push(s);
        }

        this.value = this.value;
    }

    highlight(index) {
        this.stars.forEach((star, i) => {
            star.classList.toggle('full', i <= index);
        });
    }

    constructor() {
        super();

        this.number = this.number;

        this.addEventListener('mousemove', e => {
            let box = this.getBoundingClientRect(),
                starIndex = Math.floor((e.pageX - box.left) / box.width * this.stars.length);

            this.highlight(starIndex);
        });

        this.addEventListener('mouseout', () => {
            this.value = this.value;
        });

        this.addEventListener('click', e => {
            let box = this.getBoundingClientRect(),
                starIndex = Math.floor((e.pageX - box.left) / box.width * this.stars.length);

            this.value = starIndex + 1;

            let rateEvent = new Event('rate');
            this.dispatchEvent(rateEvent);
        });
    }
}

customElements.define('x-star-rating', StarRating);
