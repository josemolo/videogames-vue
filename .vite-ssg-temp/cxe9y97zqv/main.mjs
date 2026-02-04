import { Fragment, createApp, createBlock, createCommentVNode, createTextVNode, createVNode, defineComponent, mergeProps, nextTick, onBeforeUnmount, onMounted, onUnmounted, openBlock, ref, renderList, resolveComponent, resolveDirective, resolveDynamicComponent, toDisplayString, unref, useSSRContext, withCtx, withDirectives } from "vue";
import { createPinia, defineStore } from "pinia";
import { createHead, useHead } from "@vueuse/head";
import { ssrGetDirectiveProps, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderSlot, ssrRenderVNode } from "vue/server-renderer";
import { createRouter, createWebHistory, useRouter } from "vue-router";
const useCartStore = defineStore("cart", {
	state: () => ({ items: [] }),
	getters: {
		count: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
		total: (state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0)
	},
	actions: {
		add(game) {
			const existing = this.items.find((i) => i.id === game.id);
			if (existing) existing.quantity++;
			else this.items.push({
				...game,
				quantity: 1
			});
		},
		remove(id) {
			this.items = this.items.filter((i) => i.id !== id);
		},
		clear() {
			this.items = [];
		}
	}
});
var Navbar_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Navbar",
	__ssrInlineRender: true,
	setup(__props) {
		const cart = useCartStore();
		const isOpen = ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_router_link = resolveComponent("router-link");
			_push(`<header${ssrRenderAttrs(mergeProps({ class: "header" }, _attrs))} data-v-80882a4e><div class="top-bar" data-v-80882a4e><h1 class="logo" data-v-80882a4e>VORTEXGAMES</h1><button class="hamburger" data-v-80882a4e><span data-v-80882a4e></span><span data-v-80882a4e></span><span data-v-80882a4e></span></button></div><nav class="${ssrRenderClass(["nav", { open: isOpen.value }])}" data-v-80882a4e>`);
			_push(ssrRenderComponent(_component_router_link, {
				to: "/",
				class: "nav-link cart-link"
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(`HOME `);
						if (unref(cart).count > 0) _push$1(`<span class="cart-badge" data-v-80882a4e${_scopeId}>${ssrInterpolate(unref(cart).count)}</span>`);
						else _push$1(`<!---->`);
					} else return [createTextVNode("HOME "), unref(cart).count > 0 ? (openBlock(), createBlock("span", {
						key: 0,
						class: "cart-badge"
					}, toDisplayString(unref(cart).count), 1)) : createCommentVNode("", true)];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_router_link, {
				to: "/news",
				class: "nav-link"
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(`NEWS`);
					else return [createTextVNode("NEWS")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_router_link, {
				to: "/consoles",
				class: "nav-link"
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(`CONSOLES`);
					else return [createTextVNode("CONSOLES")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_router_link, {
				to: "/contact",
				class: "nav-link"
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(`CONTACTS`);
					else return [createTextVNode("CONTACTS")];
				}),
				_: 1
			}, _parent));
			_push(`</nav></header>`);
		};
	}
});
var __plugin_vue_export_helper_default = (sfc, props) => {
	const target = sfc.__vccOpts || sfc;
	for (const [key, val] of props) target[key] = val;
	return target;
};
var _sfc_setup$11 = Navbar_vue_vue_type_script_setup_true_lang_default.setup;
Navbar_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Navbar.vue");
	return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
var Navbar_default = /* @__PURE__ */ __plugin_vue_export_helper_default(Navbar_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-80882a4e"]]);
var App_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "App",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({ meta: [{
			name: "google-site-verification",
			content: "ABC123..."
		}] });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_router_view = resolveComponent("router-view");
			_push(`<div${ssrRenderAttrs(mergeProps({ id: "app" }, _attrs))}>`);
			_push(ssrRenderComponent(Navbar_default, null, null, _parent));
			_push(ssrRenderComponent(_component_router_view, null, {
				default: withCtx(({ Component }, _push$1, _parent$1, _scopeId) => {
					if (_push$1) ssrRenderVNode(_push$1, createVNode(resolveDynamicComponent(Component), null, null), _parent$1, _scopeId);
					else return [(openBlock(), createBlock(resolveDynamicComponent(Component)))];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
var _sfc_setup$10 = App_vue_vue_type_script_setup_true_lang_default.setup;
App_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
	return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
var App_default = App_vue_vue_type_script_setup_true_lang_default;
var _sfc_main$2 = {
	__name: "Hero",
	__ssrInlineRender: true,
	props: { video: {
		type: String,
		required: true
	} },
	setup(__props) {
		useRouter();
		const particleCanvas = ref(null);
		let animationId = null;
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		onMounted(async () => {
			if (prefersReducedMotion) return;
			await nextTick();
			const canvas = particleCanvas.value;
			if (!canvas) return;
			const ctx = canvas.getContext("2d");
			if (!ctx) return;
			const resize = () => {
				const dpr = window.devicePixelRatio || 1;
				canvas.width = window.innerWidth * dpr;
				canvas.height = window.innerHeight * dpr;
				canvas.style.width = `${window.innerWidth}px`;
				canvas.style.height = `${window.innerHeight}px`;
				ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			};
			resize();
			window.addEventListener("resize", resize);
			const particleCount = window.innerWidth < 768 ? 18 : 40;
			const particles = Array.from({ length: particleCount }, () => ({
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				vx: (Math.random() - .5) * .8,
				vy: (Math.random() - .5) * .8,
				size: Math.random() * 2 + 1.5
			}));
			const maxDist = 14400;
			const animate = () => {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				particles.forEach((p) => {
					p.x += p.vx;
					p.y += p.vy;
					if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
					if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
					ctx.beginPath();
					ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
					ctx.fillStyle = "rgba(127,92,255,0.8)";
					ctx.fill();
				});
				for (let i = 0; i < particles.length; i++) for (let j = i + 1; j < particles.length; j++) {
					const dx = particles[i].x - particles[j].x;
					const dy = particles[i].y - particles[j].y;
					const distSq = dx * dx + dy * dy;
					if (distSq < maxDist) {
						1 - distSq / maxDist;
						ctx.beginPath();
						ctx.strokeStyle = `rgba(127,92,255,${1 - distSq / 120})`;
						ctx.moveTo(particles[i].x, particles[i].y);
						ctx.lineTo(particles[j].x, particles[j].y);
						ctx.stroke();
					}
				}
				animationId = requestAnimationFrame(animate);
			};
			animate();
			const handleVisibility = () => {
				if (document.hidden) cancelAnimationFrame(animationId);
				else animate();
			};
			document.addEventListener("visibilitychange", handleVisibility);
			onUnmounted(() => {
				cancelAnimationFrame(animationId);
				window.removeEventListener("resize", resize);
				document.removeEventListener("visibilitychange", handleVisibility);
			});
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_router_link = resolveComponent("router-link");
			_push(`<section${ssrRenderAttrs(mergeProps({ class: "hero" }, _attrs, ssrGetDirectiveProps(_ctx, resolveDirective("reveal"))))} data-v-44d02f72><video autoplay muted loop playsinline class="hero-video" data-v-44d02f72><source${ssrRenderAttr("src", __props.video)} type="video/mp4" data-v-44d02f72></video><div class="hero-overlay" data-v-44d02f72></div><div class="hero-content" data-v-44d02f72><span class="badge" data-v-44d02f72>🎮 TIENDA GAMER</span><h1 class="neon-text" data-v-44d02f72>LucyCell</h1><p class="neon-text" data-v-44d02f72>Tecnología y estilo a tu alcance</p><div class="hero-actions" data-v-44d02f72>`);
			_push(ssrRenderComponent(_component_router_link, {
				to: "/consoles",
				class: "primary glow"
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(`Comprar ahora`);
					else return [createTextVNode("Comprar ahora")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_router_link, {
				to: "/news",
				class: "secondary glow"
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(`Ver novedades`);
					else return [createTextVNode("Ver novedades")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><canvas class="particle-canvas" data-v-44d02f72></canvas></section>`);
		};
	}
};
var _sfc_setup$9 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Hero.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var Hero_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main$2, [["__scopeId", "data-v-44d02f72"]]);
var _sfc_main$1 = {
	__name: "SectionGrid",
	__ssrInlineRender: true,
	props: { title: {
		type: String,
		default: ""
	} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({ class: "section-grid" }, _attrs, ssrGetDirectiveProps(_ctx, resolveDirective("reveal"))))} data-v-f96021ad>`);
			if (__props.title) _push(`<h2 class="section-title" data-v-f96021ad>${ssrInterpolate(__props.title)}</h2>`);
			else _push(`<!---->`);
			_push(`<div class="grid" data-v-f96021ad>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div></section>`);
		};
	}
};
var _sfc_setup$8 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/SectionGrid.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var SectionGrid_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main$1, [["__scopeId", "data-v-f96021ad"]]);
var Card_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Card",
	__ssrInlineRender: true,
	props: {
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		image: {
			type: String,
			required: true
		},
		price: {
			type: Number,
			default: 0
		},
		button: {
			type: String,
			default: ""
		}
	},
	emits: ["buy"],
	setup(__props, { emit: __emit }) {
		const cardRef = ref(null);
		ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			const _directive_reveal = resolveDirective("reveal");
			_push(`<article${ssrRenderAttrs(mergeProps({
				ref_key: "cardRef",
				ref: cardRef,
				class: "card"
			}, _attrs, ssrGetDirectiveProps(_ctx, _directive_reveal)))} data-v-86f6e482><img class="card-image"${ssrRenderAttr("src", __props.image)}${ssrRenderAttr("alt", __props.title)} loading="lazy" data-v-86f6e482><h3 class="card-title" data-v-86f6e482>${ssrInterpolate(__props.title)}</h3><p class="card-text" data-v-86f6e482>${ssrInterpolate(__props.description)}</p>`);
			if (__props.price !== void 0) _push(`<p class="card-price" data-v-86f6e482>${ssrInterpolate(__props.price)}</p>`);
			else _push(`<p class="card-price" data-v-86f6e482>Precio no disponible</p>`);
			if (__props.button) _push(`<button data-v-86f6e482>${ssrInterpolate(__props.button)}</button>`);
			else _push(`<!---->`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</article>`);
		};
	}
});
var _sfc_setup$7 = Card_vue_vue_type_script_setup_true_lang_default.setup;
Card_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Card.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var Card_default = /* @__PURE__ */ __plugin_vue_export_helper_default(Card_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-86f6e482"]]);
function useParticles(canvasRef) {
	let animationId = null;
	function startParticles() {
		if (!canvasRef) return;
		const ctx = canvasRef.getContext("2d");
		if (!ctx) return;
		function draw() {
			if (!ctx || !canvasRef) return;
			ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
			animationId = requestAnimationFrame(draw);
		}
		draw();
	}
	onMounted(() => {
		startParticles();
	});
	onBeforeUnmount(() => {
		if (animationId !== null) cancelAnimationFrame(animationId);
	});
	return () => {
		if (animationId !== null) cancelAnimationFrame(animationId);
	};
}
var games_default = [
	{
		"id": 1,
		"title": "Cyber Adventure",
		"description": "Un juego de acción futurista.",
		"image": "https://cdnpro.eraspace.com/media/wysiwyg/artikel/Tahun_2023/Desember/Game_GTA_6_2.jpg" 
	},
	{
		"id": 2,
		"title": "Fantasy World",
		"description": "Explora un mundo lleno de magia.",
		"image": "https://picsum.photos/300/180"
	},
	{
		"id": 3,
		"title": "Racing Pro",
		"description": "Carreras a máxima velocidad.",
		"image": "https://picsum.photos/300/180"
	}
];
var featuredProducts_default = [
	{
		"id": 1,
		"name": "PlayStation 5",
		"price": "499",
		"image": "https://picsum.photos/250/150"
	},
	{
		"id": 2,
		"name": "Xbox Series X",
		"price": "499",
		"image": "https://picsum.photos/250/150"
	},
	{
		"id": 3,
		"name": "Nintendo Switch",
		"price": "299",
		"image": "https://picsum.photos/250/150"
	},
	{
		"id": 4,
		"name": "PC Gamer",
		"price": "999",
		"image": "https://picsum.photos/250/150"
	}
];
var news_default = [
	{
		"id": 1,
		"title": "Nuevo lanzamiento",
		"description": "El juego X salió hoy",
		"image": "https://picsum.photos/250/150"
	},
	{
		"id": 2,
		"title": "Evento gamer",
		"description": "Torneo este fin de semana",
		"image": "https://picsum.photos/250/150"
	},
	{
		"id": 3,
		"title": "Oferta especial",
		"description": "20% en consolas",
		"image": "https://picsum.photos/250/150"
	}
];
var gamingBg = "https://res.cloudinary.com/dakkfinnu/video/upload/v1767195871/gaming_g0o04l.mp4";
var Home_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Home",
	__ssrInlineRender: true,
	props: { video: String },
	setup(__props) {
		useHead({
			title: "VortexGames | Consolas, Juegos y Accesorios Gamer",
			meta: [
				{
					name: "description",
					content: "Bienvenido a Gaming Hub, tu portal de videojuegos."
				},
				{
					property: "og:title",
					content: "VortexGames | Consolas y Juegos"
				},
				{
					property: "og:description",
					name: "description",
					content: "Compra consolas, juegos y accesorios gamer con envíos rápidos y precios competitivos."
				},
				{
					property: "og:image",
					content: "https://res.cloudinary.com/usuario/image/upload/banner.jpg"
				},
				{
					property: "og:type",
					content: "website"
				},
				{
					property: "og:image",
					content: "/og/home.png"
				}
			]
		});
		const games = ref(games_default);
		const featuredProducts = ref(featuredProducts_default);
		const newsList = ref(news_default);
		const canvasRef = ref(null);
		const testimonials = [{
			name: "Gamer123",
			text: "Excelente tienda y envío rápido!"
		}, {
			name: "ProGamer",
			text: "Gran variedad y precios inmejorables."
		}];
		const socials = [
			"Twitch",
			"YouTube",
			"Discord"
		];
		let stopParticles = null;
		onMounted(async () => {
			stopParticles = useParticles(canvasRef.value);
		});
		onBeforeUnmount(() => {
			if (stopParticles) stopParticles();
		});
		console.log("games:", games);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_router_link = resolveComponent("router-link");
			const _directive_reveal = resolveDirective("reveal");
			_push(`<!--[--><canvas class="particle-canvas" data-v-0b97d577></canvas><div class="home" data-v-0b97d577>`);
			_push(ssrRenderComponent(Hero_default, { video: gamingBg }, null, _parent));
			if (games.value && games.value.length) _push(ssrRenderComponent(SectionGrid_default, { title: "Juegos Destacados" }, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(`<!--[-->`);
						ssrRenderList(games.value, (game) => {
							_push$1(ssrRenderComponent(Card_default, {
								key: game.id,
								title: game.title,
								description: game.description,
								image: game.image
							}, null, _parent$1, _scopeId));
						});
						_push$1(`<!--]-->`);
					} else return [(openBlock(true), createBlock(Fragment, null, renderList(games.value, (game) => {
						return openBlock(), createBlock(Card_default, {
							key: game.id,
							title: game.title,
							description: game.description,
							image: game.image
						}, null, 8, [
							"title",
							"description",
							"image"
						]);
					}), 128))];
				}),
				_: 1
			}, _parent));
			else _push(`<!---->`);
			_push(`<section${ssrRenderAttrs(mergeProps({ class: "products" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))} data-v-0b97d577><h2 data-v-0b97d577>Productos Destacados</h2><div class="product-grid" data-v-0b97d577><!--[-->`);
			ssrRenderList(featuredProducts.value, (p) => {
				_push(ssrRenderComponent(Card_default, {
					key: p.id,
					image: p.image,
					title: p.name,
					description: p.price,
					button: "Ver producto"
				}, {
					default: withCtx((_, _push$1, _parent$1, _scopeId) => {
						if (_push$1) _push$1(ssrRenderComponent(_component_router_link, {
							to: `/console/${p.id}`,
							class: "product-button primary"
						}, {
							default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
								if (_push$2) _push$2(`Ver producto`);
								else return [createTextVNode("Ver producto")];
							}),
							_: 2
						}, _parent$1, _scopeId));
						else return [createVNode(_component_router_link, {
							to: `/console/${p.id}`,
							class: "product-button primary"
						}, {
							default: withCtx(() => [createTextVNode("Ver producto")]),
							_: 1
						}, 8, ["to"])];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></div></section><section${ssrRenderAttrs(mergeProps({ class: "news" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))} data-v-0b97d577><h2 data-v-0b97d577>Últimas Noticias</h2><div class="news-grid" data-v-0b97d577><!--[-->`);
			ssrRenderList(newsList.value, (n) => {
				_push(ssrRenderComponent(Card_default, {
					key: n.id,
					image: n.image,
					title: n.title,
					description: n.description
				}, null, _parent));
			});
			_push(`<!--]--></div></section><section${ssrRenderAttrs(mergeProps({ class: "testimonials" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))} data-v-0b97d577><h2 data-v-0b97d577>Lo que dicen nuestros gamers</h2><div class="testimonial-grid" data-v-0b97d577><!--[-->`);
			ssrRenderList(testimonials, (t) => {
				_push(`<div class="testimonial-card" data-v-0b97d577><p data-v-0b97d577>&quot;${ssrInterpolate(t.text)}&quot;</p><span data-v-0b97d577>- ${ssrInterpolate(t.name)}</span></div>`);
			});
			_push(`<!--]--></div></section><section${ssrRenderAttrs(mergeProps({ class: "newsletter" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))} data-v-0b97d577><h2 data-v-0b97d577>Suscríbete y recibe ofertas</h2><div class="newsletter-form" data-v-0b97d577><input type="email" placeholder="Tu correo" data-v-0b97d577><button class="primary" data-v-0b97d577>Suscribirse</button></div></section><footer class="footer" data-v-0b97d577><div data-v-0b97d577>© 2025 VortexGames</div><div class="social" data-v-0b97d577><!--[-->`);
			ssrRenderList(socials, (s) => {
				_push(`<a href="#" data-v-0b97d577>${ssrInterpolate(s)}</a>`);
			});
			_push(`<!--]--></div></footer></div><!--]-->`);
		};
	}
});
var _sfc_setup$6 = Home_vue_vue_type_script_setup_true_lang_default.setup;
Home_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Home.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var Home_default = /* @__PURE__ */ __plugin_vue_export_helper_default(Home_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-0b97d577"]]);
var LazySection_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "LazySection",
	__ssrInlineRender: true,
	setup(__props) {
		const visible = ref(false);
		const el = ref(null);
		let observer = null;
		onMounted(() => {
			observer = new IntersectionObserver(([entry]) => {
				if (entry?.isIntersecting) {
					visible.value = true;
					observer?.disconnect();
				}
			}, { threshold: .1 });
			if (el.value) observer.observe(el.value);
		});
		onBeforeUnmount(() => observer?.disconnect());
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				ref_key: "el",
				ref: el
			}, _attrs))}>`);
			if (visible.value) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			else _push(`<!---->`);
			_push(`</section>`);
		};
	}
});
var _sfc_setup$5 = LazySection_vue_vue_type_script_setup_true_lang_default.setup;
LazySection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/utils/LazySection.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var LazySection_default = LazySection_vue_vue_type_script_setup_true_lang_default;
var _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "window news skeleton" }, _attrs))} data-v-3a666f2b><h1 class="skeleton-title" data-v-3a666f2b></h1><ul data-v-3a666f2b><!--[-->`);
	ssrRenderList(3, (i) => {
		_push(`<li class="news-item skeleton-item" data-v-3a666f2b><h3 data-v-3a666f2b>██████████████</h3><p data-v-3a666f2b>████████████████████████████</p><div class="skeleton-line title" data-v-3a666f2b></div><div class="skeleton-line text" data-v-3a666f2b></div></li>`);
	});
	_push(`<!--]--></ul></div>`);
}
var _sfc_setup$4 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/skeletons/NewsSkeleton.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var NewsSkeleton_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-3a666f2b"]]);
var NEWS_API = "http://localhost:3000/news";
var News_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "News",
	__ssrInlineRender: true,
	setup(__props) {
		const loading = ref(true);
		const news = ref([
			{
				id: 1,
				title: "Nuevo DLC de Zelda",
				content: "Explora nuevas tierras y aventuras épicas en Hyrule."
			},
			{
				id: 2,
				title: "Mario Kart 9 anunciado",
				content: "Prepárate para nuevas pistas, personajes y modos online."
			},
			{
				id: 3,
				title: "Minecraft actualiza mobs",
				content: "Nuevos mobs y biomas para explorar y construir."
			}
		]);
		useHead({
			title: "Noticias de Videojuegos | Gaming Hub",
			meta: [
				{
					name: "description",
					content: "Últimas noticias de videojuegos, lanzamientos, DLCs y novedades del mundo gaming."
				},
				{
					property: "og:title",
					content: "Noticias de Videojuegos | Gaming Hub"
				},
				{
					property: "og:description",
					content: "Mantente al día con las noticias más recientes del mundo gamer."
				},
				{
					property: "og:type",
					content: "article"
				},
				{
					property: "og:image:width",
					content: "1200"
				},
				{
					property: "og:image:height",
					content: "630"
				},
				{
					property: "og:image",
					content: "/og/news.png"
				}
			]
		});
		onMounted(async () => {
			try {
				const res = await fetch(NEWS_API);
				if (!res.ok) throw new Error("Error al cargar noticias");
				news.value = await res.json();
			} catch (err) {
				console.error(err);
			} finally {
				loading.value = false;
			}
			setTimeout(() => {
				loading.value = false;
			}, 800);
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _directive_reveal = resolveDirective("reveal");
			_push(ssrRenderComponent(LazySection_default, _attrs, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(`<div${ssrRenderAttrs(mergeProps({ class: "window news" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))} data-v-e612d314${_scopeId}><h1 class="neon-text pulse" data-v-e612d314${_scopeId}>Noticias de Videojuegos</h1>`);
						if (loading.value) _push$1(ssrRenderComponent(NewsSkeleton_default, null, null, _parent$1, _scopeId));
						else _push$1(`<!---->`);
						_push$1(`<ul data-v-e612d314${_scopeId}><!--[-->`);
						ssrRenderList(news.value, (newsItem) => {
							_push$1(`<li class="news-item" data-v-e612d314${_scopeId}><h3 class="neon-text" data-v-e612d314${_scopeId}>${ssrInterpolate(newsItem.title)}</h3><p data-v-e612d314${_scopeId}>${ssrInterpolate(newsItem.content)}</p></li>`);
						});
						_push$1(`<!--]--></ul></div>`);
					} else return [withDirectives((openBlock(), createBlock("div", { class: "window news" }, [
						createVNode("h1", { class: "neon-text pulse" }, "Noticias de Videojuegos"),
						loading.value ? (openBlock(), createBlock(NewsSkeleton_default, { key: 0 })) : createCommentVNode("", true),
						createVNode("ul", null, [(openBlock(true), createBlock(Fragment, null, renderList(news.value, (newsItem) => {
							return openBlock(), createBlock("li", {
								key: newsItem.id,
								class: "news-item"
							}, [createVNode("h3", { class: "neon-text" }, toDisplayString(newsItem.title), 1), createVNode("p", null, toDisplayString(newsItem.content), 1)]);
						}), 128))])
					])), [[_directive_reveal]])];
				}),
				_: 1
			}, _parent));
		};
	}
});
var _sfc_setup$3 = News_vue_vue_type_script_setup_true_lang_default.setup;
News_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/News.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var News_default = /* @__PURE__ */ __plugin_vue_export_helper_default(News_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-e612d314"]]);
var Consoles_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Consoles",
	__ssrInlineRender: true,
	setup(__props) {
		useRouter();
		const consoles = ref([
			{
				id: 1,
				name: "Nintendo Switch",
				description: "Consola híbrida portátil y de hogar.",
				image: "/images/switch.png"
			},
			{
				id: 2,
				name: "PlayStation 5",
				description: "Alta potencia y gráficos de última generación.",
				image: "/images/ps5.png"
			},
			{
				id: 3,
				name: "Xbox Series X",
				description: "Gran rendimiento y catálogo de juegos.",
				image: "/images/xboxx.png"
			},
			{
				id: 4,
				name: "Xbox Series S",
				description: "Versión más económica y compacta.",
				image: "/images/xboxs.png"
			},
			{
				id: 5,
				name: "PlayStation 4",
				description: "Gran catálogo de juegos y accesorios.",
				image: "/images/ps4.png"
			},
			{
				id: 6,
				name: "Nintendo 3DS",
				description: "Portátil clásico con pantallas 3D.",
				image: "/images/3ds.png"
			},
			{
				id: 7,
				name: "Steam Deck",
				description: "PC portátil para juegos de Steam.",
				image: "/images/steamdeck.png"
			},
			{
				id: 8,
				name: "Oculus Quest 2",
				description: "Realidad virtual todo en uno.",
				image: "/images/oculus.png"
			},
			{
				id: 9,
				name: "Atari VCS",
				description: "Consola retro con juegos clásicos.",
				image: "/images/atari.png"
			}
		]);
		useHead({
			title: "Consolas | VortexGames",
			meta: [
				{
					name: "description",
					content: "Explora consolas clásicas y modernas: PlayStation, Xbox, Nintendo y más."
				},
				{
					property: "og:title",
					content: "Consolas | VortexGames"
				},
				{
					property: "og:description",
					content: "Información, detalles y catálogo de consolas de videojuegos."
				},
				{
					property: "og:type",
					content: "website"
				},
				{
					property: "og:image",
					content: "/og/consoles.png"
				}
			]
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "full-window" }, _attrs))} data-v-3d86af49><div class="window consoles" data-v-3d86af49><h1 data-v-3d86af49>Consolas y Artículos</h1><div class="row" data-v-3d86af49><!--[-->`);
			ssrRenderList(consoles.value.slice(0, 3), (console$1) => {
				_push(`<div class="console-card" data-v-3d86af49><img${ssrRenderAttr("src", console$1.image)}${ssrRenderAttr("alt", console$1.name)} class="console-img" data-v-3d86af49><h3 data-v-3d86af49>${ssrInterpolate(console$1.name)}</h3><p data-v-3d86af49>${ssrInterpolate(console$1.description)}</p></div>`);
			});
			_push(`<!--]--></div><div class="row" data-v-3d86af49><!--[-->`);
			ssrRenderList(consoles.value.slice(3, 6), (console$1) => {
				_push(`<div class="console-card" data-v-3d86af49><img${ssrRenderAttr("src", console$1.image)}${ssrRenderAttr("alt", console$1.name)} class="console-img" data-v-3d86af49><h3 data-v-3d86af49>${ssrInterpolate(console$1.name)}</h3><p data-v-3d86af49>${ssrInterpolate(console$1.description)}</p></div>`);
			});
			_push(`<!--]--></div><div class="row" data-v-3d86af49><!--[-->`);
			ssrRenderList(consoles.value.slice(6, 9), (console$1) => {
				_push(`<div class="console-card" data-v-3d86af49><img${ssrRenderAttr("src", console$1.image)}${ssrRenderAttr("alt", console$1.name)} class="console-img" data-v-3d86af49><h3 data-v-3d86af49>${ssrInterpolate(console$1.name)}</h3><p data-v-3d86af49>${ssrInterpolate(console$1.description)}</p></div>`);
			});
			_push(`<!--]--></div></div></div>`);
		};
	}
});
var _sfc_setup$2 = Consoles_vue_vue_type_script_setup_true_lang_default.setup;
Consoles_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Consoles.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var Consoles_default = /* @__PURE__ */ __plugin_vue_export_helper_default(Consoles_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-3d86af49"]]);
var Contact_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Contact",
	__ssrInlineRender: true,
	setup(__props) {
		const particlesGlobal = ref([]);
		const particlesContainer = ref([]);
		onMounted(() => {
			particlesGlobal.value = Array.from(document.querySelectorAll(".particles-global span"));
			particlesContainer.value = Array.from(document.querySelectorAll(".particles-container span"));
			window.addEventListener("mousemove", (e) => {
				const mouseX = e.clientX;
				const mouseY = e.clientY;
				particlesGlobal.value.forEach((p, index) => {
					const speed = .04 + index * .01;
					const rect = p.getBoundingClientRect();
					const dx = mouseX - (rect.left + rect.width / 2);
					const dy = mouseY - (rect.top + rect.height / 2);
					p.style.transform = `translate(${-dx * speed}px, ${-dy * speed}px)`;
				});
			});
			document.querySelectorAll(".register-form input").forEach((input) => {
				input.addEventListener("input", () => {
					particlesContainer.value.forEach((p) => {
						const offsetX = (Math.random() - .5) * 20;
						const offsetY = (Math.random() - .5) * 20;
						const scale = .5 + Math.random() * 1;
						p.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
						setTimeout(() => {
							p.style.transform = "";
						}, 300);
					});
				});
			});
		});
		useHead({
			title: "Contacto | VortexGames",
			meta: [
				{
					name: "description",
					content: "Contáctanos para dudas, sugerencias o colaboraciones en VortexGames."
				},
				{
					property: "og:title",
					content: "Contacto | VortexGames"
				},
				{
					property: "og:description",
					content: "Ponte en contacto con el equipo de VortexGames."
				},
				{
					property: "og:type",
					content: "website"
				},
				{
					property: "og:image",
					content: "/og/contact.png"
				}
			]
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "register-page" }, _attrs))} data-v-d5554f93><div class="background-lights" data-v-d5554f93></div><div class="particles-global" data-v-d5554f93><span data-v-d5554f93></span><span data-v-d5554f93></span><span data-v-d5554f93></span><span data-v-d5554f93></span><span data-v-d5554f93></span><span data-v-d5554f93></span><span data-v-d5554f93></span><span data-v-d5554f93></span><span data-v-d5554f93></span><span data-v-d5554f93></span></div><div class="register-container" data-v-d5554f93><h1 data-v-d5554f93>LOGIN</h1><div class="particles-container" data-v-d5554f93><span data-v-d5554f93></span><span data-v-d5554f93></span><span data-v-d5554f93></span><span data-v-d5554f93></span><span data-v-d5554f93></span><span data-v-d5554f93></span><span data-v-d5554f93></span><span data-v-d5554f93></span><span data-v-d5554f93></span><span data-v-d5554f93></span></div><form class="register-form" data-v-d5554f93><input type="text" placeholder="User name" data-v-d5554f93><input type="email" placeholder="Email" data-v-d5554f93><input type="password" placeholder="Password" data-v-d5554f93><input type="password" placeholder="Confirm Password" data-v-d5554f93><button type="submit" data-v-d5554f93>Register</button></form><div class="energy-bars bottom" data-v-d5554f93><div class="bar bar1" data-v-d5554f93></div><div class="bar bar2" data-v-d5554f93></div><div class="bar bar3" data-v-d5554f93></div></div><div class="energy-bars left" data-v-d5554f93><div class="bar bar1" data-v-d5554f93></div><div class="bar bar2" data-v-d5554f93></div><div class="bar bar3" data-v-d5554f93></div></div><div class="energy-bars right" data-v-d5554f93><div class="bar bar1" data-v-d5554f93></div><div class="bar bar2" data-v-d5554f93></div><div class="bar bar3" data-v-d5554f93></div></div></div></div>`);
		};
	}
});
var _sfc_setup$1 = Contact_vue_vue_type_script_setup_true_lang_default.setup;
Contact_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Contact.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var Contact_default = /* @__PURE__ */ __plugin_vue_export_helper_default(Contact_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-d5554f93"]]);
var switch_default = "/images/switch.png";
var Nintendo_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Nintendo",
	__ssrInlineRender: true,
	setup(__props) {
		useRouter();
		useHead({
			title: "Nintendo | VortexGames",
			meta: [
				{
					name: "description",
					content: "Todo sobre Nintendo: juegos, consolas, lanzamientos y noticias."
				},
				{
					property: "og:title",
					content: "Nintendo | VortexGames"
				},
				{
					property: "og:description",
					content: "Explora el universo Nintendo en VortexGames."
				},
				{
					property: "og:type",
					content: "website"
				},
				{
					property: "og:image",
					content: "/og/nintendo.png"
				}
			]
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "full-window" }, _attrs))} data-v-9422b12a><div class="window nintendo" data-v-9422b12a><h1 data-v-9422b12a>Nintendo Switch</h1><div class="content" data-v-9422b12a><div class="image-section" data-v-9422b12a><img${ssrRenderAttr("src", switch_default)} alt="Nintendo Switch" data-v-9422b12a></div><div class="info-section" data-v-9422b12a><h2 data-v-9422b12a>Consola híbrida</h2><p data-v-9422b12a> Nintendo Switch te permite jugar donde quieras, cuando quieras. Disfruta de juegos exclusivos como Zelda, Mario y Pokémon, tanto en modo portátil como en tu TV. </p><ul data-v-9422b12a><li data-v-9422b12a>🎮 Modo portátil y de sobremesa</li><li data-v-9422b12a>🧩 Joy-Con desmontables</li><li data-v-9422b12a>🕹️ Multijugador local y online</li><li data-v-9422b12a>📦 Gran catálogo de juegos exclusivos</li></ul><div class="buttons" data-v-9422b12a><button class="buy" data-v-9422b12a>Consultar disponibilidad</button><button class="back" data-v-9422b12a>Volver a consolas</button></div></div></div></div></div>`);
		};
	}
});
var _sfc_setup = Nintendo_vue_vue_type_script_setup_true_lang_default.setup;
Nintendo_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Nintendo.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var routes = [
	{
		path: "/",
		name: "Home",
		component: Home_default
	},
	{
		path: "/news",
		name: "News",
		component: News_default
	},
	{
		path: "/consoles",
		name: "Consoles",
		component: Consoles_default
	},
	{
		path: "/contact",
		name: "Contact",
		component: Contact_default
	},
	{
		path: "/nintendo",
		name: "Nintendo",
		component: /* @__PURE__ */ __plugin_vue_export_helper_default(Nintendo_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-9422b12a"]])
	},
	{
		path: "/console/:id",
		name: "ConsoleDetail",
		component: () => import("./assets/ConsoleDetail-Dbs4wkX2.js")
	}
];
function createRouter$1() {
	return createRouter({
		history: createWebHistory(),
		routes
	});
}
var router_default = createRouter$1();
var reveal_default = {
	mounted(el) {
		el.classList.add("reveal-hidden");
		const observer = new IntersectionObserver(([entry]) => {
			if (!entry) return;
			if (entry.isIntersecting) {
				el.classList.add("reveal-visible");
				observer.disconnect();
			}
		}, { threshold: .15 });
		observer.observe(el);
		el.__revealObserver = observer;
	},
	unmounted(el) {
		const observer = el.__revealObserver;
		if (observer) observer.disconnect();
	}
};
var app = createApp(App_default);
var pinia = createPinia();
var head = createHead();
app.use(pinia).use(router_default).use(head).directive("reveal", reveal_default).mount("#app");
export { __plugin_vue_export_helper_default as n, Card_default as t };
