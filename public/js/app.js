console.log("Client side js file is loaded!");

const input = document.querySelector("input");
const btn = document.querySelector("button");
const form = document.querySelector("form");
const messageOne = document.querySelector(".message-1");
const messageTwo = document.querySelector(".message-2");

messageOne.textContent = "";
messageTwo.textContent = "";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const locationEntered = input.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  const response = await fetch(
    `http://localhost:3000/weather?address=${locationEntered}`
  );

  const data = await response.json();

  if (data.error) {
    messageOne.textContent = data.error;
  } else {
    messageOne.textContent = data.location;
    messageTwo.textContent = data.forecast;
    locationEntered = "";
  }
});
