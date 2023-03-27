import { $, component$, useResource$, useSignal, useStore, useTask$ } from '@builder.io/qwik';
import Form from '../../components/Form';
import { baseClinicaFields } from '../../components/Form/fields';
import { type DocumentHead, loader$, action$, zod$, z } from '@builder.io/qwik-city';
import { qwikify$ } from '@builder.io/qwik-react';
import FormReact from '~/integrations/react/FormReact';
import List, { Veterinario } from '~/components/list/List';

import Dropdown from '~/components/dropDown/Dropdown';
import { dropDownData, veterinarios } from "~/utils/data";
import axios from 'axios';



interface ListItem {
  text: string;
}

export const list: ListItem[] = [];

export const useListLoader = loader$(() => {
  return list;
});

export const useAddToListAction = action$(
  (item) => {
    list.push(item);
    return {
      success: true,
    };
  },
  zod$({
    text: z.string(),
  })
);

export default component$(() => {
  const list = useListLoader();
  const action = useAddToListAction();
const registerVeterinario = useSignal(false);

const FormBase = qwikify$(FormReact);


const data = useStore({});


const veterinariosT = useStore({
    posts: [],
});

useTask$(async () => {

  const response = await axios.get("http://localhost:3333/api/veterinarios");
  veterinariosT.posts = response.data.map((veterinario: any) => ({...veterinario}));
  //console.log("Veterinarios: "+JSON.stringify(veterinariosT.posts));
})
 



  return (
    <>
    <div class="flex flex-col items-center">
    <Dropdown data={dropDownData } title="Opções" />  

   
    {
      !registerVeterinario.value ?
      <div>
        <div class="flex items-center justify-center flex-col gap-10">
        <List title="Veterinários" data={veterinariosT.posts}></List>    
      </div></div> : (

        <div>
        <FormBase client:idle title="Base Veterinária" base="veterinario"></FormBase>
        </div>
      )
    }

      <button onClick$={() => registerVeterinario.value = !registerVeterinario.value}>
        {!registerVeterinario.value ? "Cadastrar Veterinário" : "Voltar"}
      </button> 
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Base de veterinários',
};
