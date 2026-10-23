/**
 * Site-wide settings. Anything marked CONFIRM needs Chris's sign-off before
 * the site is used as an App Store support or privacy URL.
 */
export const site = {
  name: 'ChrisGonzalez.net',
  owner: 'Chris Gonzalez',
  url: 'https://chrisgonzalez.net',
  tagline: 'Independent software, made with care.',
  description:
    'Chris Gonzalez is an independent software developer. Home of On Record — private AI meeting notes made on your Mac — plus Pilot Buddy and ATLsim CoPilot.',
  locale: 'en_US',
  /** Public contact address for support, privacy and press. */
  contactEmail: 'support@chrisgonzalez.net',
  /** How long Chris usually takes to answer support email. */
  responseTime: 'within two business days',
  /** Public profiles. Only verified accounts belong here. */
  social: [{ label: 'GitHub', href: 'https://github.com/ChrisGonzalez72' }],
  /** Date shown on the site-wide legal pages. */
  legalUpdated: '2026-10-23',
} as const;

export const nav = [
  { label: 'On Record', href: '/apps/on-record/' },
  { label: 'Apps', href: '/apps/' },
  { label: 'About', href: '/about/' },
  { label: 'Support', href: '/support/' },
] as const;
