var p=Object.defineProperty;var m=(e,r,s)=>r in e?p(e,r,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[r]=s;var c=(e,r,s)=>m(e,typeof r!="symbol"?r+"":r,s);(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(t){if(t.ep)return;t.ep=!0;const n=s(t);fetch(t.href,n)}})();class u{constructor(r){c(this,"observer",r=>new ResizeObserver(s=>s.forEach(a=>{switch(this.prop){case"w":const t=a.borderBoxSize[0].inlineSize;r.forEach(i=>i.style.maxWidth=`${t}px`);break;case"h":const n=a.borderBoxSize[0].blockSize;r.forEach(i=>i.style.minHeight=`${n}px`);break}})));c(this,"initWith",r=>{r.forEach(([s,a],t)=>{const n=document.querySelector(`.${s}`),i=document.querySelectorAll(`.${a}`),l=t+1;n&&i?this.observer(i).observe(n):console.error(`SizeSetter: there is no master-${l} or slave-${l}`)})});this.prop=r}}const d=(e,r=50)=>{let s=0;return(...a)=>{const t=new Date().getTime();if(!(t-s<r))return s=t,e(...a)}},y=(e,r)=>{const s=document.querySelector(e);let a=0,t=0;const n=()=>(t=window.scrollY-a,a=window.scrollY,t),i=g=>g<0?s.classList.remove(r):s.classList.add(r),l=()=>i(n());document.addEventListener("scroll",d(l))},w=(e,r)=>{document.querySelectorAll(e).forEach(s=>{const a=s.querySelector(r),t=n=>{if(a){const i=a.getBoundingClientRect();a.style.setProperty("--x",n.clientX-i.left),a.style.setProperty("--y",n.clientY-i.top)}};s.addEventListener("pointermove",d(t))})},h=`<div class="full-bleed garda-bg">\r
\r
	<ol class="cards grid-x width-x">\r
		<li class="card fnt-xs">\r
			<picture class="img-box card__icon">\r
				<img src="images/icons/garda-icon-users.svg"\r
						 alt="icon badge">\r
			</picture>\r
			<p class="card__txt fnt-md txt-trunc">Lorem ipsum dolor sit amet consectetur.</p>\r
		</li>\r
\r
		<li class="card fnt-xs">\r
			<picture class="img-box card__icon">\r
				<img src="images/icons/garda-icon-users.svg"\r
						 alt="icon badge">\r
			</picture>\r
			<p class="card__txt fnt-md txt-trunc">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>\r
		</li>\r
\r
		<li class="card fnt-xs">\r
			<picture class="img-box card__icon">\r
				<img src="images/icons/garda-icon-users.svg"\r
						 alt="icon badge">\r
			</picture>\r
			<p class="card__txt fnt-md txt-trunc">Lorem ipsum dolor sit amet consectetur, adipisicing elit accusamus!</p>\r
		</li>\r
\r
		<li class="card fnt-xs">\r
			<picture class="img-box card__icon">\r
				<img src="images/icons/garda-icon-users.svg"\r
						 alt="icon badge">\r
			</picture>\r
			<p class="card__txt fnt-md txt-trunc">Поворот градиента, ограничение ширины, белые цифры, выравнивание\r
				текста по центру и стрелка вниз на ≤1024px\r
				— <span class="txt-gradient">мне\r
					так больше нравится.</span></p>\r
		</li>\r
\r
		<li class="card fnt-xs">\r
			<picture class="img-box card__icon">\r
				<img src="images/icons/garda-icon-users.svg"\r
						 alt="icon badge">\r
			</picture>\r
			<p class="card__txt fnt-md txt-trunc">Lorem ipsum dolor sit.\r
			</p>\r
		</li>\r
	</ol>\r
</div>`,x=`<div class="full-bleed garda-bg">\r
	<section class="hero">\r
		<div class="img-box hero-tile motto">\r
			<h1 class="fnt-2xl txt-trunc">Безопасность — основа будущего</h1>\r
			<p class="sub fnt-md txt-clr-6 txt-trunc">Создаем решения в сфере безопасности данных\r
				и сетевой инфраструктуры</p>\r
\r
			<a class="arrow-link fnt-rg sm-focus"\r
				 href="#">\r
				<span class="img-box arrow">\r
					<img loading="lazy"\r
							 decoding="async"\r
							 src="images/icons/garda-icon-arrow-angled-white.svg"\r
							 alt="gradient arrow on white background">\r
					<img loading="lazy"\r
							 decoding="async"\r
							 src="images/icons/garda-icon-arrow-angled-black.svg"\r
							 alt="white arrow on black background">\r
					<img loading="lazy"\r
							 decoding="async"\r
							 src="images/icons/garda-icon-arrow-angled-purple.svg"\r
							 alt="white arrow on purple background">\r
				</span>\r
				<span class="ellipsis sm-txt-trunc">Вместо платного Proxima Nova подключен шрифт Roboto Flex</span>\r
			</a>\r
		</div>\r
\r
		<div class="hero-news scroll-snap-inline sm-d-grid">\r
			<a class="img-box hero-tile news sm-focus sm-grid-area-auto"\r
				 href="https://validator.w3.org/nu/?doc=https%3A%2F%2Fnazhdaque.github.io%2Fgarda-demo%2F"\r
				 target="_blank">\r
				<picture class="img-box z-down">\r
					<img loading="lazy"\r
							 decoding="async"\r
							 src="images/demo-720p.webp"\r
							 alt="demo image">\r
				</picture>\r
				<div class="tag fnt-xs">\r
					<span class="ellipsis">Мероприятия</span>\r
				</div>\r
				<span class="date fnt-xs">27.03.2025</span>\r
				<div class="hero-tile__title">\r
					<h2 class="txt-trunc fnt-md">Этот заголовок обрежется\r
						троеточием на 4 строке. Длина строк автоматически балансируется. Мелкие несоответствия макету,\r
						например, размер стрелок и тегов в адаптивах — <span class="txt-gradient">мне так больше\r
							нравится</span>\r
					</h2>\r
				</div>\r
				<div class="img-box arrow">\r
					<img loading="lazy"\r
							 decoding="async"\r
							 src="images/icons/garda-icon-arrow-angled-white.svg"\r
							 alt="gradient arrow on white background">\r
					<img loading="lazy"\r
							 decoding="async"\r
							 src="images/icons/garda-icon-arrow-angled-purple.svg"\r
							 alt="white arrow on purple background">\r
					<img loading="lazy"\r
							 decoding="async"\r
							 src="images/icons/garda-icon-arrow-angled-black.svg"\r
							 alt="white arrow on black background">\r
				</div>\r
			</a>\r
\r
			<a class="img-box hero-tile news sm-focus sm-grid-area-auto"\r
				 href="#">\r
				<picture class="img-box z-down">\r
					<img loading="lazy"\r
							 decoding="async"\r
							 src="images/demo-720p.webp"\r
							 alt="demo image">\r
				</picture>\r
				<div class="tag fnt-xs">\r
					<span class="ellipsis">Новости и аналитика</span>\r
				</div>\r
				<span class="date fnt-xs">27.03.2025</span>\r
				<div class="hero-tile__title">\r
					<h2 class="txt-trunc fnt-md">Оценивать надо в динамике, <span class="txt-gradient">плавно</span> изменяя\r
						ширину окна просмотра</h2>\r
				</div>\r
				<div class="img-box arrow">\r
					<img loading="lazy"\r
							 decoding="async"\r
							 src="images/icons/garda-icon-arrow-angled-white.svg"\r
							 alt="gradient arrow on white background">\r
					<img loading="lazy"\r
							 decoding="async"\r
							 src="images/icons/garda-icon-arrow-angled-purple.svg"\r
							 alt="white arrow on purple background">\r
					<img loading="lazy"\r
							 decoding="async"\r
							 src="images/icons/garda-icon-arrow-angled-black.svg"\r
							 alt="white arrow on black background">\r
				</div>\r
			</a>\r
\r
			<a class="img-box hero-tile news sm-focus sm-grid-area-auto"\r
				 href="#">\r
				<picture class="img-box z-down">\r
					<img loading="lazy"\r
							 decoding="async"\r
							 src="images/demo-720p.webp"\r
							 alt="demo image">\r
				</picture>\r
				<div class="tag fnt-xs">\r
					<span class="ellipsis">Видео</span>\r
				</div>\r
				<span class="date fnt-xs">27.03.2025</span>\r
				<div class="hero-tile__title">\r
					<h2 class="txt-trunc fnt-md">Эти тайлы <span class="txt-gradient">на ≤768px</span> будут\r
						скроллиться по\r
						<span class="caps txt-gradient">shift + mouse wheel</span>, или тачпадом, или\r
						свайпаться\r
					</h2>\r
				</div>\r
				<div class="img-box arrow">\r
					<img loading="lazy"\r
							 decoding="async"\r
							 src="images/icons/garda-icon-arrow-angled-white.svg"\r
							 alt="gradient arrow on white background">\r
					<img loading="lazy"\r
							 decoding="async"\r
							 src="images/icons/garda-icon-arrow-angled-purple.svg"\r
							 alt="white arrow on purple background">\r
					<img loading="lazy"\r
							 decoding="async"\r
							 src="images/icons/garda-icon-arrow-angled-black.svg"\r
							 alt="white arrow on black background">\r
				</div>\r
			</a>\r
		</div>\r
	</section>\r
</div>`,b=`<ol class="demo grid-x"\r
		style="--col: 12;">\r
	<li></li>\r
	<li></li>\r
	<li></li>\r
	<li></li>\r
	<li></li>\r
	<li></li>\r
	<li></li>\r
	<li></li>\r
	<li></li>\r
	<li></li>\r
	<li></li>\r
	<li></li>\r
</ol>\r
\r
<div class="xxx full-bleed">\r
	<ol class="demo gta width-x"\r
			style="--col: 12; --x: 6">\r
		<li></li>\r
		<li></li>\r
		<li></li>\r
		<li></li>\r
		<li></li>\r
		<li></li>\r
		<li></li>\r
		<li></li>\r
		<li></li>\r
		<li></li>\r
		<li></li>\r
		<li></li>\r
	</ol>\r
</div>\r
\r
<ol class="demo">\r
	<li class="width-x"\r
			style="--col: 12; --x: 3"></li>\r
	<li class="width-x"\r
			style="--col: 12; --x: 6"></li>\r
	<li class="width-x"\r
			style="--col: 12; --x: 9"></li>\r
</ol>\r
\r
<ol class="demo flex-x"\r
		style="--col: 3">\r
	<li class="w-master-1"></li>\r
	<li></li>\r
	<li></li>\r
	<li class="w-slave-1"></li>\r
	<li class="w-slave-1"></li>\r
</ol>\r
\r
<ol class="demo grid-x masonry"\r
		style="--col: 6">\r
	<li class="span-y"\r
			style="--span-y: 4"></li>\r
	<li class="span-y"\r
			style="--span-y: 2"></li>\r
	<li class="span-y"\r
			style="--span-y: 5"></li>\r
	<li class="span-y"\r
			style="--span-y: 3">\r
		<picture class="img-box">\r
			<img loading="lazy"\r
					 decoding="async"\r
					 src="images/demo-720p.webp"\r
					 alt="demo image">\r
		</picture>\r
	</li>\r
	<li class="span-y"\r
			style="--span-y: 6"></li>\r
	<li class="span-y"\r
			style="--span-y: 4"></li>\r
	<li class="span-y"\r
			style="--span-y: 5">\r
		<picture class="img-box">\r
			<img loading="lazy"\r
					 decoding="async"\r
					 src="images/demo-720p.webp"\r
					 alt="demo image">\r
		</picture>\r
	</li>\r
	<li class="span-y"\r
			style="--span-y: 5"></li>\r
	<li class="span-y"\r
			style="--span-y: 2"></li>\r
	<li class="span-y"\r
			style="--span-y: 5">\r
		<picture class="img-box">\r
			<img loading="lazy"\r
					 decoding="async"\r
					 src="images/demo-720p.webp"\r
					 alt="demo image">\r
		</picture>\r
	</li>\r
	<li class="span-y"\r
			style="--span-y: 4"></li>\r
	<li class="span-y"\r
			style="--span-y: 3"></li>\r
</ol>`,o=document.querySelector(".main-content");o.insertAdjacentHTML("beforeend",x);o.insertAdjacentHTML("beforeend",h);o.insertAdjacentHTML("beforeend",b);const f=new u("w");f.initWith([["w-master-1","w-slave-1"]]);y(".main-header","-slide-up");w(".hero-tile",".hero-tile__title");console.log("%cCoded by ✨Nazhdaque✨","background: #222; color: chartreuse;");
