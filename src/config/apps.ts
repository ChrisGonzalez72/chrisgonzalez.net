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
import cpCloud from '../assets/apps/atlsim-copilot/cloud-checklists.png';
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
    tagline: 'Private meeting notes, made on your Mac.',
    summary:
      'On Record listens to your meetings and writes them up — summary, decisions, action items and a full transcript — with every point linked to the moment it was said. All of it is made on your own Mac.',
    seoTitle: 'On Record — Private AI Meeting Notes for Mac, iPhone, iPad & Apple Watch',
    flagship: true,
    icon: '/icons/on-record.svg',
    iconAlt: 'On Record app icon: coral audio bars turning into navy lines of notes',
    accent: '#E5484D',
    onAccent: '#FFFFFF',
    platforms: ['mac', 'iphone', 'ipad', 'watch'],
    status: 'coming-soon',
    statusNote: 'Coming soon to the App Store',
    stores: [
      // The listing (id6822120030) is created but not public until 1.0 is released.
      // When it goes live: set url to 'https://apps.apple.com/app/id6822120030' and status to 'available'.
      { kind: 'app-store', url: undefined, platforms: ['mac', 'iphone', 'ipad', 'watch'] },
    ],
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'macOS 15, iOS 18, iPadOS 18, watchOS 11',
    requirements: [
      'A Mac with Apple silicon running macOS 15 or later does the transcription and writing up.',
      'iPhone and iPad (iOS / iPadOS 18 or later) and Apple Watch (watchOS 11 or later) record and show results. They need On Record on your Mac, signed in to the same iCloud account.',
      'Language models are downloaded once from inside the Mac app.',
      'Made for meetings in English.',
    ],
    hero: { src: orSummary, alt: 'On Record on iPhone showing the summary of a meeting called Q4 Launch Planning, with each point linked to its source in the recording', frame: 'phone' },
    overview: [
      'On Record turns a recording into a clear write-up: a summary, the decisions that were made, the action items with owners and due dates, and a full transcript with who said what.',
      'Every point links back to the exact moment it was said, so you can check it with one tap instead of taking the AI’s word for it.',
      'Transcription, speaker detection and the AI writing all run on your own Mac, using models you download once. There are no On Record servers, no account to create and no meeting bot joining your calls.',
    ],
    features: [
      {
        title: 'Check every point',
        body: 'Each summary point, decision and action item links to the moment in the recording. Tap to hear it, or jump to that line in the transcript.',
        points: [
          'Points that need a second look are marked, so you can confirm or reject them.',
          'Correct the transcript any time — the original is always kept.',
        ],
        shot: { src: orTranscript, alt: 'On Record transcript on iPhone, split by speaker, with a play button on every line', frame: 'phone' },
      },
      {
        title: 'Never lose an action item',
        body: 'Who owes what, and by when — each action item carries its owner, due date and a link to the moment it was agreed.',
        points: ['Decisions are kept apart from the discussion.', 'Browse every decision across all your meetings.'],
        shot: { src: orActions, alt: 'On Record action items on iPhone with owners, due dates and links to the recording', frame: 'phone' },
      },
      {
        title: 'Private by design',
        body: 'The AI runs on your Mac. Your recordings and results never touch an On Record server, and your meetings are never used for advertising, tracking or AI training.',
        points: [
          'iPhone, iPad and Apple Watch recordings reach your Mac through your own iCloud, and results come back the same way.',
          'No account, no sign-up, no meeting bot.',
        ],
        shot: { src: orMacSummary, alt: 'On Record for Mac showing a meeting summary with topics, decisions and actions', frame: 'window' },
      },
      {
        title: 'Ask your meetings',
        body: 'Type or say a question — “What did we decide about the launch date?” or “What did I promise Priya?” — and get a straight answer with links to the meetings and moments it came from.',
        shot: { src: orAsk, alt: 'Ask in On Record on iPhone, with suggested questions such as What did I promise to do?', frame: 'phone' },
      },
    ],
    useCases: [
      { title: 'Team meetings', body: 'Leave with the decisions and the action items already written down, each with an owner and a due date.' },
      { title: 'Client and sales calls', body: 'Record your microphone together with the call audio from Zoom, Teams, Webex or any other app on your Mac.' },
      { title: 'Interviews', body: 'A transcript split by speaker, where every line plays back the moment it was said.' },
      { title: 'Lectures and courses', body: 'Group recordings into courses and series, then ask questions across all of them.' },
    ],
    gallery: [
      { src: orMacTranscript, alt: 'On Record for Mac transcript view, split by speaker with timestamps', frame: 'window', caption: 'Know exactly who said what.' },
      { src: orMacAsk, alt: 'Ask on the Mac answering What did we decide about the launch date? with quoted sources', frame: 'window', caption: 'Answers with the moments they came from.' },
      { src: orMacMeetings, alt: 'On Record for Mac meetings list with action and decision counts', frame: 'window', caption: 'Every meeting, written up.' },
      { src: orMacPeople, alt: 'On Record for Mac People list showing everyone you meet with', frame: 'window', caption: 'Name a voice once; On Record suggests it next time.' },
      { src: orDecisions, alt: 'On Record Library on iPhone listing decisions from every meeting', frame: 'phone', caption: 'Every decision in one place.' },
      { src: orMeetings, alt: 'On Record Meetings list on iPhone, with items that need review', frame: 'phone', caption: 'Record here. Your Mac writes it up.' },
      { src: orWatch, alt: 'On Record on Apple Watch with a large Record button', frame: 'watch', caption: 'Start, pause and stop from your wrist.' },
    ],
    faq: [
      {
        q: 'Do I need a Mac?',
        a: 'Yes. A Mac with Apple silicon does the transcription and writing up. iPhone, iPad and Apple Watch record and show the results; they need On Record on your Mac, signed in to the same iCloud account. It is the same app on every device.',
      },
      {
        q: 'Where do my recordings go?',
        a: 'They stay on your devices. Recordings from iPhone, iPad and Apple Watch travel to your Mac through your own iCloud account, and results come back the same way. There is no On Record server.',
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
        a: 'Yes, when you choose to. Export a meeting as a PDF or text, with or without the transcript and the original audio, and send it however you like.',
      },
      {
        q: 'Is it legal to record a meeting?',
        a: 'Recording laws differ by place. Follow the law where you are and get people’s consent before recording them.',
      },
    ],
    support: [
      {
        q: 'My iPhone recordings are not being transcribed',
        a: 'Transcription happens on your Mac. Install On Record on a Mac with Apple silicon, sign in to the same iCloud account on both devices, and open On Record on the Mac. Recordings waiting to send are kept safely on the iPhone until the Mac picks them up.',
      },
      {
        q: 'Nothing is written up after a recording on the Mac',
        a: 'Open Settings → Models on the Mac and check that a language model is downloaded. The meeting’s Processing tab shows each step and any that need attention.',
      },
      {
        q: 'Call audio from Zoom or Teams is missing',
        a: 'Allow System Audio Recording when macOS asks, or turn it on for On Record in System Settings → Privacy & Security → Screen & System Audio Recording. Then start the recording in On Record.',
      },
      {
        q: 'A speaker is named wrongly',
        a: 'Open the meeting, choose the speaker and pick the right person. On Record uses names you confirm to suggest speakers in future meetings, and you can rename, merge or delete people at any time.',
      },
      {
        q: 'A word is transcribed wrongly every time',
        a: 'Add the name or acronym under Vocabulary in On Record’s Settings on the Mac. You can also correct the transcript directly; the original is always kept.',
      },
    ],
    privacyHighlights: [
      'No account, no analytics, no advertising, no tracking.',
      'Transcription and AI writing run on your Mac.',
      'Recordings move between your devices only through your own iCloud.',
      'Your meetings are never used to train AI.',
    ],
  },
  {
    slug: 'pilot-buddy',
    name: 'Pilot Buddy',
    shortName: 'Pilot Buddy',
    tagline: 'Flight planning, simplified.',
    summary:
      'Three tools general aviation and student pilots reach for most — course reversal headings, crosswind and headwind components, and airport runways and frequencies — in one offline Android app.',
    seoTitle: 'Pilot Buddy — Crosswind, Turn & Airport Reference App for Pilots (Android)',
    icon: '/icons/pilot-buddy.png',
    iconAlt: 'Pilot Buddy logo: a headset with a check mark',
    accent: '#5B7BE0',
    onAccent: '#FFFFFF',
    platforms: ['android'],
    status: 'unavailable',
    statusNote: 'Not yet on Google Play',
    stores: [{ kind: 'google-play', url: undefined, platforms: ['android'] }],
    applicationCategory: 'TravelApplication',
    operatingSystem: 'Android 7.1 or later',
    requirements: ['Android 7.1 or later, phone or tablet.', 'No internet connection needed.'],
    hero: { src: pbHome, alt: 'Pilot Buddy home screen with Turn Calculator, Crosswind Calculator and Airport Information buttons', frame: 'raw' },
    overview: [
      'Pilots often work wind-triangle maths on a paper E6B, look up runways in one place and frequencies in another, and do course reversal headings in their head — usually when time is short.',
      'Pilot Buddy puts the three most-used calculations and references into one app, so the answer is on screen as soon as you finish typing.',
      'Everything is calculated on the device, and airport data ships inside the app, so it works without a signal.',
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
      { title: 'Preflight planning', body: 'Check the crosswind for each runway before you choose one.' },
      { title: 'Student pilots', body: 'Confirm your E6B and mental-maths answers while you learn.' },
      { title: 'Quick airport reference', body: 'Look up a runway length or a frequency without opening a chart.' },
    ],
    gallery: [
      { src: pbHomeLight, alt: 'Pilot Buddy home screen in the light theme', frame: 'raw', caption: 'Light and dark themes.' },
    ],
    faq: [
      { q: 'Does Pilot Buddy need an internet connection?', a: 'No. Calculations run on your device and the airport database is built into the app.' },
      { q: 'Which airports are included?', a: 'The built-in database has about 48,000 airports worldwide, each with its runways and the frequencies on record.' },
      { q: 'When will it be on Google Play?', a: 'Pilot Buddy is not on Google Play yet. Updates will be announced on this site.' },
    ],
    support: [
      { q: 'An airport is missing or its data is out of date', a: 'Airport data is a static dataset bundled with the app and may not reflect recent changes. Email the identifier and what looks wrong.' },
      { q: 'The calculator shows an error', a: 'Headings and wind directions must be whole degrees from 0 to 359, and wind speed must be a number of knots.' },
    ],
    privacyHighlights: [
      'Pilot Buddy requests no Android permissions — not even internet access.',
      'It cannot send any information off your device.',
      'No account, no analytics, no advertising.',
    ],
    disclaimer:
      'Pilot Buddy is a planning and study aid. It is not approved for navigation. Always use current official charts, publications and flight instruments.',
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
    status: 'unavailable',
    statusNote: 'Not currently available',
    stores: [{ kind: 'microsoft-store', url: undefined, platforms: ['windows'] }],
    applicationCategory: 'GameApplication',
    operatingSystem: 'Windows 10 or later',
    requirements: [
      'Windows 10 (version 1607) or later.',
      'A microphone and speakers or headset.',
      'Uses the speech voices installed in Windows.',
      'An internet connection and a free username are needed only for cloud checklists.',
    ],
    hero: { src: cpRun, alt: 'CoPilot Checklist running a Cessna Citation preflight checklist, with completed items ticked', frame: 'raw' },
    overview: [
      'CoPilot Checklist is part of the ATLsim CoPilot series of flight simulator add-ons. It acts as your first officer for checklists: it reads each challenge aloud, listens for your response, and moves on.',
      'Build checklists for any aircraft, run them by voice, and share them with — or download them from — other simmers.',
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
        title: 'Cloud checklists',
        body: 'Share your aircraft and checklists with the community, and download checklists other simmers have made, with the checklist author and aircraft developer shown for each.',
        shot: { src: cpCloud, alt: 'CoPilot Checklist cloud page listing local and shared aircraft with authors and developers', frame: 'raw' },
      },
      {
        title: 'Make it sound right',
        body: 'Pick the voice, set the speaking speed, and tune how confident speech recognition must be before it accepts a response. Light, dark and high-contrast themes.',
        shot: { src: cpSettings, alt: 'CoPilot Checklist settings for voice, speech speed and recognition confidence', frame: 'raw' },
      },
    ],
    useCases: [
      { title: 'Realistic flows', body: 'Run your checklists the way a two-person crew does, with your hands on the controls.' },
      { title: 'Any aircraft', body: 'Write checklists for the aircraft you fly, or start from one someone else shared.' },
    ],
    gallery: [],
    faq: [
      { q: 'Which simulators does it work with?', a: 'CoPilot Checklist runs alongside your simulator as a separate Windows app and does not read data from the simulator, so it can be used with any flight simulator on Windows.' },
      { q: 'Do I need an account?', a: 'Only for cloud checklists — sharing yours or downloading others’. Running and editing your own checklists works without one.' },
      { q: 'Where can I download it?', a: 'CoPilot Checklist is not available for download at the moment. Updates will be announced on this site.' },
    ],
    support: [
      { q: 'CoPilot doesn’t hear my responses', a: 'Check that Windows is using the right microphone, then lower Voice Recognition Minimum Confidence in Settings a little. Say “Responses” to hear what CoPilot accepts for the current item.' },
      { q: 'CoPilot stopped talking', a: 'Say “Start speaking” (or “Unmute”). If it stopped listening too, say “Start listening”.' },
    ],
    privacyHighlights: [
      'Checklists you make are stored on your PC.',
      'Cloud checklists are optional and need a username and email address.',
      'Speech recognition and speech use the voices built into Windows.',
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
