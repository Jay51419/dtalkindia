AOS.init();
window.addEventListener('load', AOS.refresh)
window.onload = () =>{
    ripple.classList.add("d-none")
}
let Extrapolate;
(function (Extrapolate) {
    Extrapolate[Extrapolate["extend"] = 0] = "extend";
    Extrapolate[Extrapolate["clamp"] = 1] = "clamp";
    Extrapolate[Extrapolate["clampStart"] = 2] = "clampStart";
    Extrapolate[Extrapolate["clampEnd"] = 3] = "clampEnd";
})(Extrapolate || (Extrapolate = {}));

class Interpolate {
    constructor(inputRange, outputRage, extrapolate) {
        this._x = inputRange;
        this._y = outputRage;
        this.extrapolate = extrapolate;
    }
    /// execute the interpolation in the range
    /// if the interpolation is clamped the return value will not be extended
    eval(val) {
        if (val <= this._x[0]) {
            if (this.extrapolate == Extrapolate.clampStart ||
                this.extrapolate == Extrapolate.clamp) {
                return this._y[0];
            }
            else {
                return this._interpolateLine([this._x[0], this._x[1]], [this._y[0], this._y[1]], val);
            }
        }
        else {
            for (var i = 0; i < this._x.length; i++) {
                if (val < this._x[i]) {
                    return this._interpolateLine([this._x[i - 1], this._x[i]], [this._y[i - 1], this._y[i]], val);
                }
                if (val == this._x[i]) {
                    return this._y[i];
                }
            }
            if (val > this._x[this._x.length - 1]) {
                if (this.extrapolate == Extrapolate.clamp ||
                    this.extrapolate == Extrapolate.clampEnd) {
                    return this._y[this._y.length - 1];
                }
                else {
                    var i = this._x.length - 1;
                    return this._interpolateLine([this._x[i - 1], this._x[this._x.length - 1]], [this._y[i - 1], this._y[this._y.length - 1]], val);
                }
            }
        }
        return 0;
    }
    _interpolateLine(x, y, val) {
        var x0 = x[0];
        var x1 = x[1];
        var y0 = y[0];
        var y1 = y[1];
        var _val = y0 + (val - x0) * ((y1 - y0) / (x1 - x0));
        return _val;
    }
}



let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.querySelector("header").style.top = "0";
    } else {
        document.querySelector("header").style.top = "-100px";
    }
    prevScrollpos = currentScrollPos;
}


const menuIcon = document.querySelector(".menu-icon")
const menu = document.querySelector(".menu")
const ripple = document.querySelector(".ripple-wrapper");
menuIcon.addEventListener("click", () => toggleMenu())

const toggleMenu = () => {
    menuIcon.classList.toggle("active")
    menu.classList.toggle("menu-active")
}

const cursor = document.getElementsByClassName('cursor');
const $bigBall = document.querySelector('.cursor__ball--big');
const $smallBall = document.querySelector('.cursor__ball--small');
const $hoverables = document.querySelectorAll('.hoverable');

// const tap = document.createElement("span")
// tap.innerHTML = "Tap"
// tap.classList.add("tap")

// Listener
document.body.addEventListener('mousemove', onMouseMove);
for (let i = 0; i < $hoverables.length; i++) {
    $hoverables[i].addEventListener('mouseenter',onMouseHover);
    $hoverables[i].addEventListener('mouseleave',onMouseHoverOut);
}

// Move the cursor
function onMouseMove(e) {
    TweenMax.to($bigBall, .4, {
        x: e.clientX - 15,
        y: e.clientY - 15
    })
    TweenMax.to($smallBall, .1, {
        x: e.clientX - 5,
        y: e.clientY - 7
    })
}



// Hover an element
function onMouseHover(e) {
    TweenMax.to($bigBall, .3, {
       scale:5
    })

}
function onMouseHoverOut() {
    TweenMax.to($bigBall, .3, {
        scale: 1
    })
}


document.getElementById("logo").addEventListener("click", e => {
    window.scrollTo(0, 0)
})


if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    // some code..
    cursor[0].remove()
    
}