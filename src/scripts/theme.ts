/**
 * Theme preference.
 *
 * The site is dark by default. A cookie named "theme" is written only when the
 * visitor uses the theme toggle, and only holds "light" or "dark". It is a
 * first-party, user-requested interface preference — no consent banner is
 * needed for it under the ePrivacy Directive's "strictly necessary" exemption
 * (see /legal/cookies). Never put anything else in this cookie.
 */
export type Theme = 'dark' | 'light';

export const THEME_COOKIE = 'theme';
const ONE_YEAR = 60 * 60 * 24 * 365;
const THEME_COLOR: Record<Theme, string> = { dark: '#09090b', light: '#fafaf9' };

export function getTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

function apply(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
  document.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
}

export function setTheme(theme: Theme) {
  apply(theme);
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${THEME_COOKIE}=${theme}; Path=/; Max-Age=${ONE_YEAR}; SameSite=Lax${secure}`;
}

/** Deletes the preference cookie and returns to the default (dark) theme. */
export function clearTheme() {
  document.cookie = `${THEME_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
  apply('dark');
}

export function hasThemeCookie(): boolean {
  return new RegExp(`(?:^|;\\s*)${THEME_COOKIE}=`).test(document.cookie);
}
