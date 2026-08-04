/**
 * RSK-UI Theme Script
 *
 * Generates the inline blocking script that prevents theme flash on page load.
 * This script must run synchronously in <head> before any CSS or React hydration.
 *
 * The generated script:
 *  1. Reads the stored theme from localStorage
 *  2. Falls back to the OS prefers-color-scheme media query
 *  3. Applies the correct class ('light' | 'dark') to <html>
 *  4. Sets the color-scheme CSS property for native browser UI (scrollbars, inputs)
 *
 * Usage in index.html:
 *   <script><!-- paste output of getThemeScript() here --></script>
 *
 * Usage in SSR frameworks (Next.js):
 *   <Script id="theme-script" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: getThemeScript() }} />
 */

export const THEME_STORAGE_KEY = 'rsk-ui-theme' as const;
export const THEME_ATTRIBUTE = 'class' as const;
export const THEME_VALUES = ['light', 'dark', 'system'] as const;

export type Theme = (typeof THEME_VALUES)[number];
export type ResolvedTheme = 'light' | 'dark';

/**
 * Returns the minified inline script string that eliminates theme flash.
 * Inject this verbatim into a synchronous <script> tag in <head>.
 *
 * @param storageKey - localStorage key (default: 'rsk-ui-theme')
 * @param defaultTheme - fallback when no stored preference exists (default: 'system')
 */
export function getThemeScript(
  storageKey: string = THEME_STORAGE_KEY,
  defaultTheme: Theme = 'system'
): string {
  // This function body is serialized and injected — keep it self-contained.
  // No external references allowed inside.
  const script = `(function(){
  try{
    var s=localStorage.getItem(${JSON.stringify(storageKey)});
    var d=${JSON.stringify(defaultTheme)};
    var t=s||d;
    var r;
    if(t==='system'||!t){
      r=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
    } else {
      r=t;
    }
    var e=document.documentElement;
    e.classList.remove('light','dark');
    e.classList.add(r);
    e.style.colorScheme=r;
    e.setAttribute('data-theme',r);
  }catch(e){}
})();`;
  return script;
}

/**
 * The raw inline script content for direct embedding in index.html.
 * Uses the default storage key and 'system' default theme.
 */
export const themeScript = getThemeScript();
