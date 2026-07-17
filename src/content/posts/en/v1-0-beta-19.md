---
title: Transcord v1.0-beta.19
date: 2026-07-17
author: txruno
image: posts/transcord-beta.png
---

Transcord has been updated to v1.0-beta.19.

This update refreshes the available AI models and improves translation and feedback features.

## Changes

### Updated AI models
The default AI model has been updated to `Qwen3.6 27B`.

The available AI models have also been streamlined to the following three options:

- Qwen3.6 27B
- OpenAI GPT-OSS 20B
- Google Gemma 4 26B A4B (Preview)

Llama 3.3 and Llama 4 are no longer available in this update. If you previously selected either model, Transcord will automatically use the default model instead.

### Adjusted Reasoning Effort for each model
`Reasoning Effort` now displays only the settings supported by the selected AI model.

- Qwen3.6 27B: Off / On
- OpenAI GPT-OSS 20B: Low / Medium / High
- Google Gemma 4 26B A4B: Off

Unsupported settings are no longer displayed, making it easier to choose the appropriate option for the AI model you are using.

### Improved language search
You can now search for the target language in the `/translate_text` command by its displayed language name as well as its language code.

For example, in an English environment, you can narrow down the suggestions by entering a familiar language name such as “English.”

### Improved translation stability
We adjusted how Qwen handles complex and long text.

We also improved recovery when the AI does not respond in the expected format, reducing the likelihood of translation errors.

### Improved translation feedback
When sending feedback about a translation error, you can now optionally describe what went wrong.

Information included in the feedback, such as the AI response, is now discarded after a short period so it is not retained longer than necessary.

## Lastly

The feedback you send helps us improve translation quality and error handling.
Thank you, as always, for using Transcord.
