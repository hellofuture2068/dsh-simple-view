window.__ModuleLoader__.load({
	id: "dsh-simple-view",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		// dsh-simple-view: hide agent execution-log rows in the chat transcript.
		//   [data-variant="think"]                 -> Think (reasoning) rows
		//   div:has(> [data-context-injection-body]) -> context injection / recall rows
		//   [data-tool] / [data-sample]            -> tool-call rows (Pwsh, Read, ...)
		// Error rows stay visible (failures are never hidden), and the
		// ask_user_question row stays visible because you must answer it.
		//
		// Spacing: tighten the chat flow and remove the dead space under each
		// message (the action rows and the assistant turn-tail node).
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
			// smaller fonts: markdown normal text + headings (assistant replies)
			'body { --dsw-font-markdown-base: 14px/22px var(--dsw-font-family); --dsw-font-markdown-base-strong: 600 14px/22px var(--dsw-font-family); --dsw-font-markdown-h1: 700 20px/28px var(--dsw-font-family); --dsw-font-markdown-h2: 700 18px/26px var(--dsw-font-family); --dsw-font-markdown-h3: 700 16px/24px var(--dsw-font-family); --dsw-font-markdown-h4: 600 14px/22px var(--dsw-font-family); --dsw-font-markdown-h1-font-size: 20px; --dsw-font-markdown-h1-line-height: 28px; --dsw-font-markdown-h2-font-size: 18px; --dsw-font-markdown-h2-line-height: 26px; --dsw-font-markdown-h3-font-size: 16px; --dsw-font-markdown-h3-line-height: 24px; --dsw-font-markdown-h4-font-size: 14px; --dsw-font-markdown-h4-line-height: 22px; }\n' +
			// user message bubble text a touch smaller + squarer corners (matched by the stable "_bubble" class suffix)
			'[data-chat-flow-kind="user"] [class*="_bubble"] { font-size: 14px !important; line-height: 22px !important; border-radius: 8px !important; }\n' +
			// tighten heading and paragraph margins inside messages
			'[data-chat-flow] :is(h1,h2,h3,h4,h5,h6) { margin-top: 16px !important; margin-bottom: 8px !important; }\n' +
			'[data-chat-flow] p { margin: 8px 0 !important; }\n' +
			// assistant replies wrapped in a bubble (squarer corners)
			'[data-chat-flow-kind="assistant-step"] { background: var(--dsw-specific-bubble); border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px !important; padding: 12px 16px !important; }\n' +
			// hide assistant messages with no visible text block (only hidden Think / tool refs) — kills empty bubbles
			'[data-chat-flow-kind="assistant-step"]:not(:has([class*="_markdown"])) { display: none !important; }\n' +
			// produced-file chips also wrapped in a bubble, matching output text color & size
			'[data-produced-files-row] > button { background: var(--dsw-specific-bubble); border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px !important; padding: 7px 14px !important; font-size: 14px !important; color: var(--dsw-alias-label-primary) !important; }\n';
		var inject = ["locale", "settingsScope", "slots"];
		/** Settings namespace this plugin owns (must match the host half). */
		var CONCISE_NS = "dsh-simple-view";
		/** Defensively read the current instruction from the bound settings scope. */
		function snapshotText(scope) {
			try {
				var snap = scope.getSnapshot();
				var v = snap !== null && typeof snap === "object" && snap.value !== void 0 ? snap.value : snap;
				var o = v !== null && typeof v === "object" ? v : {};
				return typeof o.conciseInstruction === "string" ? o.conciseInstruction : "";
			} catch (_e) {
				return "";
			}
		}
		/**
		* Settings card (Settings -> Plugins -> dsh-simple-view): a native-looking
		* card with the concise instruction text area, a Save button, and an
		* untracked/saved status line. Saving writes the settings namespace, and
		* the host half re-injects it into the system prompt immediately.
		* @param props - composed slot props (scope injected below).
		*/
		function SimpleViewCard({ scope }) {
			var state = react.useState(function () {
				return snapshotText(scope);
			});
			var text = state[0];
			var setText = state[1];
			var dirtyState = react.useState(false);
			var dirty = dirtyState[0];
			var setDirty = dirtyState[1];
			var savedState = react.useState(false);
			var saved = savedState[0];
			var setSaved = savedState[1];
			react.useEffect(function () {
				return scope.subscribe(function () {
					setText(snapshotText(scope));
					setDirty(false);
				});
			}, [scope]);
			var saveDisabled = !dirty && !saved;
			function save() {
				scope.set("conciseInstruction", text);
				setDirty(false);
				setSaved(true);
				window.setTimeout(function () {
					setSaved(false);
				}, 2000);
			}
			return react_jsx_runtime.jsxs("div", {
				style: { border: "1px solid var(--dsw-alias-border-l2)", background: "var(--dsw-alias-bg-layer-3)", borderRadius: "12px", overflow: "hidden" },
				children: [
					react_jsx_runtime.jsxs("div", {
						style: { padding: "14px 16px 10px", display: "flex", flexDirection: "column", gap: "4px" },
						children: [
							react_jsx_runtime.jsx("div", { style: { fontSize: "15px", fontWeight: 600, lineHeight: "1.4" }, children: "对模型的简洁要求" }),
							react_jsx_runtime.jsx("div", { style: { fontSize: "13px", lineHeight: "1.5", color: "var(--dsw-alias-label-tertiary)" }, children: "这段指令会注入每次请求的系统提示词（可在「轨迹」页的 System Prompt 看到）。留空则不注入。" })
						]
					}),
					react_jsx_runtime.jsx("div", { style: { borderTop: "1px solid var(--dsw-alias-border-l2)" } }),
					react_jsx_runtime.jsx("div", { style: { padding: "12px 16px" }, children: react_jsx_runtime.jsx("textarea", {
						value: text,
						rows: 3,
						placeholder: "输入对模型的简洁要求…",
						style: { border: "1px solid var(--dsw-alias-border-l2)", background: "var(--dsw-alias-bg-layer-1)", color: "var(--dsw-alias-label-primary)", borderRadius: "8px", padding: "8px 12px", fontSize: "13px", lineHeight: "1.5", fontFamily: "inherit", resize: "vertical", width: "100%", boxSizing: "border-box" },
						onChange: function (e) {
							setText(e.target.value);
							setDirty(true);
						}
					}) }),
					react_jsx_runtime.jsxs("div", {
						style: { borderTop: "1px solid var(--dsw-alias-border-l2)", padding: "10px 16px", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "10px" },
						children: [
							react_jsx_runtime.jsx("span", { style: { fontSize: "12px", color: saved ? "var(--dsw-alias-state-success-primary)" : "var(--dsw-alias-label-tertiary)" }, children: saved ? "已保存 ✓" : (dirty ? "未保存的更改" : "") }),
							react_jsx_runtime.jsx("button", {
								type: "button",
								disabled: saveDisabled,
								onClick: save,
								style: { border: "1px solid var(--dsw-alias-border-l2)", background: "var(--dsw-alias-bg-module-platform)", color: "var(--dsw-alias-label-primary)", borderRadius: "8px", padding: "5px 14px", fontSize: "13px", lineHeight: "1.5", cursor: saveDisabled ? "default" : "pointer", opacity: saveDisabled ? "0.5" : "1" },
								children: "保存"
							})
						]
					})
				]
			});
		}
		/**
		* Client plugin body: mount the stylesheet and register the settings card.
		* @param ctx - client root context.
		*/
		function apply(ctx) {
			ctx.effect(function () {
				var style = document.createElement("style");
				style.setAttribute("data-plugin-css", "dsh-simple-view");
				style.textContent = STYLE_TEXT;
				var host = document.head || document.documentElement;
				host.appendChild(style);
				return function () {
					style.remove();
				};
			}, "dsh-simple-view: stylesheet");
			var scope = ctx.settingsScope.bind({ namespace: CONCISE_NS });
			ctx.slots.inject("settings.plugin.item", function () {
				return ctx.slots.register({
					name: "settings.plugin.item",
					key: CONCISE_NS,
					inject: function () {
						return { scope };
					}
				}, SimpleViewCard);
			});
		}
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
