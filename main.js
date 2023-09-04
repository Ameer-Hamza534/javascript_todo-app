const inputBox = document.getElementById('input-box');
const listContainer = document.querySelector('.list-container');
const addBtn = document.querySelector('.add-btn');
const alertBox = document.querySelector('.alert-box');


// alert message box
function showAlert(message) {
    alertBox.innerHTML = message;
    alertBox.style.opacity = 1;
    setTimeout(() => {
        alertBox.style.opacity = 0;
    }, 2000);
}

function saveData() {
    localStorage.setItem('data', listContainer.innerHTML)
}

function showData() {
    const savedData = localStorage.getItem('data');
            if (savedData) {
                listContainer.innerHTML = savedData;
                addRemoveEventListeners()
            }
}
showData();

// add item to list
addBtn.addEventListener('click', () => {
    let inputValue = inputBox.value;
    if (inputValue === '') {
        showAlert('You must write something!');
    } else {
        let li = document.createElement('li');
        li.classList.add('item');
        li.innerHTML = inputValue;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
        inputBox.value = "";
        saveData()
        showAlert('Item added successfully');
    }
});

function addRemoveEventListeners() {
    listContainer.addEventListener('click', (e) => {
        const target = e.target;
        if (target.tagName === 'LI') {
            target.classList.toggle('checked');
            saveData();
        } else if (target.tagName === 'SPAN') {
            const listItem = target.parentElement;
            listItem.remove();
            saveData();
            showAlert('Item removed successfully');
        }
    });
}

const quoteText = document.getElementById("quote-text");
const text = quoteText.textContent.trim();
quoteText.textContent = ""; // Clear the text content


// Quote typing animation
function typeWriter(text, i) {
    if (i < text.length) {
        quoteText.textContent += text.charAt(i);
        i++;
        setTimeout(() => {
            typeWriter(text, i);
        }, 25);
    }
}

window.onload = () => {
    typeWriter(text, 0);
};
