window.__ModuleLoader__.load({
	id: "dsh-simple-view",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		// dsh-simple-view: hide agent execution-log rows in the chat transcript.
		var STYLE_TEXT = "\n" +
		'[data-variant="think"] { display: none !important; }\n' +
		'div:has(> [data-context-injection-body]) { display: none !important; }\n' +
		'[data-tool]:not([data-state="error"]):not([data-tool="ask_user_question"]) { display: none !important; }\n' +
		'[data-sample="bash"]:not([data-state="error"]) { display: none !important; }\n' +
		'[data-chat-flow] { gap: 6px !important; }\n' +
		'div:has(> [data-chat-flow]) { padding-top: 6px !important; }\n' +
		'[data-chat-flow-kind="user"] [data-time-hover-root] > :last-child { height: 20px !important; }\n' +
		'[data-turn-tail] > :last-child { height: 20px !important; }\n' +
		'[data-turn-tail] { gap: 8px !important; margin-top: -6px !important; margin-bottom: -6px !important; }\n' +
		'body { --dsw-font-markdown-base: 14px/22px var(--dsw-font-family); --dsw-font-markdown-base-strong: 600 14px/22px var(--dsw-font-family); --dsw-font-markdown-h1: 700 20px/28px var(--dsw-font-family); --dsw-font-markdown-h2: 700 18px/26px var(--dsw-font-family); --dsw-font-markdown-h3: 700 16px/24px var(--dsw-font-family); --dsw-font-markdown-h4: 600 14px/22px var(--dsw-font-family); --dsw-font-markdown-h1-font-size: 20px; --dsw-font-markdown-h1-line-height: 28px; --dsw-font-markdown-h2-font-size: 18px; --dsw-font-markdown-h2-line-height: 26px; --dsw-font-markdown-h3-font-size: 16px; --dsw-font-markdown-h3-line-height: 24px; --dsw-font-markdown-h4-font-size: 14px; --dsw-font-markdown-h4-line-height: 22px; }\n' +
		'[data-chat-flow] :is(h1,h2,h3,h4,h5,h6) { margin-top: 16px !important; margin-bottom: 8px !important; }\n' +
		'[data-chat-flow] p { margin: 8px 0 !important; }\n' +
		var inject = [];
		function apply(ctx) {
			ctx.effect(function () {
				var style = document.createElement("style");
				style.setAttribute("data-plugin-css", "dsh-simple-view");
				style.textContent = STYLE_TEXT;
				var host = document.head || document.documentElement;
				host.appendChild(style);
				return function () { style.remove(); };
			}, "dsh-simple-view: stylesheet");
		}
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
