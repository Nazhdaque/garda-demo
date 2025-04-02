import "/css/main.css";
import { SizeSetter } from "./helpers";
import { slideHeader } from "./slideHeader.js";
import { cursorGlow } from "./cursor-glow.js";
// -- html
import gradientCards from "../html/gradient-cards.html?raw";
import sectionHero from "../html/section-hero.html?raw";
import demo from "../html/demo.html?raw";

const mainContent = document.querySelector(".main-content");
mainContent.insertAdjacentHTML("beforeend", sectionHero);
mainContent.insertAdjacentHTML("beforeend", gradientCards);
mainContent.insertAdjacentHTML("beforeend", demo);

// --
const widthSetter = new SizeSetter("w");
widthSetter.initWith([["w-master-1", "w-slave-1"]]);

// --
slideHeader(".main-header", "-slide-up");

// --
cursorGlow(".hero-news", ".cursor-glow");

// --
console.log("%cCoded by ✨Nazhdaque✨", "background: #222; color: chartreuse;");
