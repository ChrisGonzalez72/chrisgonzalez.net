---
app: on-record
effective: 2026-10-23
summary: How On Record handles your recordings, transcripts and other information. On Record has no servers, no account and no analytics; your meetings are processed on your own Mac.
---

This policy explains what happens to your information when you use **On Record** on Mac, iPhone, iPad and Apple Watch. On Record is made by Chris Gonzalez, an independent developer ("I", "me").

The short version: **I don’t collect your data.** On Record has no On Record servers, no user accounts, no analytics, no crash-reporting service and no advertising. Your recordings and everything made from them stay on your devices and in your own iCloud account, which I cannot access.

## What On Record stores, and where

On Record keeps the following on your devices:

- **Recordings** you make or import, and the original audio.
- **Transcripts**, including the original transcript and any corrections you make.
- **What On Record writes from them**: summaries, notes, decisions, action items, and the answers to questions you ask.
- **People and voice profiles** — the names you give speakers, and the voice profiles On Record uses to suggest them in future meetings. Voice profiles stay on your Mac and are not synced.
- **Your organisation and settings**: series, projects, courses, vocabulary and preferences.

### Syncing between your devices

When you use On Record on more than one device, recordings, meetings and results travel between them through **your own iCloud account** (Apple’s CloudKit private database). On a Mac, meeting audio is synced as a compressed copy. This data is stored by Apple under your Apple Account and is governed by [Apple’s privacy policy](https://www.apple.com/legal/privacy/). I have no access to it.

## How your meetings are processed

Transcription, speaker detection and AI writing run **on your Mac**, using models you download once. Your meetings are not sent to an AI service and are never used to train AI models.

- **Model downloads.** When you choose to download a model in Settings → Models, your Mac downloads the model files directly from Hugging Face (huggingface.co) over HTTPS. The request fetches the files only; no meeting content or personal information is sent. As with any website, Hugging Face receives your IP address when your Mac connects to it.
- **Spoken questions.** If you speak a question to Ask, it is turned into text by Apple’s speech recognition **on your device**. Where on-device recognition is not available, the microphone button is not offered, so no audio is sent to Apple.

## Permissions On Record asks for

| Permission | Why |
|---|---|
| Microphone (Mac, iPhone, iPad, Apple Watch) | To record the meetings you choose to capture. |
| System audio recording (Mac) | To record what other apps play during a meeting, such as a Zoom or Teams call, together with your microphone. |
| Calendars (Mac, optional) | When you switch it on, to name a recording after the calendar event happening when you press Record. The event is read on your Mac and not sent anywhere. |
| Speech recognition (Mac, iPhone, iPad) | To turn a question you speak to Ask into text on your device. The audio isn’t kept. |

You can change these permissions at any time in your device’s Settings.

## Diagnostics

On Record keeps a diagnostic log on your device. It does not contain meeting content. It is never sent automatically; on iPhone you can choose to share it yourself (Settings → Diagnostics), for example when asking for help.

## Sharing and exporting

Apart from syncing through your own iCloud, as described above, nothing is shared unless you choose to. If you export a meeting as a PDF or text — with or without the transcript and original audio — you decide where it goes.

## Recording other people

Recording laws differ by place. You are responsible for following the law where you are and for getting people’s consent before recording them.

## App Store

On Record is distributed through Apple’s App Store. Apple handles downloads and any purchases under its own terms and [privacy policy](https://www.apple.com/legal/privacy/). I receive only the aggregated sales and usage reports Apple provides to developers, which do not identify you.

## Children

On Record is not directed at children and does not knowingly collect information from anyone.

## Your rights and choices

Because I don’t collect or hold your personal data, there is nothing for me to access, correct or delete on your behalf. You control your data directly: delete a meeting in On Record and everything made exclusively from it is deleted with it, and you can manage On Record’s iCloud data in your device’s iCloud settings. Deleting the app removes its data from that device.

If you contact me by email, I use your message only to reply to you, and I delete it when it is no longer needed. You can ask me to delete our correspondence at any time.

## Changes to this policy

If On Record’s handling of information changes — for example, if a future version adds an optional online feature — this policy will be updated before that version is released, and the effective date above will change.

## Contact

Questions about privacy: [support@chrisgonzalez.net](mailto:support@chrisgonzalez.net?subject=On%20Record%20privacy).
