---
title: Transcord v1.0-beta.18
date: 2026-06-19
author: txruno
image: posts/transcord-beta.png
---

Transcord has been updated to v1.0-beta.18.

This update focuses on improving the stability and quality of translation results.

## Changes

### Updated Transcord models
The translation models have been updated to `Transcord 2.0` and `Transcord 2.1`.

The latest Transcord 2.1 model has been tuned to better preserve the original meaning while keeping Discord markdown, mentions, emoji, URLs, and other formatting intact.

### Improved translation stability
The format of translation results returned by the AI is now checked more strictly.

This reduces missing or extra fields and lowers the chance of long translations being cut off, providing more stable results even for complex messages.

### Added retry for translation errors
A `Retry` button has been added to the error screen when a translation fails.

Pressing the button attempts the translation again while taking the previous error into account.

### Added Reasoning Effort
We added `Reasoning Effort` as an experimental setting.

When using Transcord 2.1, you can choose how thoroughly the AI checks the translation from `None`, `Low`, `Medium`, or `High`. Higher settings may improve translation accuracy and output format stability for complex text.

## Lastly

We continue to welcome your feedback about translation results and errors.
Thank you for your continued support of Transcord.
