'use strict';

let slider = document.getElementById('range');
let rangeNum = document.getElementById('range-num');
let fullGrid = document.getElementById('full-grid');

let myCOLOR = document.getElementById('my-color');

let arrowForCOLOR = document.getElementById('arrow-for-color');
let arrowForBLACK = document.getElementById('arrow-for-black');
let arrowForRAINBOW = document.getElementById('arrow-for-rainbow');
let arrowForERASER = document.getElementById('arrow-for-eraser');

let brushCOLOR = document.getElementById('color-brush');
let brushBLACK = document.getElementById('black-brush');
let brushRAINBOW = document.getElementById('rainbow-brush');
let brushERASER = document.getElementById('eraser-brush');

let newSketchBTN = document.getElementById('new-sketch-btn');

let time = document.createElement('div');
let data = document.createElement('div');
let nowData = new Date();

function getWeekDay(weekDay) {
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[weekDay.getDay()];
}

function getMonth(weekDay) {
    let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return month[weekDay.getMonth()];
}

function createData() {
    data.classList.add('data-text');
    document.querySelector('.data').appendChild(data);
    data.innerText = `${getWeekDay(nowData)} ${nowData.getDate()} ${getMonth(nowData)}`;
}

createData()

setInterval(() => {
    data.innerText = `${getWeekDay(nowData)} ${nowData.getDate()} ${getMonth(nowData)}`;
}, 10)

function createTime() {
    time.classList.add('time-text');
    document.querySelector('.time').appendChild(time);
    time.innerText = `${nowData.getHours()} : ${nowData.getMinutes()} : ${nowData.getSeconds()}`;
}

createTime()

setInterval(function () {
    let nowData = new Date();
    time.innerText = `${nowData.getHours()} : ${nowData.getMinutes()} : ${nowData.getSeconds()}`;
}, 1000)





makeGrid(18)
createRangeValue(18)

slider.addEventListener("input", () => {
    let existRow = document.querySelectorAll(".row");
    let rangeValue = document.querySelector(".range-value");

    if (existRow != null && existRow.length != 0) {
        existRow.forEach(element => {
            element.remove();
        });
    }

    if (rangeValue != null) {
        rangeValue.remove();
    }

    makeGrid(slider.value);
    createRangeValue(slider.value);
})

function makeGrid(range) {
    for (let i = 0; i < range; i++) {
        let row = createRow()
        for (let z = 0; z < range; z++) {
            createElement(row);
        };
    }

    function createRow() {
        let row = document.createElement('div');
        row.className = "row";
        fullGrid.appendChild(row);
        return row
    }

    function createElement(row) {
        let elem = document.createElement('div');
        elem.className = "elem";
        row.appendChild(elem);
    }
}

function createRangeValue(range) {
    let rangeValue = document.createElement('p');
    rangeValue.className = 'range-value';
    rangeValue.innerText = `${range} X ${range}`;
    rangeNum.appendChild(rangeValue);
    return rangeValue;
}

let mouseDown = 0;
document.body.onmousedown = function () {
    mouseDown = 1;
}
document.body.onmouseup = function () {
    mouseDown = 0;
}


function makeColorElem(e) {
    if (mouseDown == 1) {
        let activElem = e.target;
        activElem.style.backgroundColor = myCOLOR.value;
    }
}

function makeBlackElem(e) {
    if (mouseDown == 1) {
        let activElem = e.target;
        activElem.style.backgroundColor = "#000000";
    }
}

function makeRainbowElem(e) {
    if (mouseDown == 1) {
        let activElem = e.target;
        activElem.style.backgroundColor = '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase();
    }
}

function makeCleanElem(e) {
    if (mouseDown == 1) {
        let activElem = e.target;
        activElem.getAttribute("style");
        activElem.removeAttribute("style");
    }
}

let activeBTN = 0;

brushCOLOR.addEventListener('click', () => {
    arrowForBLACK.classList.remove('arrow');
    arrowForRAINBOW.classList.remove('arrow');
    arrowForERASER.classList.remove('arrow');
    arrowForCOLOR.classList.add('arrow');
    activeBTN = 1
})

brushBLACK.addEventListener('click', () => {
    arrowForCOLOR.classList.remove('arrow');
    arrowForRAINBOW.classList.remove('arrow');
    arrowForERASER.classList.remove('arrow');
    arrowForBLACK.classList.add('arrow');
    activeBTN = 2
})

brushRAINBOW.addEventListener('click', () => {
    arrowForCOLOR.classList.remove('arrow');
    arrowForBLACK.classList.remove('arrow');
    arrowForERASER.classList.remove('arrow');
    arrowForRAINBOW.classList.add('arrow');
    activeBTN = 3
})

brushERASER.addEventListener('click', () => {
    arrowForCOLOR.classList.remove('arrow');
    arrowForBLACK.classList.remove('arrow');
    arrowForRAINBOW.classList.remove('arrow');
    arrowForERASER.classList.add('arrow');
    activeBTN = 4
})

fullGrid.addEventListener('mouseover', (e) => {
    switch (activeBTN) {
        case (1):
            makeColorElem(e);
            break;
        case (2):
            makeBlackElem(e);
            break;
        case (3):
            makeRainbowElem(e)
            break;
        case (4):
            makeCleanElem(e);
            break;
        default:
            return null;
    }
});

newSketchBTN.addEventListener('click', () => {
    let elem = document.querySelectorAll('.elem');
    elem.forEach(item => {
        item.getAttribute("style");
        item.removeAttribute("style");
    });

    newSketchBTN.classList.add("new-sketch-btn-active");
    setTimeout(() => { newSketchBTN.classList.remove("new-sketch-btn-active"); }
        , 500)
})

