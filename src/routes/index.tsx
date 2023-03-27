
import { component$, useContextProvider, useStore} from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import { Clinicas, EntidadeProps, Veterinarios } from '~/contexts/Entidade';
import Clinica from './clinica';
import Dashboard from './dashboard';

export default component$(() => {
  useContextProvider(Veterinarios, useStore<EntidadeProps>({
    values: []
  }));
  useContextProvider(Clinicas, useStore<EntidadeProps>({
    values: []
  }));
  
  return (
    <>
      <Dashboard />
    </>
  );
  21
});

export const head: DocumentHead = {
  title: 'Sistema de agendamento Veterinário',
  meta: [
    {
      name: 'description',
      content: 'Agende uma consulta com seu veterinário favorito',
    },
  ],
};
