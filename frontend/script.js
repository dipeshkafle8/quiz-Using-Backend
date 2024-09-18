import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "AIzaSyCtG-1OI63dz-acmwk688bedTLhqiCNW2Y";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const question = document.getElementById("questions");
const answer = document.getElementById("answer");
const response = document.getElementById("response");
const submit = document.getElementById("submit");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let index = 0;
let totalQuestions = 0;
let Questions;

function displayQuestionsOnUI() {
  question.innerText = "";
  const h1 = document.createElement("h1");
  h1.innerText = `${index + 1}) ${Questions[index].question}`;

  question.append(h1);
}

function displayResponseOnUI(result) {
  response.innerText = result;
}

async function handleOnSubmit() {
  let value = answer.value.trim();
  console.log(value);
  if (value == "") {
    alert("Give ans before submitting");
  } else {
    let result = await model.generateContent(
      `${question.innerText}\n Answer:${value} Evaluate this correct or incorrect answer and provide response in 2 lines`
    );
    let temp = result.response.text();
    displayResponseOnUI(temp);
  }
}

function handleIndexOnPrev() {
  if (index === 1) {
    alert("This is the first Questions");
    prev.disabled = true;
  } else if (index < totalQuestions) {
    next.disabled = false;
    index--;
  }
  displayQuestionsOnUI();
}

function handleIndexOnNext() {
  if (index === totalQuestions - 1) {
    alert("No further Questions");
    next.disabled = true;
  } else {
    next.disabled = false;
    index++;
  }
  displayQuestionsOnUI();
}

async function fetchQuestionsFromBackEnd() {
  Questions = await fetch("/getQuestions");
  Questions = await Questions.json();
  totalQuestions = Questions.length;
  displayQuestionsOnUI();
}

submit.addEventListener("click", () => {
  handleOnSubmit();
});

prev.addEventListener("click", () => {
  handleIndexOnPrev();
});

next.addEventListener("click", () => {
  handleIndexOnNext();
});

fetchQuestionsFromBackEnd();
