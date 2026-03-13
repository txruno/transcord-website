---
title: Transcord v1.0-beta.15
date: 2026-03-13
author: txruno
image: posts/transcord-beta.png
---

Transcord has been updated to v1.0-beta.15.

First, we sincerely apologize for the long delay before this update.
This release involved major internal restructuring, and the development period became longer than usual so we could maintain quality throughout the process.

## Changes

### Framework creation
We refactored the Transcord program into a framework to make future feature development and maintenance easier.
This framework work was the main reason for the significant delay in this update.

### AI model selection (experimental)
You can now choose from multiple AI models for translation.
Because this is an experimental feature, specifications may change in the future, and it may become unavailable depending on circumstances.
![aiModelSetting](/images/posts/v1-0-beta-15/aiModelSetting.png)

### Added Translator command
We added a Translator command that lets you translate more easily through a modal window.
![translatorModal](/images/posts/v1-0-beta-15/translatorModal.jpeg)

### Tone options for translation
You can now specify tone styles such as casual or formal when translating.
![toneOptions](/images/posts/v1-0-beta-15/toneOptions.jpeg)

### AI-related tuning
We tuned TranscordModel and AI parameters so short texts are translated faster and longer texts are translated more accurately.

### Improved translation error messages
When an error occurs, the reason is now shown more clearly.
We also added a feedback button on the error screen so you can report issues to administrators more easily.

### Command cleanup
To keep things simple, we removed very low-usage commands, including the feedback command.

### Updated settings
- Added AI model settings to the Experimental tab.
- Since the automatic translation result sharing feature had already been removed last year, we also removed that setting.

## Bug fixes
- Fixed an issue where translation responses could become significantly delayed.

## About the database update
Due to database updates, some settings may be rolled back.
If your settings were unintentionally reset, please reconfigure them.

## Lastly
I am a student, and I continue developing Transcord while balancing schoolwork.
I will keep working hard to make it better, so your support means a lot.
If you know friends who might be interested, I would really appreciate it if you shared Transcord with them.

Thank you, as always, for using Transcord.