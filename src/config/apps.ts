/**
 * The product registry. Every product page, card, download button, support
 * page and sitemap entry is generated from this file, so launching a new app
 * means adding one entry here (plus its privacy policy in src/content/privacy/).
 *
 * Accuracy rule: every claim below was checked against the app's source code
 * or its approved App Store copy. Change the copy when the app changes.
 */
import type { ImageMetadata } from 'astro';

import orSummary from '../assets/apps/on-record/iphone-summary.png';
import orTranscript from '../assets/apps/on-record/iphone-transcript.png';
import orActions from '../assets/apps/on-record/iphone-actions.png';
import orMeetings from '../assets/apps/on-record/iphone-meetings.png';
import orDecisions from '../assets/apps/on-record/iphone-decisions.png';
import orAsk from '../assets/apps/on-record/iphone-ask.png';
import orMacSummary from '../assets/apps/on-record/mac-summary.png';
import orMacTranscript from '../assets/apps/on-record/mac-transcript.png';
import orMacAsk from '../assets/apps/on-record/mac-ask.png';
import orMacMeetings from '../assets/apps/on-record/mac-meetings.png';
import orMacPeople from '../assets/apps/on-record/mac-people.png';
import orWatch from '../assets/apps/on-record/watch-home.png';

import pbHome from '../assets/apps/pilot-buddy/home-dark.png';
import pbTurn from '../assets/apps/pilot-buddy/turn-dark.png';
import pbWind from '../assets/apps/pilot-buddy/crosswind-dark.png';
import pbAirport from '../assets/apps/pilot-buddy/airport-dark.png';
import pbHomeLight from '../assets/apps/pilot-buddy/home-light.png';

import cpRun from '../assets/apps/atlsim-copilot/run-checklist.png';
import cpManager from '../assets/apps/atlsim-copilot/checklist-manager.png';
import cpVoice from '../assets/apps/atlsim-copilot/voice-commands.png';
import cpSettings from '../assets/apps/atlsim-copilot/settings.png';

export type Platform = 'mac' | 'iphone' | 'ipad' | 'watch' | 'android' | 'windows';

export const platformLabels: Record<Platform, string> = {
  mac: 'Mac',
  iphone: 'iPhone',
  ipad: 'iPad',
  watch: 'Apple Watch',
  android: 'Android',
  windows: 'Windows',
};

/**
 * available   – live in a store; download buttons link to it
 * coming-soon – store listing exists but is not released yet
 * unavailable – not distributed at the moment (no download offered)
 */
export type ReleaseStatus = 'available' | 'coming-soon' | 'unavailable';

export type StoreKind = 'app-store' | 'mac-app-store' | 'google-play' | 'microsoft-store';

export interface StoreLink {
  kind: StoreKind;
  /** Verified listing URL. Leave undefined until the listing is public. */
  url?: string;
  platforms: Platform[];
}

export interface Screenshot {
  src: ImageMetadata;
  alt: string;
  /** phone/watch get a CSS device frame; window/raw are shown as-is. */
  frame: 'phone' | 'window' | 'watch' | 'raw';
  caption?: string;
}

export interface Feature {
  title: string;
  body: string;
  /** Short list of supporting details. */
  points?: string[];
  shot?: Screenshot;
}

export interface Faq {
  q: string;
  a: string;
}

export interface App {
  slug: string;
  name: string;
  /** Used in compact UI like the nav and cards. */
  shortName: string;
  tagline: string;
  /** One or two sentences for cards and meta descriptions. */
  summary: string;
  /** SEO <title> override for the product page. */
  seoTitle: string;
  flagship?: boolean;
  icon: string;
  iconAlt: string;
  /** Brand accent (hex) and a readable on-accent text colour. */
  accent: string;
  onAccent: string;
  platforms: Platform[];
  status: ReleaseStatus;
  statusNote: string;
  stores: StoreLink[];
  /** schema.org SoftwareApplication fields */
  applicationCategory: string;
  operatingSystem: string;
  requirements: string[];
  hero: Screenshot;
  overview: string[];
  features: Feature[];
  useCases: { title: string; body: string }[];
  gallery: Screenshot[];
  faq: Faq[];
  /** Troubleshooting entries for the support page. */
  support: Faq[];
  /** Plain-language privacy highlights; the full policy lives in src/content/privacy/<slug>.md */
  privacyHighlights: string[];
  /** Shown on product and support pages when relevant (e.g. safety). */
  disclaimer?: string;
}

export const apps: App[] = [
  {
    slug: 'on-record',
    name: 'On Record',
    shortName: 'On Record',
    tagline: 'Meeting notes you can check, written with Apple Intelligence.',
    summary:
      'On Record listens to your meetings and writes them up — summary, decisions, action items and a full transcript — with every point linked to the moment it was said. No account, no On Record servers and no meeting bot.',
    seoTitle: 'On Record — AI Meeting Notes You Can Check, for Mac, iPhone, iPad & Apple Watch',
    flagship: true,
    icon: '/icons/on-record.svg',
    iconAlt: 'On Record app icon: coral audio bars turning into navy lines of notes',
    accent: '#E5484D',
    onAccent: '#FFFFFF',
    platforms: ['mac', 'iphone', 'ipad', 'watch'],
    status: 'coming-soon',
    statusNote: 'Coming soon to the App Store',
    stores: [
      // The listing (id6822120030) exists but is not public yet (it returned 404 on 2026-11-04).
      // When it goes live: set url to 'https://apps.apple.com/app/id6822120030' and status to 'available'.
      { kind: 'app-store', url: undefined, platforms: ['mac', 'iphone', 'ipad', 'watch'] },
    ],
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'macOS 27, iOS 27, iPadOS 27, watchOS',
    requirements: [
      'Summaries, actions, decisions and Ask need a Mac, iPhone or iPad with Apple Intelligence turned on, running macOS 27, iOS 27 or iPadOS 27, and an internet connection.',
      'Any of your devices can do the work. Signed in to the same iCloud account, your library syncs between them, and a meeting recorded on one device can be written up on another.',
      'Without Apple Intelligence, a device still records, transcribes where Apple’s speech recognition supports it, plays and searches. Another of your devices with Apple Intelligence writes the meetings up.',
      'Apple Watch records through your iPhone.',
      'Made for meetings in English.',
    ],
    hero: { src: orSummary, alt: 'On Record on iPhone showing the summary of a meeting called Q4 Launch Planning, with each topic linked to its source in the recording', frame: 'phone' },
    overview: [
      'On Record listens to your meetings and writes them up: a clear summary, the decisions that were made, the action items with owners and due dates, and a full transcript with who said what.',
      'Every point links back to the exact moment it was said, so you can check it with one tap instead of taking the AI’s word for it.',
      'Transcription and speaker detection run on your device. To write summaries, actions and answers, On Record sends the transcript text to Apple’s Private Cloud Compute, which doesn’t keep it — and only if you turn this on. Audio and voices are never sent to any AI service. No account to create, no On Record servers, and no meeting bot joining your calls.',
    ],
    features: [
      {
        title: 'Check every point',
        body: 'Each summary point, decision and action item links to the moment in the recording. Tap to hear it, or jump to that line in the transcript.',
        points: ['Correct the transcript any time — the original is always kept.'],
        shot: { src: orTranscript, alt: 'On Record transcript on iPhone, split by speaker, with a play button on every line', frame: 'phone' },
      },
      {
        title: 'Never lose an action item',
        body: 'Who owes what, and by when — each action item carries its owner, due date and a link to the moment it was agreed.',
        points: ['Decisions are kept apart from the discussion.', 'Every decision from every meeting in one place.'],
        shot: { src: orActions, alt: 'On Record action items on iPhone with owners, due dates and links to the recording', frame: 'phone' },
      },
      {
        title: 'Private by design',
        body: 'Transcription and speaker detection run on your device. Summaries, actions and answers are written by Apple Intelligence on Apple’s Private Cloud Compute, which doesn’t keep your transcript. Audio and voices are never sent to any AI service.',
        points: [
          'Your library syncs between your own devices through your iCloud account, with recordings and voice profiles encrypted with your own library key.',
          'No account, no On Record servers, no meeting bot. On Record collects no data.',
        ],
        shot: { src: orMacSummary, alt: 'On Record for Mac showing a meeting summary with topics, decisions and actions, each with a link to its moment', frame: 'window' },
      },
      {
        title: 'Ask your meetings',
        body: 'Type or say a question — “What did we decide about the launch date?” or “What did I promise Priya?” — and get a straight answer with links to the moments it came from. If your meetings don’t answer it, On Record says so instead of guessing.',
        shot: { src: orAsk, alt: 'Ask in On Record on iPhone, answering a question with quotes from the meetings it came from', frame: 'phone' },
      },
    ],
    useCases: [
      { title: 'Team meetings', body: 'Leave with the decisions and the action items already written down, with owners and due dates wherever they were said.' },
      { title: 'Client and sales calls', body: 'Record your microphone together with the call audio from Zoom, Teams, Webex or any other app on your Mac.' },
      { title: 'Interviews', body: 'A transcript split by speaker, where every line plays back the moment it was said.' },
      { title: 'Lectures and courses', body: 'Start a recording from Apple Watch. With On Record Pro, group lectures into courses and ask questions across all of them.' },
    ],
    gallery: [
      { src: orMacTranscript, alt: 'On Record for Mac transcript view, split by speaker with timestamps', frame: 'window', caption: 'Know exactly who said what.' },
      { src: orMacAsk, alt: 'Ask on the Mac answering What did we decide about offline mode? with quoted sources', frame: 'window', caption: 'Answers with the moments they came from.' },
      { src: orMacMeetings, alt: 'On Record for Mac Home list of recent meetings with action and decision counts', frame: 'window', caption: 'Every meeting, written up.' },
      { src: orMacPeople, alt: 'On Record for Mac People list showing everyone you meet with', frame: 'window', caption: 'Name a voice once; it’s recognized in later meetings.' },
      { src: orDecisions, alt: 'On Record Library on iPhone listing decisions from every meeting', frame: 'phone', caption: 'Every decision in one place.' },
      { src: orMeetings, alt: 'On Record Meetings list on iPhone, each meeting saved on this iPhone and ready', frame: 'phone', caption: 'Record wherever you are.' },
      { src: orWatch, alt: 'On Record on Apple Watch with a large Record button and today’s action', frame: 'watch', caption: 'Start, pause and stop from your wrist.' },
    ],
    faq: [
      {
        q: 'Do I need a Mac?',
        a: 'No. A Mac, iPhone or iPad with Apple Intelligence, running macOS 27, iOS 27 or iPadOS 27, writes up your meetings. Any of your devices can do the work, and the others show the results. Apple Watch records through your iPhone.',
      },
      {
        q: 'What is sent to Apple Intelligence?',
        a: 'The transcript text, the vocabulary and names you entered, and your questions go to Apple’s Private Cloud Compute, which doesn’t keep them — and only if you turn this on. Audio and voices are never sent to any AI service.',
      },
      {
        q: 'Where do my recordings go?',
        a: 'They stay on your devices and in your own iCloud account. Your library syncs between your devices through your iCloud private database, and recordings are encrypted with your own library key before they leave your device. There is no On Record server.',
      },
      {
        q: 'Is it free?',
        a: 'Free gives you unlimited recording and transcripts, and the full write-up and Ask on 5 meetings. On Record Pro is a one-time purchase for all your devices, shared with your family. It adds write-ups on every meeting, Ask across meetings, series, projects and courses, and more.',
      },
      {
        q: 'Do I need an account?',
        a: 'No. On Record has no sign-up and no login.',
      },
      {
        q: 'Does a bot join my calls?',
        a: 'No. On the Mac, On Record records your microphone together with the audio other apps play — such as a Zoom, Teams or Webex call. Nothing joins the meeting.',
      },
      {
        q: 'Which languages are supported?',
        a: 'On Record is made for meetings in English.',
      },
      {
        q: 'Can I share a meeting?',
        a: 'Yes, when you choose to. With On Record Pro, export a meeting as a PDF, Markdown or text and send it however you like. It goes only where you send it.',
      },
      {
        q: 'Is it legal to record a meeting?',
        a: 'Recording laws differ by place. Follow the law where you are and get people’s consent before recording them.',
      },
    ],
    support: [
      {
        q: 'How do I get started?',
        a: 'Open On Record. When it explains how it uses Apple Intelligence, tap Turn On (you can change this later in Settings). Press Record during a meeting — on the Mac you can also choose File → Import Audio… or drop an audio file on the Meetings list. Then open the meeting for its Summary, Notes, Actions, Decisions and Transcript, and tap or click a time to hear the moment it came from.',
      },
      {
        q: 'A meeting says “Apple’s daily limit reached”',
        a: 'Apple limits how much Private Cloud Compute each person can use in a day. Your transcript is ready, and On Record finishes the meeting on its own later. Nothing is lost.',
      },
      {
        q: 'A meeting says “Waiting for an Apple Intelligence device”',
        a: 'This device can’t write it up. Open On Record on a Mac, iPhone or iPad with Apple Intelligence, signed in to the same iCloud account. If the device supports Apple Intelligence but runs an older system, update it to version 27.',
      },
      {
        q: 'A meeting says “Transcript ready” with no summary',
        a: 'Apple Intelligence processing is off. Turn it on in Settings → Privacy & Apple Intelligence (Mac) or Settings → Apple Intelligence (iPhone and iPad), or turn on Apple Intelligence in your device’s Settings.',
      },
      {
        q: 'A meeting says “Part declined”',
        a: 'Apple’s service declined part of the meeting. Use Retry this part. The rest of the meeting is kept.',
      },
      {
        q: 'My meetings don’t appear on my other device',
        a: 'Check that both devices use the same iCloud account and that iCloud is on for On Record. On the Mac, Settings → Sync → Sync Now checks right away. Recordings and voice profiles also need iCloud Keychain, which holds the key that opens them.',
      },
      {
        q: 'The Mac doesn’t record the call audio',
        a: 'Turn on other apps’ audio in Settings → Recording, and allow it when macOS asks, or in System Settings → Privacy & Security.',
      },
      {
        q: 'Who said what is wrong',
        a: 'Open the meeting and name the speakers. With Pro, named voices are recognized in later meetings.',
      },
      {
        q: 'A word or name is transcribed wrong',
        a: 'Correct the line in the transcript. The original is always kept. You can also add the word to your vocabulary so it’s spelled right next time.',
      },
      {
        q: 'How do I stop syncing voice profiles?',
        a: 'Turn off Voice profiles under What Syncs in Settings. Deleting a voice profile deletes it on all your devices.',
      },
      {
        q: 'How do I delete a meeting?',
        a: 'On the Mac, open it and choose Delete Meeting…. On iPhone or iPad, use Delete Everywhere. It’s removed from all your devices and from your iCloud.',
      },
      {
        q: 'How do I buy or restore On Record Pro?',
        a: 'On iPhone and iPad, go to Settings → On Record Pro; on the Mac, Settings → Privacy & Apple Intelligence → On Record Pro. Use Restore Purchases on a new device. Meetings that waited for Pro are processed after you buy it. Free includes the full write-up and Ask on 5 meetings, counted across all your devices; deleting a meeting doesn’t give one back.',
      },
      {
        q: 'How do I send diagnostics?',
        a: 'The diagnostics list what the app did, with error codes and counts only, and never include meeting content. Copy them from the Diagnostics section of Settings (on the Mac, Settings → Advanced) and paste them into an email to us.',
      },
    ],
    privacyHighlights: [
      'No account, no On Record servers, no analytics, no advertising, no tracking.',
      'Transcription and speaker detection run on your device.',
      'Only transcript text, context you enter and your questions go to Apple’s Private Cloud Compute — and only if you turn it on.',
      'Audio and voices are never sent to any AI service.',
      'Your library syncs only through your own iCloud account.',
    ],
  },
  {
    slug: 'pilot-buddy',
    name: 'Pilot Buddy',
    shortName: 'Pilot Buddy',
    tagline: 'Your flight sim co-pilot.',
    summary:
      'Three tools flight simmers reach for most — course reversal headings, crosswind and headwind components, and airport runways and frequencies — in one offline app for iPhone, iPad and Android. For flight simulator use only.',
    seoTitle: 'Pilot Buddy — Crosswind, Turn & Airport Reference for Flight Simulators (iPhone, iPad, Android)',
    icon: '/icons/pilot-buddy.png',
    iconAlt: 'Pilot Buddy logo: a headset with a check mark',
    accent: '#5B7BE0',
    onAccent: '#FFFFFF',
    platforms: ['iphone', 'ipad', 'android'],
    status: 'coming-soon',
    statusNote: 'Coming soon to the App Store and Google Play',
    stores: [
      // When it goes live: set url to 'https://apps.apple.com/app/id6828184019' and status to 'available'.
      { kind: 'app-store', url: undefined, platforms: ['iphone', 'ipad'] },
      { kind: 'google-play', url: undefined, platforms: ['android'] },
    ],
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'iOS 17, iPadOS 17, Android 7.1',
    requirements: [
      'iPhone or iPad with iOS 17 or iPadOS 17 or later.',
      'Android 7.1 or later, phone or tablet.',
      'No internet connection needed.',
      'For use with flight simulation software only.',
    ],
    hero: { src: pbHome, alt: 'Pilot Buddy home screen with Turn Calculator, Crosswind Calculator and Airport Information buttons', frame: 'raw' },
    overview: [
      'In a flight simulator you often work wind-triangle maths on a paper E6B, look up runways in one place and frequencies in another, and do course reversal headings in your head — usually while the sim keeps flying.',
      'Pilot Buddy puts the three most-used calculations and references into one app on your phone or tablet, so the answer is on screen as soon as you finish typing.',
      'Everything is calculated on the device, and airport data ships inside the app, so it works without a connection. Pilot Buddy is for flight simulation only and is not for real-world navigation.',
    ],
    features: [
      {
        title: 'Turn calculator',
        body: 'Enter your current heading and see the heading after a 90°, 180° and 270° turn — handy for procedure turns and course reversals.',
        shot: { src: pbTurn, alt: 'Pilot Buddy Turn Calculator with result fields for 90, 180 and 270 degree turns', frame: 'raw' },
      },
      {
        title: 'Crosswind calculator',
        body: 'Enter the runway or aircraft heading, the wind direction and the wind speed in knots. Pilot Buddy shows the headwind or tailwind component and the crosswind component, and which side it comes from.',
        shot: { src: pbWind, alt: 'Pilot Buddy Crosswind Calculator with heading, wind direction and wind speed inputs', frame: 'raw' },
      },
      {
        title: 'Airport information',
        body: 'Type or pick an airport identifier to see its runways — designator, length and surface — and its radio frequencies, such as ATIS, ground and tower.',
        points: ['About 48,000 airports in the built-in database.', 'Works offline: the data is stored on your device.'],
        shot: { src: pbAirport, alt: 'Pilot Buddy Airport Information screen with an airport identifier search field', frame: 'raw' },
      },
    ],
    useCases: [
      { title: 'Sim flight planning', body: 'Check the crosswind for each runway before you pick one for your simulated departure or arrival.' },
      { title: 'Learning in the sim', body: 'Check your E6B and mental-maths answers while you practise in a simulator.' },
      { title: 'Quick airport reference', body: 'Look up a runway length or a frequency for your sim flight without leaving the cockpit view.' },
    ],
    gallery: [
      { src: pbHomeLight, alt: 'Pilot Buddy home screen in the light theme', frame: 'raw', caption: 'Light and dark themes.' },
    ],
    faq: [
      { q: 'Does Pilot Buddy need an internet connection?', a: 'No. Calculations run on your device and the airport database is built into the app.' },
      { q: 'Which airports are included?', a: 'The built-in database has about 48,000 airports worldwide, each with its runways and the frequencies on record.' },
      { q: 'Can I use Pilot Buddy for real flights?', a: 'No. Pilot Buddy is for flight simulation only. Its data may be inaccurate, incomplete or out of date, and it is not approved for real-world flight planning or navigation.' },
      { q: 'When will it be on the App Store and Google Play?', a: 'Pilot Buddy is coming soon to both. Releases will be announced on this site.' },
    ],
    support: [
      { q: 'An airport is missing or its data is out of date', a: 'Airport data is a static dataset bundled with the app and may not reflect recent changes. Email the identifier and what looks wrong.' },
      { q: 'The calculator shows an error', a: 'Headings and wind directions must be whole degrees from 0 to 359, and wind speed must be a number of knots.' },
    ],
    privacyHighlights: [
      'Pilot Buddy makes no network connections; on Android it requests no permissions — not even internet access.',
      'It cannot send any information off your device.',
      'No account, no analytics, no advertising.',
    ],
    disclaimer:
      'For flight simulator use only. Pilot Buddy is not approved for real-world flight planning, navigation or any operational aviation use. Its information may be inaccurate, incomplete or out of date. Never use it in place of official charts, certified avionics, NOTAMs or guidance from air traffic control.',
  },
  {
    slug: 'atlsim-copilot',
    name: 'ATLsim – CoPilot',
    shortName: 'ATLsim CoPilot',
    tagline: 'A voice-controlled checklist co-pilot for your flight simulator.',
    summary:
      'CoPilot Checklist reads your aircraft checklists aloud and listens for your responses, so you can run challenge-and-response checklists hands-free in your Windows flight simulator.',
    seoTitle: 'ATLsim – CoPilot Checklist — Voice-Controlled Flight Simulator Checklists for Windows',
    icon: '/icons/atlsim-copilot.png',
    iconAlt: 'CoPilot Checklist logo: a headset with a check mark',
    accent: '#2D8CFF',
    onAccent: '#FFFFFF',
    platforms: ['windows'],
    status: 'available',
    statusNote: 'Available on the Microsoft Store',
    // Microsoft Store product ID 9P5HVJ5X6V9J (deep link: ms-windows-store://pdp/?productid=9P5HVJ5X6V9J).
    // The web URL is used because it works on every OS and hands off to the Store app on Windows.
    stores: [{ kind: 'microsoft-store', url: 'https://apps.microsoft.com/detail/9P5HVJ5X6V9J', platforms: ['windows'] }],
    applicationCategory: 'GameApplication',
    operatingSystem: 'Windows 10 or later',
    requirements: [
      'Windows 10 (version 1607) or later.',
      'A microphone and speakers or headset.',
      'Uses the speech voices installed in Windows.',
      'Works offline: no account or internet connection needed.',
    ],
    hero: { src: cpRun, alt: 'CoPilot Checklist running a Cessna Citation preflight checklist, with completed items ticked', frame: 'raw' },
    overview: [
      'CoPilot Checklist is part of the ATLsim CoPilot series of flight simulator add-ons. It acts as your first officer for checklists: it reads each challenge aloud, listens for your response, and moves on.',
      'Build checklists for any aircraft and run them by voice. Everything stays on your PC.',
    ],
    features: [
      {
        title: 'Hands-free challenge and response',
        body: 'Say “Start checklist” and CoPilot reads each item aloud and waits for a valid response. Skip, repeat, go back, pause or reset — all by voice.',
        points: ['“Load aircraft …”, “Start checklist …”, “Next checklist”', '“Say commands” lists what you can say at any time.', '“Stop listening” mutes the microphone until you say “Start listening”.'],
        shot: { src: cpVoice, alt: 'CoPilot Checklist help page listing global and checklist voice commands', frame: 'raw' },
      },
      {
        title: 'Checklist Manager',
        body: 'Create aircraft and checklists, add steps with their valid responses, reorder them, and copy an aircraft or checklist as a starting point for a new one.',
        shot: { src: cpManager, alt: 'CoPilot Checklist Manager editing a preflight checklist with challenges and valid responses', frame: 'raw' },
      },
      {
        title: 'Make it sound right',
        body: 'Pick the voice, set the speaking speed, and tune how confident speech recognition must be before it accepts a response. Light, dark and high-contrast themes.',
        shot: { src: cpSettings, alt: 'CoPilot Checklist settings for voice, speech speed and recognition confidence', frame: 'raw' },
      },
    ],
    useCases: [
      { title: 'Realistic flows', body: 'Run your checklists the way a two-person crew does, with your hands on the controls.' },
      { title: 'Any aircraft', body: 'Write checklists for the aircraft you fly, or start from one of the bundled checklists.' },
    ],
    gallery: [],
    faq: [
      { q: 'Which simulators does it work with?', a: 'CoPilot Checklist runs alongside your simulator as a separate Windows app and does not read data from the simulator, so it can be used with any flight simulator on Windows.' },
      { q: 'Do I need an account?', a: 'No. CoPilot Checklist has no accounts, and your checklists stay on your PC.' },
      { q: 'Where can I download it?', a: 'CoPilot Checklist is available on the Microsoft Store for Windows.' },
    ],
    support: [
      { q: 'CoPilot doesn’t hear my responses', a: 'Check that Windows is using the right microphone, then lower Voice Recognition Minimum Confidence in Settings a little. Say “Responses” to hear what CoPilot accepts for the current item.' },
      { q: 'CoPilot stopped talking', a: 'Say “Start speaking” (or “Unmute”). If it stopped listening too, say “Start listening”.' },
    ],
    privacyHighlights: [
      'No personal information is collected, and nothing is sent to me or anyone else.',
      'Checklists, settings and error logs are stored on your PC.',
      'Your voice is recognized on your PC by Windows and is never recorded or sent anywhere.',
      'No accounts, advertising, analytics or tracking.',
    ],
    disclaimer: 'For flight simulation use only. Not for real-world aviation.',
  },
];

export const getApp = (slug: string): App => {
  const app = apps.find((a) => a.slug === slug);
  if (!app) throw new Error(`Unknown app: ${slug}`);
  return app;
};

export const flagship = apps.find((a) => a.flagship)!;
export const otherApps = apps.filter((a) => !a.flagship);

export const storeLabels: Record<StoreKind, { pre: string; name: string }> = {
  'app-store': { pre: 'Download on the', name: 'App Store' },
  'mac-app-store': { pre: 'Download on the', name: 'Mac App Store' },
  'google-play': { pre: 'Get it on', name: 'Google Play' },
  'microsoft-store': { pre: 'Get it from', name: 'Microsoft Store' },
};
