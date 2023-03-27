import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { qwikify$ } from '@builder.io/qwik-react';
import List from '@mui/material/List';
import { QwikLogo, SideBarLogo} from '../icons/qwik';


 
 

export default component$(() => {
  //useStylesScoped$(styles);

  return (
    
    <header class="flex flex-col items-center justify-center bg-style-100 border-b-8 border-purple-700">
        
      <h2 class="my-8 font-sans text-2xl font-medium font-bold text-blue-500"> Sistema de Agendamento Veterinário</h2>

      <div class="bg-purple-700 rounded-t-md">
      <ul class="flex items-center  list-none px-0 py-5 pr-10 gap-8">

      <li class="inline-block mx-3 p-0.5">
          <a  class="inline-block text-white font-medium hover:text-black px-2.5" href="/clinica">
          Base de Clínicas
          </a>
        </li>
        <li>
          <a  class="inline-block text-white font-medium hover:text-black px-2.5" href="/veterinarios/">
          Base de Veterinários
          </a>
        </li>

         <li>
          <a  class="inline-block text-white font-medium hover:text-black px-2.5" href="/matriz/">
           Matriz de Distâncias
          </a>
          
        </li>
  
      </ul>
      </div>
      
    </header>

  );
});
