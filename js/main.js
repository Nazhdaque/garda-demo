import "/css/main.css";
import { SizeSetter } from "./helpers";
import { slideHeader } from "./slideHeader.js";
// -- html
import gardaTiles from "../html/garda-tiles.html?raw";
import gardaHero from "../html/garda-hero.html?raw";
import demo from "../html/demo.html?raw";

const mainContent = document.querySelector(".main-content");
mainContent.insertAdjacentHTML("beforeend", gardaHero);
mainContent.insertAdjacentHTML("beforeend", gardaTiles);
mainContent.insertAdjacentHTML("beforeend", demo);

// --
const widthSetter = new SizeSetter("w");
widthSetter.initWith([["w-master-1", "w-slave-1"]]);

// --
slideHeader(".main-header", "-slide-up");

// --
console.log("%cCoded by ✨Nazhdaque✨", "background: #222; color: chartreuse;");
