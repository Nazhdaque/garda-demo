import "/css/main.css";
import "/js/importHTML.js";
// import { SizeSetter } from "./helpers";
import { slideHeader } from "./slideHeader.js";
import { cursorGlow } from "./cursor-glow.js";
import { createDelBtn } from "./delete-demo-item.js";
import "/js/form.js";
import "/js/demo-cards-settings.js";
import "/js/demo-cards.js";

// --
// const widthSetter = new SizeSetter("w");
// widthSetter.initWith([["w-master-1", "w-slave-1"]]);

// --
slideHeader("main-header", "-slide-up");

// --
cursorGlow("hero-news", "cursor-glow");

// --
createDelBtn("garda-bg", "del-section-btn");

// --
console.log(
	"%c𝕔𝕠𝕕𝕖𝕕 𝕓𝕪 ✨𝕟𝕒𝕫𝕙𝕕𝕒𝕢𝕦𝕖​✨",
	"background: #292c42; color: #45cdff;",
);
