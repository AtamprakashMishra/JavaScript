// ALL VARIABLES AND DOC SELECTIONS

const addNote = document.querySelector("#add-note");
const formContainer = document.querySelector(".form-container");
const closeForm = document.querySelector(".closeForm");

const stack = document.querySelector(".stack");
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");

const form = document.querySelector("form");

const imageUrlInput = form.querySelector(
  "input[placeholder='https://example.com/photo.jpg']"
);

const fullNameInput = form.querySelector(
  "input[placeholder='Enter full name']"
);

const homeTownInput = form.querySelector(
  "input[placeholder='Enter home town']"
);

const purposeInput = form.querySelector(
  "input[placeholder='e.g., Quick appointment note']"
);

const categoryRadios = form.querySelectorAll(
  "input[name='category']"
);

// ======================
// SAVE DATA IN LOCAL STORAGE
// ======================

function saveToLocalStorage(obj) {
  let oldTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  oldTasks.push(obj);

  localStorage.setItem("tasks", JSON.stringify(oldTasks));
}

// ======================
// OPEN FORM
// ======================

addNote.addEventListener("click", function () {
  formContainer.style.display = "initial";
});

// ======================
// CLOSE FORM
// ======================

closeForm.addEventListener("click", function () {
  formContainer.style.display = "none";
});

// ======================
// FORM SUBMIT
// ======================

form.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const imageUrl = imageUrlInput.value.trim();
  const fullName = fullNameInput.value.trim();
  const homeTown = homeTownInput.value.trim();
  const purpose = purposeInput.value.trim();

  let selected = "";

  categoryRadios.forEach(function (cat) {
    if (cat.checked) {
      selected = cat.value;
    }
  });

  // VALIDATIONS

  if (imageUrl === "") {
    alert("Please enter an Image URL.");
    return;
  }

  if (fullName === "") {
    alert("Please enter your Full Name.");
    return;
  }

  if (homeTown === "") {
    alert("Please enter your Home Town.");
    return;
  }

  if (purpose === "") {
    alert("Please enter the Purpose.");
    return;
  }

  if (selected === "") {
    alert("Please select a category.");
    return;
  }

  // SAVE OBJECT

  saveToLocalStorage({
    imageUrl,
    fullName,
    homeTown,
    purpose,
    selected,
  });

  // RESET FORM

  form.reset();

  formContainer.style.display = "none";

  // SHOW UPDATED CARDS

  showCards();
});

// ======================
// SHOW CARDS
// ======================

function showCards() {
  stack.innerHTML = "";

  let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  allTasks.forEach(function (task) {
    // CARD

    const card = document.createElement("div");
    card.classList.add("card");

    // IMAGE

    const avatar = document.createElement("img");

    avatar.src = task.imageUrl;
    avatar.alt = "profile";
    avatar.classList.add("avatar");

    card.appendChild(avatar);

    // NAME

    const name = document.createElement("h2");

    name.textContent = task.fullName;

    card.appendChild(name);

    // HOMETOWN INFO

    const hometownInfo = document.createElement("div");
    hometownInfo.classList.add("info");

    const hometownLabel = document.createElement("span");
    hometownLabel.textContent = "Home Town";

    const hometownValue = document.createElement("span");
    hometownValue.textContent = task.homeTown;

    hometownInfo.appendChild(hometownLabel);
    hometownInfo.appendChild(hometownValue);

    card.appendChild(hometownInfo);

    // PURPOSE INFO

    const purposeInfo = document.createElement("div");
    purposeInfo.classList.add("info");

    const purposeLabel = document.createElement("span");
    purposeLabel.textContent = "Purpose";

    const purposeValue = document.createElement("span");
    purposeValue.textContent = task.purpose;

    purposeInfo.appendChild(purposeLabel);
    purposeInfo.appendChild(purposeValue);

    card.appendChild(purposeInfo);

    // BUTTONS DIV

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    // CALL BUTTON

    const callBtn = document.createElement("button");

    callBtn.classList.add("call");

    callBtn.innerHTML = `<i class="ri-phone-line"></i> Call`;

    // MESSAGE BUTTON

    const msgBtn = document.createElement("button");

    msgBtn.classList.add("msg");

    msgBtn.textContent = "Message";

    // APPEND BUTTONS

    buttonsDiv.appendChild(callBtn);
    buttonsDiv.appendChild(msgBtn);

    // APPEND BUTTON DIV TO CARD

    card.appendChild(buttonsDiv);

    // APPEND CARD TO STACK

    stack.appendChild(card);
  });

  // UPDATE STACK STYLE

  updateStack();
}

// ======================
// UPDATE STACK
// ======================

function updateStack() {
  const cards = document.querySelectorAll(".stack .card");

  cards.forEach(function (card, i) {
    if (i < 3) {
      card.style.zIndex = 3 - i;

      card.style.transform = `
        translateY(${i * 10}px)
        scale(${1 - i * 0.03})
      `;

      card.style.opacity = `${1 - i * 0.1}`;

      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// ======================
// UP BUTTON
// ======================

upBtn.addEventListener("click", function () {
  const lastChild = stack.lastElementChild;

  if (lastChild) {
    stack.insertBefore(lastChild, stack.firstElementChild);

    updateStack();
  }
});

// ======================
// DOWN BUTTON
// ======================

downBtn.addEventListener("click", function () {
  const firstChild = stack.firstElementChild;

  if (firstChild) {
    stack.appendChild(firstChild);

    updateStack();
  }
});

// ======================
// INITIAL CALL
// ======================

showCards();