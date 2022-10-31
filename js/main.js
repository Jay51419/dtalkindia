window.onload = () => {
    document.querySelector(".scroll-wrapper").style.height = "100vh"
    ripple.classList.add("d-none")
}

class DisableScrollPlugin extends Scrollbar.ScrollbarPlugin {
    static pluginName = 'disableScroll';

    static defaultOptions = {
        direction: "x",
    };

    transformDelta(delta) {
        if (this.options.direction) {
            delta[this.options.direction] = 0;
        }

        return { ...delta };
    }
}
Scrollbar.use(DisableScrollPlugin)
window.Scrollbar.init(document.querySelector(".scroll-wrapper"), {
    damping: 0.07,
    syncCallbacks: true,
});



Scrollbar.getAll()[0].track.xAxis.element.remove();
let offset ={x:0,y:0}

let {y: prevScrollY} = Scrollbar.getAll()[0].offset

function toggleHeaderOnScroll(x, y) {
    const header = document.querySelector("header")
    // header.style.left = x + 'px';
    header.style.top = y + 'px';
    let currentScrollPos = y;
    if (prevScrollY > currentScrollPos) {
        header.style.opacity = "1"
    } else {
        header.style.opacity = "0"

    }
    prevScrollY = currentScrollPos;
}
const whatsapp = document.querySelector(".whatsapp")
Scrollbar.getAll()[0].addListener(function (status) {
    offset = status.offset
    toggleHeaderOnScroll(offset.x,offset.y,prevScrollY)

})



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

document.body.addEventListener('mousemove', onMouseMove);
for (let i = 0; i < $hoverables.length; i++) {
    $hoverables[i].addEventListener('mouseenter', onMouseHover);
    $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
}


// Move the cursor
function onMouseMove(e) {
    const x = e.clientX
    const y = e.clientY + offset.y
    TweenMax.to($bigBall, .4, {
        x: x - 15,
        y: y - 15
    })
    TweenMax.to($smallBall, .1, {
        x: x - 5,
        y: y - 7
    })
}


// Hover an element
function onMouseHover(e) {
    TweenMax.to($bigBall, .3, {
        scale: 5
    })

}

function onMouseHoverOut() {
    TweenMax.to($bigBall, .3, {
        scale: 1
    })
}


if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // some code..
    cursor[0].remove()

}


const contactBtn = document.querySelector("#contactBtn")
const contact = document.querySelector("#contact")
contactBtn.addEventListener("click",()=>{
    const contactY = contact.offsetTop
    console.log(contactY)
    menuIcon.classList.toggle("active")
    menu.classList.toggle("menu-active")
    Scrollbar.getAll()[0].scrollTo(0,contactY,500)
})
