
import { component$, useSignal, useStore, useTask$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';

import { qwikify$ } from '@builder.io/qwik-react';
import axios from 'axios';
import Dropdown from '~/components/dropDown/Dropdown';
import List from '~/components/list/List';
import  FormReact  from '~/integrations/react/FormReact';




const FormBase = qwikify$(FormReact);


export const Clinica =  component$(() => {

 //useContext()
 const registerClinica = useSignal(false);
 const clinicas = useStore({
  posts: []
 })


 /* 
 
   const [veterinario, setVeterinario ] = useState("");
   onChange = SetVeterinaio(value) ;
   onchange = clinicas.count++;
/
 */

const estado = useStore({
  valor: "",
})
 useTask$(async () => {

  const response = await axios.get("http://localhost:3333/api/clinicas");
  clinicas.posts = response.data.map((clinica: any) => ({...clinica}));
  //console.log("Clinicas: "+JSON.stringify(clinicas.posts));
})
 

const dropDown = [
  {
  routeName: "Criar",
  routePath: "/",
  icon: "ph-plus-circle",
}, {
  routeName: "Agendar",
  routePath: "/agenda",
  icon: "ph-calendar-plus",
}
]
  return (
    <div class="flex items-center flex-col">
      <Dropdown data={dropDown} title="Opções" />
    {
      !registerClinica.value ? 
        <div>
          <div class="flex items-center justify-center flex-col gap-10  ">
          <List title="Clínicas" data={clinicas.posts}></List> 
        </div> </div> : (
      <div>
    <FormBase client:hover title="Base Clínica" base="clinica"></FormBase>
      </div>   
      )
    }

      <button 
        onClick$={() => registerClinica.value = !registerClinica.value}>
          {!registerClinica.value ? "Cadastrar Clínica" : "Voltar"}
      </button> 

    
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Base Clínica - SAV',
  meta: [
    {
      name: 'description',
      content: 'Agende uma consulta com seu veterinário favorito',
    },
  ],
};

export default Clinica;
