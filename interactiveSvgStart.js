document.addEventListener("DOMContentLoaded", function () {
  runProgram();
});

let selected;
let selectedID;
let color;
let active;
let steder;

async function runProgram() {
  let myJson = await fetch("museum.json");
  steder = await myJson.json();

  // 1. Load svg map
  let mysvg = await fetch("kunstpakhuset3.svg");
  svg = await mysvg.text();
  document.querySelector("#map").innerHTML = svg;

  // // 2. Find infobokse og skjul dem
  // let info_1 = document.querySelector("#map #info-1");
  // let info_2 = document.querySelector("#map #info-2");
  // let info_3 = document.querySelector("#map #info-3");
  // let info_4 = document.querySelector("#map #info-4");

  // info_1.style.visibility = "hidden";
  // info_2.style.visibility = "hidden";
  // info_3.style.visibility = "hidden";
  // info_4.style.visibility = "hidden";

  // 3. Skift farve ved klik, og vis tekst
  document.querySelector("#map #Points").addEventListener("click", function (evt) {
    clicked(evt);
  });
}

// function clicked
function clicked(obj) {
  // a. Find det klikkede element
  selected = obj.target;

  // b. Find det klikkede elements ID
  selectedID = selected.getAttribute("id");

  // c. Find det klikkede elements fillfarve
  color = selected.getAttribute("fill");

  // d. Vis infobokse

  // Vis Json
  steder.forEach((sted) => {
    if (sted.sted == selectedID) {
      document.querySelector("#tekst").textContent = sted.tekst;
    }
  });
  // 4. hvis der tidligere har været klikket skal det forrige element skifte farve til original
  if (active) {
    active.setAttribute("fill", "#ca4331");
  }

  // gør det klikkede til det aktive
  active = selected;

  // skift farve på det valgte
  if (color == "#ca4331") {
    document.querySelector("#" + selectedID).setAttribute("fill", "#123456");
  }

  // reset farve og skjul tekst hvis valgt elementet allerede er aktivt
}

function clicked(obj) {
  // a. Find det klikkede element
  selected = obj.target;

  // b. Find det klikkede elements ID
  selectedID = selected.getAttribute("id");

  // c. Find det klikkede elements fillfarve
  color = selected.getAttribute("fill");

  // d. Vis infoboks
  steder.forEach((sted) => {
    if (sted.sted == selectedID) {
      document.querySelector("#tekst").textContent = sted.tekst;
      document.querySelector("article").style.display = "block"; // ← vis boksen
    }
  });

  // resten af din kode...
}

function clicked(obj) {
  selected = obj.target;
  selectedID = selected.getAttribute("id");
  color = selected.getAttribute("fill");

  steder.forEach((sted) => {
    if (sted.sted == selectedID) {
      // hvis JSON har overskrift-felt
      if (sted.overskrift) {
        document.querySelector("#overskrift").textContent = sted.overskrift;
        document.querySelector("#tekst").textContent = sted.tekst;
      } else {
        // fallback: split tekst på " - "
        let dele = sted.tekst.split(" - ");
        document.querySelector("#overskrift").textContent = dele[0];
        document.querySelector("#tekst").textContent = dele[1] || "";
      }

      document.querySelector("article").style.display = "block";
    }
  });
}
