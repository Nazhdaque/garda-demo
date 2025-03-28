var g=Object.defineProperty;var p=(e,t,s)=>t in e?g(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var c=(e,t,s)=>p(e,typeof t!="symbol"?t+"":t,s);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();class m{constructor(t){c(this,"observer",t=>new ResizeObserver(s=>s.forEach(i=>{switch(this.prop){case"w":const r=i.borderBoxSize[0].inlineSize;t.forEach(a=>a.style.maxWidth=`${r}px`);break;case"h":const n=i.borderBoxSize[0].blockSize;t.forEach(a=>a.style.minHeight=`${n}px`);break}})));c(this,"initWith",t=>{t.forEach(([s,i],r)=>{const n=document.querySelector(`.${s}`),a=document.querySelectorAll(`.${i}`),l=r+1;n&&a?this.observer(a).observe(n):console.error(`SizeSetter: there is no master-${l} or slave-${l}`)})});this.prop=t}}const u=(e,t)=>{let s=0;return()=>{const i=new Date;i-s>=t&&(e(),s=i)}},y=(e,t)=>{const s=document.querySelector(e);let i=0,r=0;const n=()=>(r=window.scrollY-i,i=window.scrollY,r),a=d=>d<0?s.classList.remove(t):s.classList.add(t),l=()=>a(n());document.addEventListener("scroll",u(l,50))},x=`<div class="full-bleed garda-bg">\r
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
				— это мне\r
				так больше нравится. Сделать как на макете — убрать / поменять пару-тройку строк стилей.</p>\r
		</li>\r
\r
		<li class="card fnt-xs">\r
			<picture class="img-box card__icon">\r
				<img src="images/icons/garda-icon-users.svg"\r
						 alt="icon badge">\r
			</picture>\r
			<p class="card__txt fnt-md txt-trunc">Lorem ipsum dolor.\r
			</p>\r
		</li>\r
	</ol>\r
</div>`,w=`<div class="full-bleed garda-bg">\r
	<section class="hero">\r
		<div class="img-box hero-tile motto">\r
			<h1 class="fnt-2xl txt-trunc">Безопасность — основа будущего</h1>\r
			<p class="sub fnt-md txt-clr-6 txt-trunc">Создаем решения в сфере безопасности данных\r
				и сетевой инфраструктуры</p>\r
\r
			<a class="arrow-link fnt-rg"\r
				 href="#">\r
				<span class="img-box arrow">\r
					<img loading="lazy"\r
							 decoding="async"\r
							 src="images/icons/garda-arrow-angled-white.svg"\r
							 alt="gradient arrow on white background">\r
					<img loading="lazy"\r
							 decoding="async"\r
							 src="images/icons/garda-arrow-angled-black.svg"\r
							 alt="white arrow on black background">\r
				</span>\r
				<span class="ellipsis sm-txt-trunc">Вместо платного Proxima Nova подключен шрифт Roboto Flex</span>\r
			</a>\r
		</div>\r
\r
		<div class="hero-news scroll-snap-inline sm-d-grid">\r
			<a class="img-box hero-tile news sm-grid-area-auto"\r
				 href="#">\r
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
						например, размер стрелок и тегов в адаптивах, — это <span class="ital txt-gradient">мне так больше\r
							нравится</span>\r
					</h2>\r
				</div>\r
				<div class="img-box arrow">\r
					<img loading="lazy"\r
							 decoding="async"\r
							 src="images/icons/garda-arrow-angled-white.svg"\r
							 alt="gradient arrow on white background">\r
					<img loading="lazy"\r
							 decoding="async"\r
							 src="images/icons/garda-arrow-angled-purple.svg"\r
							 alt="white arrow on purple background">\r
				</div>\r
			</a>\r
\r
			<a class="img-box hero-tile news sm-grid-area-auto"\r
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
					<h2 class="txt-trunc fnt-md">Оценивать надо в динамике, <span class="ital txt-gradient">плавно</span> изменяя\r
						ширину окна просмотра</h2>\r
				</div>\r
				<div class="img-box arrow">\r
					<img loading="lazy"\r
							 decoding="async"\r
							 src="images/icons/garda-arrow-angled-white.svg"\r
							 alt="gradient arrow on white background">\r
					<img loading="lazy"\r
							 decoding="async"\r
							 src="images/icons/garda-arrow-angled-purple.svg"\r
							 alt="white arrow on purple background">\r
				</div>\r
			</a>\r
\r
			<a class="img-box hero-tile news sm-grid-area-auto"\r
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
					<h2 class="txt-trunc fnt-md">Эти тайлы <span class="ital txt-gradient">на ≤768px</span> будут\r
						скроллиться по\r
						<span class="ital caps txt-gradient">shift + mouse wheel</span>, или тачпадом, или\r
						свайпаться\r
					</h2>\r
				</div>\r
				<div class="img-box arrow">\r
					<img loading="lazy"\r
							 decoding="async"\r
							 src="images/icons/garda-arrow-angled-white.svg"\r
							 alt="gradient arrow on white background">\r
					<img loading="lazy"\r
							 decoding="async"\r
							 src="images/icons/garda-arrow-angled-purple.svg"\r
							 alt="white arrow on purple background">\r
				</div>\r
			</a>\r
		</div>\r
	</section>\r
</div>`,h=`<ol class="demo grid-x"\r
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
</ol>`,o=document.querySelector(".main-content");o.insertAdjacentHTML("beforeend",w);o.insertAdjacentHTML("beforeend",x);o.insertAdjacentHTML("beforeend",h);const b=new m("w");b.initWith([["w-master-1","w-slave-1"]]);y(".main-header","-slide-up");console.log("%cCoded by ✨Nazhdaque✨","background: #222; color: chartreuse;");
