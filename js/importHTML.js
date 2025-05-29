import gradientCards from "../html/gradient-cards.html?raw";
import sectionHero from "../html/section-hero.html?raw";
import sectionCtaProtect from "../html/section-cta-protect.html?raw";
import demo from "../html/demo.html?raw";

const mainContent = document.querySelector(".main-content");
mainContent.insertAdjacentHTML("beforeend", sectionCtaProtect);
mainContent.insertAdjacentHTML("beforeend", sectionHero);
mainContent.insertAdjacentHTML("beforeend", gradientCards);

// mainContent.insertAdjacentHTML("beforeend", demo);
