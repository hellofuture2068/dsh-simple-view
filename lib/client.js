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
