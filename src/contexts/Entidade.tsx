import { component$, createContextId, useContextProvider, useStore } from '@builder.io/qwik';

export interface EntidadeType {
    id: string;
    name: string;
    email: string;
    base: "clinica" | "veterinario";
    telefone: string;
    regiao: string;
    endereco: string[];
  }
  
  export interface EntidadeProps {
    values: EntidadeType[];
  }

export const Veterinarios = createContextId<EntidadeProps>('veterinarios' );
export const Clinicas = createContextId<EntidadeProps>('clinicas');

