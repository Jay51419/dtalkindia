const tabs = document.getElementsByClassName("tab")
const tabContent = document.querySelector(".tab-content")
let activeTab = 0;
const interiorDesign = [
    "assets/1.jpg",
    "assets/2.jpg",
    "assets/3.jpg",
]
const brandDesign = [
    "assets/4.jpg",
    "assets/5.jpg",
    "assets/1.jpg",
    "assets/2.jpg",
]
const turnkeyContract = [
    "assets/3.jpg",
    "assets/4.jpg",
    "assets/2.jpg",
    "assets/1.jpg",
]
const designConsultance = [
    "assets/3.jpg",
    "assets/4.jpg",
    "assets/2.jpg",
    "assets/1.jpg",
    "assets/4.jpg",
    "assets/3.jpg",
]

const changeContent = (type) => {
    tabContent.innerHTML = ""
    for (let src in type) {
        const img = document.createElement("img")
        img.src = type[src]
        tabContent.appendChild(img)
        img.animate([
            { opacity: 0 },
            { opacity: 1 },
        ], {
            duration: 1000 + 200 * src
        })
    }
}
const changeActiveTab = (currentTab) => {
    tabs[activeTab].classList.remove('tab-active')
    tabs[currentTab].classList.add('tab-active');
    activeTab = currentTab
    switch (currentTab) {
        case 0:
            changeContent(interiorDesign)
            break;
        case 1:
            changeContent(brandDesign)
            break;
        case 2:
            changeContent(turnkeyContract)
            break;
        case 3:
            changeContent(designConsultance)
            break;

        default:
            break;
    }

}

changeActiveTab(activeTab)