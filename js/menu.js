import { displayArray } from "./main.js";

const menuElement = document.querySelector(".menu");
const menuOpenBtn = document.querySelector(".fa-bars");
const menuCloseBtn = document.querySelector(".fa-x");
const saveMenuBtn = document.getElementById("save-btn");
const animationTimeoutInput = document.getElementById("animation-input");
const arrayInput = document.getElementById("array-input");
const messageElement = document.querySelector(".message");

let animationTimeout = 1000;

menuOpenBtn.onclick = () => {
  menuElement.classList.toggle("show");
}

menuCloseBtn.onclick = () => {
  menuElement.classList.toggle("show");
  messageElement.classList.remove("show");
}

export function setMessageMenu(message) {
  messageElement.innerText = message;
  messageElement.classList.remove("error");
  messageElement.classList.add("show");
}

export function setErrorMenu(error) {
  messageElement.innerText = error;
  messageElement.classList.add("error");
  messageElement.classList.add("show");
}

function parse(str) {
  let replaced = str.replace(/\s/g, '');
  return JSON.parse(replaced);
}

export function getAnimationTimeout() {
  return animationTimeout;
}

function setAnimationTimeout(timeout) {
  animationTimeout = timeout;
}

saveMenuBtn.onclick = () => {
  let arrayInputValue = arrayInput.value;
  let animationTimeoutValue = Number(animationTimeoutInput.value);
  if (!arrayInputValue) return; // If it's empty 
  try {
    let array = parse(arrayInputValue);
    setAnimationTimeout(animationTimeoutValue);
    setMessageMenu("Saved!");
    displayArray(array);
  } catch(e) {
    setErrorMenu(e);
  }

}