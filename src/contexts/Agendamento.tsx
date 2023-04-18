import { component$, useSignal } from '@builder.io/qwik';
import { useContext, useContextProvider, createContextId } from '@builder.io/qwik';


export type AgendamentoContextProps = {
  date: string;
  setDate: (date: string) => void;
  veterinario: string;
  setVeterinario: (veterinario: string) => void;
  horario: string;
  setHorario: (horario: string) => void;
  clinica: string;
  setClinica: (clinica: string) => void;


};


 
export const AgendamentoContext = createContextId<AgendamentoContextProps>('agendamento-context');


export const AgendamentoProvider = component$(() => { 


  const date = useSignal('');
  const veterinario = useSignal('');
  const horario  = useSignal('');
  const clinica = useSignal('');


  return (
    <>
      
    </>
 )

});