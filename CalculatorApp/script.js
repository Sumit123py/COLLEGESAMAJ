const Items = document.querySelectorAll(".item");
const question = document.getElementById("question_id");
const answer = document.getElementById("answer_id");
const calculate = document.querySelector(".item19");
const slider = document.querySelectorAll(".slider");
const current_nav = document.querySelectorAll(".nav_to");
const screens = document.querySelector(".screens");
const container = document.querySelector(".container");
const main_container = document.querySelector(".main_container");
const deleteItem = document.querySelector(".item2");
const clearAll = document.querySelector(".item1");
const history_list = document.querySelector(".history_list");

Items.forEach(
  (item) =>
    (item.onclick = () => {
      if (question.innerHTML.length <= 15) {
        question.innerHTML += item.innerText;
      }
      else{
        alert('You have reached character Limit')
      }

      if (
        /[*-+/%]/.test(question.innerHTML) &&
        answer.innerHTML.length <= 25 &&
        question.innerText.length > 0
      ) {
        answer.innerHTML = eval(question.innerHTML);
      }
    })
);

deleteItem.onclick = () => {
  if (question.innerHTML.length > 0) {
    question.innerHTML = question.innerHTML.slice(0, -1);
  }

  if (answer.innerHTML.length <= 25) {
    answer.innerHTML =
      question.innerHTML.length > 0 ? eval(question.innerHTML) : "";
  }
};

clearAll.onclick = () => {
  question.innerHTML = "";
  answer.innerHTML = "";
};

calculate.onclick = () => {
  if (answer.innerHTML.length <= 25) {
    answer.innerHTML = eval(question.innerHTML);
  }

  history_list.insertAdjacentHTML(
    "beforeend",
    `
  <div class="history_items">
                        <p class="question_item">${question.innerHTML}</p>
                        <p class="answer_item">${answer.innerHTML}</p>
                    </div>
  `
  );
  const history_items = document.querySelectorAll(".history_items");
  const question_item = document.querySelectorAll(".question_item");
  const answer_item = document.querySelectorAll(".answer_item");
  history_items.forEach(
    (item, i) =>
      (item.onclick = () => {
        question.innerHTML = "";
        answer.innerHTML = "";

        question_item.forEach((queItem, index) => {
          if (i === index) {
            question.innerHTML = queItem.innerHTML;
          }
        });

        answer_item.forEach((ansItem, ind) => {
          if (i === ind) {
            answer.innerHTML = ansItem.innerHTML;
          }
        });

        screens.style.transform = `translateX(0)`;
      })
  );
};

current_nav.forEach(
  (item, index) =>
    (item.onclick = () => {
      const ItemIndex = index;
      const isActive = item.classList.contains("active");

      if (!isActive) {
        current_nav.forEach((navItem) => navItem.classList.remove("active"));
        item.classList.add("active");
      }
      slider.forEach((_, i) => {
        if (ItemIndex === i) {
          screens.style.transform = `translateX(-${ItemIndex * 100}%)`;
        }
      });
    })
);
