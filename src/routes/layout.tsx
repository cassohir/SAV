import { component$, Slot, useContextProvider, useStore } from '@builder.io/qwik';
import {  loader$ } from '@builder.io/qwik-city';
import { SideBar } from '~/components/sideBar';
//import { ENTIDADE, EntidadeContext } from '~/contexts/Entidade';
import { FormStateContext, FormProps } from '~/contexts/FormContext';

import Header from '../components/header/header';

export const useServerTimeLoader = loader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {

 useContextProvider(FormStateContext, useStore<FormProps>({
  isOpen: false
 }))

//useContextProvider(EntidadeContext, ENTIDADE)

  return (
    <>
      <main class=" bg-white flex rounded-md  overflow-hidden">
            <SideBar />
      <div class="w-full">
        <Header />
        <section class="border-b-8 border-blue-500 p-5">
          <Slot />
        </section>
      </div>
      </main>
      <footer class="p-3">
      </footer>
    </>
  );
});
