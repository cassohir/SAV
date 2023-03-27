import { component$, useBrowserVisibleTask$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import { type DocumentHead, useLocation } from '@builder.io/qwik-city';


export default component$(() => {

  const loc = useLocation();

  const state = useStore({
    count: 0,
    number: 20,
  });

  useBrowserVisibleTask$(({ cleanup }) => {
    const timeout = setTimeout(() => (state.count = 1), 500);
    cleanup(() => clearTimeout(timeout));

    const internal = setInterval(() => state.count++, 7000);
    cleanup(() => clearInterval(internal));
  });

  return (
    <>

    
    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwik Flower',
};
