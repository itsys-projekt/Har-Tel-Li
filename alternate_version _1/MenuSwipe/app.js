//For the slideable Pictures

let _C = document.querySelector('.container');
N = _C.children.length;

let i = 0,
    x0 = null,
    locked = false;

function unify(e) {
    return e.changedTouches ? e.changedTouches[0] : e;
}

function lock(e) {
    x0 = unify(e).clientX;

    _C.classList.toggle('smooth', !(locked = true));
}

function drag(e) {
    e.preventDefault();

    if (locked) {
        _C.style.setProperty('--tx', ''.concat(Math.round(unify(e).clientX - x0), 'px'));
    }
}

function move(e) {
    if (locked) {
        let dx = unify(e).clientX - x0,
            s = Math.sign(dx);
        if ((i > 0 || s < 0) && (i < N - 1 || s > 0)) _C.style.setProperty('--i', i -= s);

        _C.style.setProperty('--tx', '0px');

        _C.classList.toggle('smooth', !(locked = false));

        x0 = null;
    }
}

_C.style.setProperty('--n', N);

_C.addEventListener('mousedown', lock, false);

_C.addEventListener('touchstart', lock, false);

_C.addEventListener('mousemove', drag, false);

_C.addEventListener('touchmove', drag, false);

_C.addEventListener('mouseup', move, false);

_C.addEventListener('touchend', move, false);





//For StarRating
		class StarRating extends HTMLElement {
    get value () {
        return this.getAttribute('value') || 0;
    }

    set value (val) {
        this.setAttribute('value', val);
        this.highlight(this.value - 1);
    }

    get number () {
        return this.getAttribute('number') || 5;
    }

    set number (val) {
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

    highlight (index) {
        this.stars.forEach((star, i) => {
            star.classList.toggle('full', i <= index);
        });
    }

    constructor () {
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




