import { component$, useContext } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { Veterinarios } from '~/contexts/Entidade';
import Header from './components/header';
import { TableData } from './components/Table';
import Agenda from '../agenda';




export default component$(() => {

  const veterinarioss = useContext(Veterinarios);
  return (
    
   <div class="ml-20 flex flex-col items-center justify-center">
   
       <Header />
       <TableData />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'DashBoard Veterinária',
};
