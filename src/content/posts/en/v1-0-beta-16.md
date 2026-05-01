---
title: Transcord v1.0-beta.16
date: 2026-05-01
author: txruno
image: posts/transcord-beta.png
---

Transcord has been updated to v1.0-beta.16.

## Changes

### Updated the frameworks
We updated both Transcord’s main framework and the Discord framework to the latest versions.

### Stabilized AI-related processing
We reviewed error handling and prompt building to make AI-related processing run more reliably.

### Updated the Transcord model
We updated the AI responsible for Transcord’s main translation.
The initial model has been changed from gemma3 27b to gemma4 26b.

### Stabilized command registration
We fixed command registration failures and improved stability so commands are registered reliably after the framework update.