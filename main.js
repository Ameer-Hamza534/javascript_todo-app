const inputBox = document.getElementById('input-box');
const listContainer = document.querySelector('.list-container');
const addBtn = document.querySelector('.add-btn');
const alertBox = document.querySelector('.alert-box');
const quoteText = document.getElementById("quote-text");
const text = quoteText.textContent; // Remove trim to keep initial content

// alert message box
function showAlert(message) {
    alertBox.innerHTML = message;
    alertBox.style.opacity = 1;
    setTimeout(() => {
        alertBox.style.opacity = 0;
    }, 2000);
}

const saveDataInLocalStorage = () => {
    localStorage.setItem('data', listContainer.innerHTML);
}

function showData() {
    const data = localStorage.getItem('data');
    if (data) {
        listContainer.innerHTML = data;
    }
}

showData();

// ADD DATA
function addItem() {
    let inputValue = inputBox.value;
    if (inputValue === "") {
        showAlert("Please write something!");
    } else {
        const li = document.createElement('li');
        li.className = "item";
        li.textContent = inputValue;
        listContainer.appendChild(li);
        const span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);

        // Clear the input value
        inputBox.value = "";

        saveDataInLocalStorage();
        showAlert('Task Added Successfully');
    }
}

addBtn.addEventListener("click", addItem);

// Listen for the "Enter" key press
inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addItem();
    }
});


// CHECKED DATA AS COMPLETED & REMOVE DATA
listContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "LI") {
        target.classList.toggle("checked");
        saveDataInLocalStorage();
    } else if (target.tagName === "SPAN") {
        target.parentElement.remove();
        saveDataInLocalStorage();
        showAlert('Task Removed Successfully');
    }
});

// Quote typing animation
quoteText.textContent = "";
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
