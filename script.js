let isMouseDown = false;
let newOpacity = 0;
const fullGrid = document.querySelector('.grid-container');
const buttonNewGrid = document.querySelector('.button-new-grid');
const buttonClear = document.querySelector('.button-clear');
const checkboxColor = document.querySelector('.checkbox-color');
const checkboxGray = document.querySelector('.checkbox-gray');

// Create a Grid
function createGrid(number) {
    fullGrid.style.gridTemplateColumns = "repeat(" + number + ", 1fr)";
    fullGrid.style.gridTemplateRows = "repeat(" + number + ", 1fr)";

    for (let i = 0; i < number * number; i++) {
        const gridCell = document.createElement("div");
        gridCell.classList.add('cell');
        fullGrid.appendChild(gridCell);
    }

    changeColor();
}

// Change Grid Color
function changeColor() {
    const cells = document.querySelectorAll('.cell');

    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('mousedown', () => {
            isMouseDown = true;
            if (checkboxColor.checked) {
                cells[i].style.backgroundColor = getRandomColor();
            } else if (checkboxGray.checked) {
                let backgroundColor = getComputedStyle(cells[i]).getPropertyValue('background-color');
                let currentOpacity = parseFloat(backgroundColor.split(',')[3]);
                let newOpacity = currentOpacity + 0.1;
                let newBackgroundColor = backgroundColor.replace(/[^,]+(?=\))/, newOpacity);
                cells[i].style.backgroundColor = newBackgroundColor;
            } else {
                cells[i].style.backgroundColor = 'black';
            }
        })

        cells[i].addEventListener('mouseup', () => {
            isMouseDown = false;
        })

        cells[i].addEventListener('mouseover', () => {
            if (isMouseDown) {
                if (checkboxColor.checked) {
                    cells[i].style.backgroundColor = getRandomColor();
                } else if (checkboxGray.checked) {
                    let backgroundColor = getComputedStyle(cells[i]).getPropertyValue('background-color');
                    let currentOpacity = parseFloat(backgroundColor.split(',')[3]);
                    let newOpacity = currentOpacity + 0.1;
                    let newBackgroundColor = backgroundColor.replace(/[^,]+(?=\))/, newOpacity);
                    cells[i].style.backgroundColor = newBackgroundColor;
                } else {
                    cells[i].style.backgroundColor = 'black';
                }
            }
        })
    }
}

// Get Random Color
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Button Events
buttonNewGrid.addEventListener('click', () => {
    let input = prompt("Enter a number between 16 and 32:");
    if (input >= 16 && input <= 32) {
        createGrid(input);
    } else {
        prompt("Invalid input.");
    }
})

buttonClear.addEventListener('click', () => {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = 'white';
    }
})

checkboxColor.addEventListener('change', () => {
    if (checkboxColor.checked) {
        checkboxGray.checked = false;
    }
})

checkboxGray.addEventListener('change', () => {
    if (checkboxGray.checked) {
        checkboxColor.checked = false;
    }
})

// Create Standard Grid
createGrid(16);