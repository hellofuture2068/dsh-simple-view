/**
* dsh-simple-view host half:
*  - a "简洁要求" (concise instruction) setting namespace, editable from the
*    DSH settings UI (Settings -> Plugins -> dsh-simple-view);
*  - the instruction is injected into the system prompt, so the model keeps
*    its process narration short and leads with the conclusion.
* The visible text lives in the trajectory's "System Prompt" panel.
*/
import z from "@deepseek-ai/schemastery";
import { installSettingsSection, settingsNamespace } from "@deepseek-ai/dsh-settings";

const name = "simple-view";
const CONCISE_NS = settingsNamespace("dsh-simple-view");
/** Default instruction — the user's own wording. */
const DEFAULT_CONCISE = "执行过程的文本要简洁，挑重点的说，否则不要输出，尽量直接给结论。";
/** Settings namespace schema: one free-text field. */
const Config = z.object({
	conciseInstruction: z.string().default(DEFAULT_CONCISE)
});
/** Prompt-section order: inside the guidance band, before most plugin rows. */
const SECTION_ORDER = 120;
/** Required services. */
const inject = ["systemPrompt"];

/**
* Mount the plugin: register the settings namespace (live) and keep the
* system-prompt section in sync with the current instruction.
* @param ctx - host plugin context carrying systemPrompt.
* @param config - resolved plugin config (schema defaults applied by the loader).
*/
function apply(ctx, config) {
	let current = () => config ?? {};
	const resolve = () => ({
		conciseInstruction: current()?.conciseInstruction ?? DEFAULT_CONCISE
	});
	let disposeSection;
	const refresh = () => {
		disposeSection?.();
		disposeSection = void 0;
		const text = resolve().conciseInstruction.trim();
		if (text === "") return;
		disposeSection = ctx.systemPrompt.section({
			name: "plugin:dsh-simple-view",
			order: SECTION_ORDER,
			text
		});
	};
	installSettingsSection(ctx, CONCISE_NS, Config, config ?? {}, {
		setSource: (source) => {
			current = source;
			refresh();
		},
		onChange: refresh
	});
	refresh();
	ctx.effect(() => () => {
		disposeSection?.();
		disposeSection = void 0;
	}, "dsh-simple-view: concise section");
}

export { apply, inject };
