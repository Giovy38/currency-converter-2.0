// -------------------------------- SELECT GLOBAL OBJ ------------------------------
const leftContainer = document.getElementById("valute-container-left");
const rightContainer = document.getElementById("valute-container-right");
const leftCurrentCurrency = document.getElementById("left-current-currency");
const rightCurrentCurrency = document.getElementById("right-current-currency");
const leftInput = document.getElementById("left-input");
const rightInput = document.getElementById("right-input");
const switchBtn = document.getElementById("switch-btn");

// -------------------------------- CREATEVALUE WHEN PAGE LOAD ------------------------------
window.addEventListener("load", onLoad);

async function onLoad() {
  // call API to take all currencier
  const host = "api.frankfurter.app";
  const res = await fetch(`https://${host}/currencies`);
  // put the res into a data
  const data = await res.json();

  // create new element for each value

  for (const [key, value] of Object.entries(data)) {
    // create left container

    let newLeftDiv = document.createElement("div");
    let Leftimg = document.createElement("img");
    let smallLeftValue = document.createElement("h3");
    let fullLeftValue = document.createElement("h3");

    newLeftDiv.className =
      "single-container-left valute-container hidden-container hidden-container-left";
    Leftimg.src = "./assets/img/empty dollar.jpeg";
    Leftimg.className = "valute-img";
    smallLeftValue.textContent = `${key}`;
    fullLeftValue.textContent = `${value}`;

    newLeftDiv.appendChild(Leftimg);
    newLeftDiv.appendChild(smallLeftValue);
    newLeftDiv.appendChild(fullLeftValue);

    leftContainer.appendChild(newLeftDiv);

    // create right container

    let newRightDiv = document.createElement("div");
    let Righimg = document.createElement("img");
    let smallRightValue = document.createElement("h3");
    let fullRightValue = document.createElement("h3");

    newRightDiv.className =
      "single-container-right valute-container hidden-container hidden-container-right";
    Righimg.src = "./assets/img/dollar.jpeg";
    Righimg.className = "valute-img";
    smallRightValue.textContent = `${key}`;
    fullRightValue.textContent = `${value}`;

    newRightDiv.appendChild(Righimg);
    newRightDiv.appendChild(smallRightValue);
    newRightDiv.appendChild(fullRightValue);

    rightContainer.appendChild(newRightDiv);
  }
}

// ------------------------SHOW CURRENCIES WHEN CLICK ON THE ICON ----------------------------------------

// show left currencies when click on the icon

const leftIcon = document.getElementById("show-left-icon");
leftIcon.addEventListener("click", showLeftCurrencies);

function showLeftCurrencies() {
  const leftCurrencies = document.querySelectorAll(".hidden-container-left");
  leftCurrencies.forEach((currency) => {
    currency.classList.remove("hidden-container");
    currency.addEventListener("click", selectCurrency);

    function selectCurrency(e) {
      if (e.target.classList.contains("valute-container")) {
        leftCurrentCurrency.children[1].innerHTML =
          e.target.children[1].innerHTML;
        leftCurrentCurrency.children[2].innerHTML =
          e.target.children[2].innerHTML;
      } else {
        leftCurrentCurrency.children[1].innerHTML =
          e.target.parentElement.children[1].innerHTML;
        leftCurrentCurrency.children[2].innerHTML =
          e.target.parentElement.children[2].innerHTML;
      }

      const leftHidden = document.querySelectorAll(".hidden-container-left");
      leftHidden.forEach((hidden) => hidden.classList.add("hidden-container"));
    }
  });
}

// show right currencier when click on the icon

const rightIcon = document.getElementById("show-right-icon");
rightIcon.addEventListener("click", showRightCurrencies);

function showRightCurrencies() {
  const rightCurrencies = document.querySelectorAll(".hidden-container-right");
  rightCurrencies.forEach((currency) => {
    currency.classList.remove("hidden-container");
    currency.addEventListener("click", selectCurrency);

    function selectCurrency(e) {
      if (e.target.classList.contains("valute-container")) {
        rightCurrentCurrency.children[1].innerHTML =
          e.target.children[1].innerHTML;
        rightCurrentCurrency.children[2].innerHTML =
          e.target.children[2].innerHTML;
      } else {
        rightCurrentCurrency.children[1].innerHTML =
          e.target.parentElement.children[1].innerHTML;
        rightCurrentCurrency.children[2].innerHTML =
          e.target.parentElement.children[2].innerHTML;
      }

      const rightHidden = document.querySelectorAll(".hidden-container-right");
      rightHidden.forEach((hidden) => hidden.classList.add("hidden-container"));
    }
  });
}

// -------------- SELECT THE BUTTON TO CALL API AND ASSIGN IT onConvert FUNCTION ----------------------
const btn = document.getElementById("btn-container");
btn.addEventListener("click", onConvert);

async function onConvert() {
  try {
    const host = "api.frankfurter.app";
    const amount = leftInput.value;
    const from = leftCurrentCurrency.children[1].innerHTML;
    const to = rightCurrentCurrency.children[1].innerHTML;

    const res = await fetch(
      `https://${host}/latest?amount=${amount}&from=${from}&to=${to}`
    );
    const data = await res.json();
    rightInput.value = data.rates[to];
    // console.log(rightInput.value);
  } catch {
    alert(`Errore nel caricamento dell'API`);
  }
}

// ------------------- IMPLEMENT SWITH BTN ----------------

switchBtn.addEventListener("click", onSwitch);

function onSwitch() {
  const smallValue = leftCurrentCurrency.children[1].innerHTML;
  const fullValue = leftCurrentCurrency.children[2].innerHTML;

  leftCurrentCurrency.children[1].innerHTML =
    rightCurrentCurrency.children[1].innerHTML;
  leftCurrentCurrency.children[2].innerHTML =
    rightCurrentCurrency.children[2].innerHTML;

  rightCurrentCurrency.children[1].innerHTML = smallValue;
  rightCurrentCurrency.children[2].innerHTML = fullValue;
}
