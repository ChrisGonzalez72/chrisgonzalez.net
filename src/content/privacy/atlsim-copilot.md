---
app: atlsim-copilot
effective: 2026-11-05
summary: ATLsim – CoPilot Checklist keeps your checklists, settings and voice on your PC. If you choose to sign in to the optional Community feature, an account, your display name and what you share are stored.
---

This policy covers **CoPilot Checklist**, part of the ATLsim – CoPilot series for Windows, distributed through the Microsoft Store and made by Chris Gonzalez, an independent developer ("I", "me"). It explains what information the app uses, where it is kept, and the choices you have.

## The short version

- Your checklists, aircraft and settings stay on your PC.
- Your voice is recognized on your PC by Windows. It is never recorded, kept or sent anywhere.
- The app has no advertising, no analytics and no tracking, and it doesn’t send error reports to me or anyone else.
- The optional **Community** feature is the only part that connects to a service. Browsing and downloading shared aircraft needs no account. If you sign in, share an aircraft or rate one, the information listed under “The optional Community feature” below is stored.

## Information that stays on your PC

CoPilot Checklist stores the following in your Windows user profile, in the `CoPilot-Checklist` folder under `%LOCALAPPDATA%`:

- **Your checklists and aircraft**, including the ones you create.
- **Your settings**: voice, speech speed, recognition confidence, theme, and window size and position.
- **A log file** of errors the app runs into, to help with troubleshooting. It is replaced each time the app starts, only the last five are kept, and it never leaves your PC unless you choose to send it to me, for example by attaching it to a support email.

This information is protected by your Windows account. I can’t see or access any of it.

## Microphone and voice

CoPilot Checklist uses your microphone to hear your checklist responses and voice commands. Windows asks for your permission first, and you can turn microphone access off at any time in **Windows Settings → Privacy & security → Microphone**.

Speech recognition and speech use the speech engines built into Windows and run on your PC. CoPilot Checklist does not record or keep audio, and no audio or recognized speech is sent to me or anyone else. You can stop the app listening at any time by saying “Stop listening”.

## The optional Community feature

CoPilot Checklist connects to the service I run only when you use the Community page. You can browse and download aircraft other people have shared without an account. If you choose to **sign in**, share an aircraft, or rate one, the following is stored:

| What | Why | Where |
|---|---|---|
| A sign-in account, created by you at sign-in: your email address | So you can sign in | Microsoft Entra External ID (Microsoft) |
| A user ID (an opaque identifier from your account) | To tie shared aircraft and ratings to you, so only you can change or remove them | The service’s database (Azure Cosmos DB) |
| Your display name, as shown on your account | Shown to others as the author of aircraft you share | The service’s database |
| Aircraft you share: names, notes and checklists | So others can download them | The service’s database |
| Ratings you give (1 to 5 stars) | To show each aircraft’s average rating | The service’s database |
| Technical logs: your user ID, never your name, email, sign-in token or what you shared | To keep the service working and secure | Azure Application Insights |

Aircraft you share, your display name and the average rating are visible to everyone using the Community page. Don’t put personal information in a shared aircraft.

Sign-in uses your web browser and Microsoft’s sign-in service; the app never sees your password. The service checks every sign-in token before it accepts a request. To limit abuse, the service briefly keeps your network address in memory to count requests; it is never logged or stored.

Data is kept until you delete it. Deleted data may remain in database backups for a short time. The service is hosted in Microsoft Azure in [REGION]. Nothing is sold or shared with anyone except Microsoft, which hosts the service.

## Cloud Checklists (retired)

Earlier versions offered Cloud Checklists, which sent a username, email address and shared checklists to a previous web service, and sent error reports to the Loggly logging service. Both were shut down, and the registrations, shared checklists and error reports they held are no longer kept. Community is a new, separate service and does not use that data. If you still have an older version, its Cloud Checklists screens no longer work. Update the app from the Microsoft Store to remove them.

## Microsoft

You download and update CoPilot Checklist through the Microsoft Store. Microsoft handles that, and may give me aggregated, non-identifying reports such as install counts and crash summaries. Microsoft processes that information under the [Microsoft Privacy Statement](https://privacy.microsoft.com/privacystatement), not this policy.

## Sharing and selling

I don’t sell or rent information about you. The only information the service holds is what you choose to share through Community, described above.

## Your choices

- **Don’t sign in.** Everything except sharing and rating works without an account.
- **Stop sharing** an aircraft at any time from the Community page. It is removed, along with its ratings. People who already downloaded it keep their copies.
- **Delete everything.** “Delete all my community data” on the Community page removes every aircraft you shared and every rating you gave. To close the sign-in account itself, email [support@chrisgonzalez.net](mailto:support@chrisgonzalez.net?subject=CoPilot%20Checklist%20account%20deletion) and I’ll delete it within 30 days.
- **Sign out** to remove the saved sign-in from your PC.
- **Turn off the microphone** in Windows Settings at any time.
- **Remove local data** by uninstalling the app and, if it remains, deleting the `CoPilot-Checklist` folder in `%LOCALAPPDATA%`.
- **Ask me anything** about your information at [support@chrisgonzalez.net](mailto:support@chrisgonzalez.net?subject=CoPilot%20Checklist%20privacy%20request). I’ll reply within 30 days.

## Children

CoPilot Checklist is not directed at children under 13 (or the minimum age in your country). The app doesn’t knowingly collect information from children.

## Changes to this policy

I will keep this policy up to date as the app changes. If the way CoPilot Checklist handles information changes, I’ll update this page before the change takes effect and change the effective date above.

## Contact

Questions about privacy: [support@chrisgonzalez.net](mailto:support@chrisgonzalez.net?subject=CoPilot%20Checklist%20privacy).
