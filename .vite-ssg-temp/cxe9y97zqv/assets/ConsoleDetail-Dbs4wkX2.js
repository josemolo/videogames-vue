import { n as __plugin_vue_export_helper_default, t as Card_default } from "../main.mjs";
import { computed, createVNode, defineComponent, mergeProps, useSSRContext, withCtx } from "vue";
import { useHead } from "@vueuse/head";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
var consoles_default = [{
	"id": "nintendo",
	"name": "Nintendo Switch",
	"subtitle": "Consola híbrida",
	"image": "/images/switch.png",
	"description": "Juega donde quieras con los mejores exclusivos de Nintendo.",
	"features": [
		"🎮 Modo portátil y TV",
		"🧩 Joy-Con desmontables",
		"🕹️ Multijugador local y online",
		"📦 Juegos exclusivos"
	],
	"price": 6999,
	"stock": 5
}];
var accessories_default = [
	{
		"id": 1,
		"consoleId": "nintendo",
		"name": "Control DualSense",
		"price": "$69",
		"image": "https://picsum.photos/300/200?1"
	},
	{
		"id": 2,
		"consoleId": "nintendo",
		"name": "Audífonos Gamer PS5",
		"price": "$89",
		"image": "https://picsum.photos/300/200?2"
	},
	{
		"id": 3,
		"consoleId": "nintendo",
		"name": "Control Xbox Series",
		"price": "$65",
		"image": "https://picsum.photos/300/200?3"
	},
	{
		"id": 4,
		"consoleId": "nintendo",
		"name": "Joy-Con Extra",
		"price": "$79",
		"image": "https://picsum.photos/300/200?4"
	}
];
var ConsoleDetail_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ConsoleDetail",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		const id = route.params.id;
		useRouter();
		const consoleId = route.params.id;
		const selectedConsole = computed(() => consoles_default.find((c) => c.id === consoleId));
		const compatibleAccessories = computed(() => accessories_default.filter((a) => a.consoleId === consoleId));
		useHead({
			title: `Consola ${consoleId} | VortexGames`,
			meta: [
				{
					name: "description",
					content: `Información y detalles de la consola ${consoleId}.`
				},
				{
					property: "og:title",
					content: `Consola ${consoleId} | VortexGames`
				},
				{
					property: "og:description",
					content: `Descubre características y datos de la consola ${consoleId}.`
				},
				{
					property: "og:type",
					content: "article"
				},
				{
					property: "og:image",
					content: "/og/consoles.png"
				},
				{
					property: "og:image",
					content: `/og/consoles/${id}.png`
				}
			]
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "full-window" }, _attrs))} data-v-b715ed20><div class="window console-detail" data-v-b715ed20><h1 data-v-b715ed20>${ssrInterpolate(selectedConsole.value?.name)}</h1>`);
			if (selectedConsole.value) {
				_push(`<div class="content" data-v-b715ed20><div class="image-section" data-v-b715ed20><img${ssrRenderAttr("src", selectedConsole.value.image)}${ssrRenderAttr("alt", selectedConsole.value.name)} class="console-img" data-v-b715ed20><p data-v-b715ed20>${ssrInterpolate(selectedConsole.value.description)}</p>`);
				if (compatibleAccessories.value.length) {
					_push(`<section class="accessories" data-v-b715ed20><h2 data-v-b715ed20>Accesorios compatibles</h2><div class="accessories-grid" data-v-b715ed20><!--[-->`);
					ssrRenderList(compatibleAccessories.value, (a) => {
						_push(ssrRenderComponent(Card_default, {
							key: a.id,
							title: a.name,
							description: a.price,
							image: a.image,
							class: "glow"
						}, {
							default: withCtx((_, _push$1, _parent$1, _scopeId) => {
								if (_push$1) _push$1(`<button class="primary glow" data-v-b715ed20${_scopeId}> Agregar </button>`);
								else return [createVNode("button", { class: "primary glow" }, " Agregar ")];
							}),
							_: 2
						}, _parent));
					});
					_push(`<!--]--></div></section>`);
				} else _push(`<!---->`);
				_push(`<div class="price-stock" data-v-b715ed20></div></div><div class="info-section" data-v-b715ed20><h2 data-v-b715ed20>${ssrInterpolate(selectedConsole.value.subtitle)}</h2><p data-v-b715ed20>${ssrInterpolate(selectedConsole.value.description)}</p><div class="price-stock" data-v-b715ed20><p class="price" data-v-b715ed20>\$ ${ssrInterpolate(selectedConsole.value.price.toLocaleString())}</p><p class="${ssrRenderClass([{ low: selectedConsole.value.stock <= 3 }, "stock"])}" data-v-b715ed20> Stock: ${ssrInterpolate(selectedConsole.value.stock)}</p></div><ul class="features-list" data-v-b715ed20><!--[-->`);
				ssrRenderList(selectedConsole.value.features, (item, i) => {
					_push(`<li data-v-b715ed20><span class="feature-icon" data-v-b715ed20>✔️</span><span class="feature-text" data-v-b715ed20>${ssrInterpolate(item)}</span></li>`);
				});
				_push(`<!--]--></ul><div class="buttons" data-v-b715ed20><button class="buy whatsapp" data-v-b715ed20>Consultar disponibilidad</button><button class="back" data-v-b715ed20>Volver</button></div></div></div>`);
			} else _push(`<!---->`);
			_push(`</div></div>`);
		};
	}
});
var _sfc_setup = ConsoleDetail_vue_vue_type_script_setup_true_lang_default.setup;
ConsoleDetail_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/ConsoleDetail.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ConsoleDetail_default = /* @__PURE__ */ __plugin_vue_export_helper_default(ConsoleDetail_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-b715ed20"]]);
export { ConsoleDetail_default as default };
