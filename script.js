function Zaglushka(event) {
  if (event) event.preventDefault();
  alert("Упси! Еще не готово :P");
}

document
  .querySelectorAll(".stub-link")
  .forEach((link) => link.addEventListener("click", Zaglushka));


// ==================================================================================================
const sketchPrice = {
  head: 100,
  half: 100,
  fullbody: 100,
};
const fullshadePrice = {
  head: 500,
  half: 700,
  fullbody: 1000,
};
const colorPrice = {
  head: 200,
  half: 500,
  fullbody: 700,
};
// ==================================================================================================

const terminalContainer = document.getElementById("terminal-text");

function changePrice(pricelist) {
  document.getElementById("headPrice").textContent = pricelist.head + " р.";
  document.getElementById("halfPrice").textContent = pricelist.half + " р.";
  document.getElementById("fullbodyPrice").textContent =
    pricelist.fullbody + " р.";

  terminalPrint(terminalContainer, "Загружены новые цены!!");

  console.log("Загрузила цены прайса " + pricelist.head);
}

function setActiveTab(tab, type) {
  document
    .querySelectorAll(".prices-nav__btn")
    .forEach((btn) => btn.classList.remove("--active"));

  tab.classList.add("--active");

  changePrice(type);
}




// =====================================================================================================================

let terminalIsTyping = false;
function setTypingState(isTyping) {
  terminalIsTyping = isTyping;
  const input = document.querySelector(".terminal-input");
  input.disabled = isTyping;
}

function terminalPrint(container, text) {
  const line = document.createElement("p");
  line.className = "terminal-line";
  container.appendChild(line);

  let i = 0;
  setTypingState(true);

  const print = () => {
    if (i < text.length) {
      line.textContent += text[i];
      i++;
      setTimeout(print, 10);
    } else {
      setTypingState(false);
    }
  };

  print();
  container.scrollTop = container.scrollHeight;
}

document
  .getElementById("terminal-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const input = this.querySelector(".terminal-input");

    const text = "ТЫ -> " + input.value;
    terminalPrint(terminalContainer, text);

    input.value = "";
  });

// ===============
// по дефолту активна фулшейд вкладка
setActiveTab(document.getElementById("fullshadeBtn"), fullshadePrice);
