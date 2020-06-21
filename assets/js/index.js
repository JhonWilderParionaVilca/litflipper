"use strict";
//www.thecolorapi.com/docs#colors-color-identification-get
const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const btn = document.getElementById("btn");
const nameColor = document.getElementById("name");
const colorHtml = document.getElementById("color");

const getRandomNumber = () => {
  return Math.floor(Math.random() * hex.length);
};

const generateColorHex = () => {
  let colorHex = "#";

  for (let i = 0; i < 6; i++) {
    colorHex += hex[getRandomNumber()];
  }

  return colorHex;
};

const getDataColor = (color) => {
  const colorHex = color.replace("#", "");

  fetch(`http://www.thecolorapi.com/id?hex=${colorHex}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      paintDOM(data);
    })
    .catch((error) => {
      console.log("🔥: getDataColor -> error", error);
    });
};

const paintDOM = (data) => {
  const body = document.body;
  nameColor.innerText = data.name.value;
  body.style.backgroundColor = data.hex.value;
  if (window.location.pathname === "/hex.html") {
    colorHtml.innerText = data.hex.value;
  } else {
    colorHtml.innerText = data.rgb.value;
  }
  /*
  window.location.pathname
"/hex.html"
  */
};

btn.addEventListener("click", () => {
  const colorGenerate = generateColorHex();
  getDataColor(colorGenerate);
});
