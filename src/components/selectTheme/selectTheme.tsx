import { $, component$, useContext, useId, useSignal } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { APP_STATE } from '../../constants';
import { ThemeIcon } from '../icons/ThemeIcon';



export type Theme = 'HEADLESS' | 'DAISY' | 'MATERIAL' | 'NOT_DEFINED';

export const SelectTheme = component$(() => {
  const location = useLocation();
  const appState = useContext(APP_STATE);
  const openThemeSignal = useSignal<boolean>(false);

  const themes: Theme[] = ['HEADLESS', 'DAISY', 'MATERIAL'];
  return (
    <div
      title="Change Theme"
      class="change-theme"
    >
      <div
        class="signal"
        onClick$={$(() => {
          openThemeSignal.value = !openThemeSignal.value;
        })}
      >
        <ThemeIcon />
        <div class="px-1">Theme</div>
      </div>
      {openThemeSignal.value && (
        <div class="mapclass">
          {themes.map((theme) => (
            <div
              key={useId()}
              class="map"
              onClick$={$(() => {
                openThemeSignal.value = false;
                const oldTheme = appState.theme;
                appState.theme = theme;
                if (location.pathname !== '/docs/') {
                  window.location.pathname = window.location.pathname.replace(
                    oldTheme.toLowerCase(),
                    theme.toLowerCase()
                  );
                }
              })}
            >
              <div class="icon">
                <ThemeIcon />
              </div>
              <div class="theme">
                {theme}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
