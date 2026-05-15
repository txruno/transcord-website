---
title: Transcord v1.0-beta.17
date: 2026-05-15
author: txruno
image: posts/transcord-beta.png
---

Transcord has been updated to v1.0-beta.17.

This release focuses on fixing AI-related errors and improving quality based on the feedback we received from all of you.

## Changes

### Fixed AI-related errors
Based on user feedback, we fixed the frequent `invalid_ai_response` errors related to AI processing. The reliability of translation has been significantly improved.

### Localized error messages
Error messages that were previously only displayed in English are now localized to each language. When using Transcord in a different language, error details now appear in that language, making it easier to understand what went wrong.

### Unified responses across translation commands
The AI response handling that was previously implemented separately for each translation command has been consolidated, resulting in more consistent behavior and stable output.

### Started recording statistics
We now record statistics such as ping. (A status page is planned for release soon.)
![statusPage.png](/images/posts/v1-0-beta-17/statusPage.png)

### Added `includeAiResponse` experimental setting
A new experimental setting, `includeAiResponse`, has been added. When enabled, detailed information about the AI model used and response time will be displayed in the translation result footer.
![translateFooter](/images/posts/v1-0-beta-17/footer.png)

### Updated frameworks to the latest versions
The frameworks powering Transcord have been updated to the latest versions, improving security and performance.

### Code optimization
Overall code optimization has been carried out to ensure more stable processing.

## Lastly

We continue to welcome your feedback. Your voice helps make Transcord better.
Thank you for your continued support of Transcord.
