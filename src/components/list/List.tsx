import { component$ } from '@builder.io/qwik';
import { DocumentHead, Link } from '@builder.io/qwik-city';

import { qwikify$ } from '@builder.io/qwik-react';


export type Clinica = {
    id: string;
    name: string;
    [key: string]: any;
};

export type Veterinario = {
    id: string;
    name: string;
    [key: string]: any;
};

export interface ListProps {
    title?: string;
    base?: "clinica" | "veterinario";
    data: Clinica[] | Veterinario[];
}





const List = component$(({data, title}: ListProps) => {
    const keys = Object?.keys(data[0]);

    return (
        <div class="w-screen mt-6 text-center  items-center justify-center flex flex-col ">
            <h1 class="text-xl font-bold">{title}</h1>
        <table class="w-4/5 table-auto border-spacing-x-0 shadow-black rounded-b-lg sh  text-center mt-6">
        <thead class="table-head text-base text-style-100 bg-blue-700">
          <tr>
            {keys.map((key, index) => (
              <th class={`${index === 0 ? 'rounded-tl-xl' : ''} ${index === keys.length - 1 ? 'rounded-tr-xl' : ''}`}key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((object) => (
            <tr key={object.id}>
              {keys.map(key => (
                <td class="p-3" key={key}>{object[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
            
      </div>
    )
});

export default List;
