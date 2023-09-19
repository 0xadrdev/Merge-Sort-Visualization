import { displayArray } from "./script.js";

const menuElement = document.querySelector(".menu");
const menuOpenBtn = document.querySelector(".fa-bars");
const menuCloseBtn = document.querySelector(".fa-x");
const saveMenuBtn = document.getElementById("save-btn");
const animationTimeoutInput = document.getElementById("animation-input");
const arrayInput = document.getElementById("array-input");
const messageElement = document.querySelector(".message");

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


//TODO: Este de aquí abajo es el que muestra los mensajes... 

saveMenuBtn.onclick = () => {
  try {
    let arrayInputValue = arrayInput.value;
    let array = parse(arrayInputValue);
    setMessageMenu("Saved!")
    displayArray(array);
  } catch(e) {
    setErrorMenu(e);
  }

}