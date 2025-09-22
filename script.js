function Zaglushka(event) {
  if (event) event.preventDefault();
  alert("Упси! Еще не готово :P");
}

document
  .querySelectorAll(".stub-link")
  .forEach((link) => link.addEventListener("click", Zaglushka));
// ==================================================================================================
function setTimeDate() {
  let datetime = new Date();

  document.getElementById("clockTime").innerHTML =
    datetime.toLocaleTimeString();
  document.getElementById("clockDate").innerHTML =
    datetime.toLocaleDateString();
}
// setTimeDate()
setInterval(setTimeDate, 1000);
// ==================================================================================================
// новости

class NewsPost {
  constructor(title, text) {
    this.title = title;
    this.text = text;
  }
}

// ==================================================================================================
const sketchPrice = {
  head: 100,
  half: 100,
  fullbody: 100,
};
const colorPrice = {
  head: 250,
  half: 500,
  fullbody: 700,
};
const fullshadePrice = {
  head: 300,
  half: 600,
  fullbody: 900,
};

const answersList = [
  {
    keywords: ["привет", "прив", "здравствуй", "здравствуйте"],
    answer: "ПРИ3Е7 !!! ",
  },
  {
    keywords: ["сколько времени", "сегодня", "время"],
    answer: "ТЕКУЩ33 ВР3МЯ:" + new Date() + ". ",
  },

  {
    keywords: ["хоумстак", "джон эгберт", "джон эггберт", "дейв страйдер"],
    answer: "леша ацтань со своим хоумстаком.",
  },
  {
    keywords: ["silly", "силли", "причуда", "причудливая"],
    answer: "am i not причудливая? ",
  },
  {
    keywords: ["отель", "отели", "отель"],
    answer:
      "Я просто ОБОЖАЮ отели. Если это еще не понятно по моим персонажкам и сеттингам. Одни из моих любимых фильмов это 'Гранд Отель Будапешт' и  'Четыре Комнаты'. ",
  },
  {
    keywords: ["Сколько тебе лет", "твой возраст", "скока те лет"],
    answer: "Я не ра3глашаю такую информацию, но ты мож3шь угадать......",
  },
  // {
  //   keywords: ["возраст"],
  //   answer: "....ч3й возраст",
  // },
  {
    keywords: ["жопа", "попа", "хуй", "пизда"],
    answer: "Не матюкайс.",
  },
  {
    keywords: ["яблоко"],
    answer: "https://youtu.be/sxKVflJe0ac?list=RDsxKVflJe0ac. ",
  },
  {
    keywords: ["пока", "досвидания", "досвидание"],
    answer: "ДО СКОРОЙ ВСТРЕ4И !!! ",
  },
  {
    keywords: ["Паллия", "Paylia"],
    answer: "Паллия - моя персонажка по World of Warcraft. ",
  },
  {
    keywords: ["табуретка"],
    answer: "Табуретка - моя персонажка по World of Warcraft. ",
  },
  {
    keywords: ["корь", "корью"],
    answer: "Корь - моя персонажка по World of Warcraft. ",
  },
   {
    keywords: ["швейцарка","швейцарку","швейцарки","швейцарке"],
    answer: "Швейцарка - моя персонажка из сеттинга Отель1316, почитать про который можно чуточку ниже в разделе Проекты. " ,
  },
  {
    keywords: ["юри","yuri"],
    answer: "gosh i love yuri. " ,
  },
   {
    keywords: ["яой","yaoi"],
    answer: "gosh i love yaoi. " ,
  },
];

// МЕТОД ПЕЧАТИ ТЕРМИНАЛА ================================================================================================================
const terminalContainer = document.getElementById("terminal-text");

const terminalPrintQueue = [];
let terminalIsTyping = false;

// менять значение статуса печати и дисейблить инпут пока печатает
function setTypingState(state) {
  terminalIsTyping = state;
  const input = document.querySelector(".terminal-input");
  input.disabled = state;
}

async function terminalPrint(terminalContainer, text, style) {
  while (terminalIsTyping) {
    await new Promise((resolve) => setTimeout(resolve, 10));
  }

  setTypingState(true);

  try {
    await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5 секунды

    const line = document.createElement("p");
    line.classList.add("terminal-line", style);
    terminalContainer.appendChild(line);

    await new Promise((resolve) => {
      let i = 0;
      const print = () => {
        if (i < text.length) {
          line.textContent += text[i];
          i++;
          setTimeout(print, 10);
        } else {
          terminalContainer.scrollTop = terminalContainer.scrollHeight;
          resolve(false);
        }
      };

      print();
    });
  } finally {
    setTypingState(false);
  }
}

// ловит инпут и запускает чекинг ответа
document
  .getElementById("terminal-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const input = this.querySelector(".terminal-input");

    const text = "ТЫ -> " + input.value;
    terminalPrint(terminalContainer, text, "--user-text");
    checkAnswer(text);

    input.value = "";
  });

// TODO: ЗАПРЕТИТЬ ВВОД ЕСЛИ ПУСТОЕ ПОЛЕ ВВОДЯ
function checkAnswer(text) {
  let finalLine = "";

  let formatedInput = text.toLowerCase().trim();
  console.log("форматнула ввод:", formatedInput);

  // answersList.forEach(element => {
  //   console.log(element)
  // });

  answersList.forEach((item) => {
    const found = item.keywords.some((keyword) =>
      formatedInput.includes(keyword)
    );

    if (found) {
      console.log(found);
      finalLine = finalLine + " " + item.answer;
      console.log(finalLine);
    } else {
      console.log("Ключевого слова в этом массиве не нашла");
    }
  });
  console.log("Итоговый ответ:" + finalLine);

  let aswerForChat = finalLine <= 0 ? "Незнаю как ответить...." : finalLine;

  terminalPrint(terminalContainer, aswerForChat);
}

// ЦЕНЫ И ПРАЙСЛИСТ ===============================================
// по дефолту активна фулшейд вкладка
setActiveTab(document.getElementById("fullshadeBtn"), fullshadePrice);

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
