<div align="center">

# dsh-simple-view

**让 DeepSeek Harness 聊天界面更清爽** · Declutter the DeepSeek Harness chat

</div>

---

## 功能 / Features

### 简体中文

- **隐藏执行日志** — 聊天记录里不再显示 Think（思考）、上下文注入/召回、工具调用这些执行行。**报错行**和**向你提问的行**（`ask_user_question`）仍会保留，失败和提问永远不会被吞掉。
- **收紧间距** — 减小消息块之间的间距，去掉每条消息下方多余的空白（操作行 + 助手的 turn-tail 节点）。
- **缩小字号** — markdown 正文、各级标题，以及你消息气泡里的文字都更小了。
- **消息气泡** — 助手回复也被包进一个**方角气泡**（8px 圆角），和你的消息气泡一致。
- **可编辑的"简洁回复"指令** — 在 **设置 → 插件 → dsh-simple-view** 里有一个卡片，可以编辑一段指令；它会注入到每次请求的系统提示词里，让模型少说过程话、直接给结论。

### English

- **Hide execution-log rows** — Think (reasoning), context-injection/recall, and tool-call rows are hidden from the transcript. Error rows and `ask_user_question` rows stay visible, so failures and questions are never lost.
- **Tighter spacing** — reduces the gap between messages and removes the dead space under each one (action rows and the assistant turn-tail node).
- **Smaller fonts** — markdown body text, headings, and user-bubble text.
- **Message bubbles** — assistant replies are wrapped in a squarer-corner (8px) bubble matching your message bubble.
- **Editable "reply concisely" instruction** — a settings card (Settings → Plugins → dsh-simple-view) lets you edit an instruction injected into every request's system prompt, so the model keeps process narration short and leads with the conclusion.

---

## 设置 / Settings

| 字段 / Field | 默认值 / Default |
|-------------|-----------------|
| `conciseInstruction` | `执行过程的文本要简洁，挑重点的说，否则不要输出，尽量直接给结论。` |

该指令会作为 `plugin:dsh-simple-view` 段落注入系统提示词（可在 **轨迹 → System Prompt** 面板查看）。留空则不注入。

The instruction is injected as a `plugin:dsh-simple-view` section into the system prompt (visible in the **Trajectory → System Prompt** panel). Leave it empty to disable injection.

---

## 安装 / Install

作为一个 bundle 加入 DSH profile，或通过 dsh-market 安装。插件自带 `cordis.patch.yml`，装好即自动注册，无需手动配置。

Add the package to a DSH profile as a bundle, or install via the dsh-market. The plugin ships its own `cordis.patch.yml`, so it self-registers — no manual patch row needed.

---

## 结构 / Structure

```
lib/index.js   # 宿主端：设置命名空间 + 系统提示词注入 / host half
lib/client.js  # 浏览器端：CSS 注入 + 设置卡片 / browser half
```

## 许可证 / License

MIT
