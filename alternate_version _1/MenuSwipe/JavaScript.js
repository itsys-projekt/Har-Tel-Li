function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

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

//var five_star_rating = innerHTML = "<fieldset class='rating'></fieldset>"
//function addStarRatings() {

//    var fieldset = document.createElement("fieldset");
//    fieldset.setAttribute("class", "rating");
//    fieldset.innerHTML = "<input type = 'radio' id = 'star5' name = 'rating' value = '5' /> <label class='full' for='star5' title='Awesome - 5 stars'> </label> <input type='radio' id='star4half' name='rating' value='4 and a half' /> <label class='half' for='star4half' title='Pretty good - 4.5 stars'> </label> <input type='radio' id='star4' name='rating' value='4' /> <label class='full' for='star4' title='Pretty good - 4 stars'> </label><input type='radio' id='star3half' name='rating' value='3 and a half' /> <label class='half' for='star3half' title='Meh - 3.5 stars'> </label> <input type='radio' id='star3' name='rating' value='3' /> <label class='full' for='star3' title='Meh - 3 stars'></label><input type='radio' id='star2half' name='rating' value='2 and a half' /> <label class='half' for='star2half' title='Kinda bad - 2.5 stars'> </label><input type='radio' id='star2' name='rating' value='2' /> <label class='full' for='star2' title='Kinda bad - 2 stars'> </label> <input type='radio' id='star1half' name='rating' value='1 and a half' /> <label class='half' for='star1half' title='Meh - 1.5 stars'> </label> <input type='radio' id='star1' name='rating' value='1' /> <label class='full' for='star1' title='Sucks big time - 1 star'> </label> <input type='radio' id='starhalf' name='rating' value='half' /> <label class='half' for='starhalf' title='Sucks big time - 0.5 stars'> </label> ";
//    var pic = document.getElementsByClassName('picDiv');

//    for (var i = 0; i <= pic.length; i++) {
//        pic[i].append(fieldset);
//    }
    
//}

