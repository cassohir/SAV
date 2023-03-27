
import { $, component$, useSignal, useStore, useTask$ } from '@builder.io/qwik';
import { qwikify$ } from '@builder.io/qwik-react';
import axios from 'axios';
import { EntidadeProps } from '~/contexts/Entidade';
import { SearchForm } from '~/integrations/react/SearchForm';
import { clinicas, veterinarios } from '~/utils/data';
import { SERVER_URL } from '~/utils/url';



interface TableProps {
  title?: string;
}

export const BASE  = {
 CLINICA : "clinica",
 VETERINARIO: "veterinario",
}

type DistanceRange = [number, number, string];
const DISTANCE_RANGES: DistanceRange[] = [
  [-1, 0, 'bg-distance-500'],
  [0.02, 3, 'bg-distance-200'],
  [3.01, 5, 'bg-distance-300'],
  [5.01, 10, 'bg-distance-400'],
  [10.01, 15, 'bg-distance-500'],
  [15.01, Infinity, 'bg-distance-600'],
];



const Searchform = qwikify$(SearchForm);
export const TableVxC =  component$((props : TableProps) => {

  const entidade = useStore<EntidadeProps>({
    values: [],
  });

  useTask$(async () => {
   const response = await axios.get(`${SERVER_URL}/entidade`);

   entidade.values = response.data.map((elemento : any) => ({...elemento}));

  // console.log(entidade.values);
  })

  const getRangeDistance = $( (value: number) => {
    if(!value) return;
    for (const [min, max, className] of DISTANCE_RANGES) {      
      if (value >= min && value <= max || value == 0) {
        return className;
      }
    }
    return [];
  });

  const filtro = useStore({
    value: '',
  })

  return (
    
      <div class="w-full flex flex-col items-center justify-center">
      <main class = "w-4/5 text-center">
        <Searchform />
         <h1 class="pt-4 font-bold text-xl ">{props.title}</h1>
        <div class="overflow-x-auto overflow-y-auto">
        <table class="w-full relative overflow-x-auto table-auto border-spacing-x-0 text-center mt-6">
          
            <thead class="table-head text-base text-style-100 bg-blue-700 ">
              <th class="rounded-tl-xl top-[-1px] sticky bg-blue-700 "></th>
              {entidade.values.map((clinica, index) => {
                if(clinica.base === BASE.CLINICA ){
                  const isFinalClinica = entidade.values[index + 1] && 
                        entidade.values[index + 1].base === BASE.VETERINARIO;
                  return (  
                    <th class={`p-3 sticky top-[-1px] bg-blue-700 ${ isFinalClinica? 'rounded-tr-xl' : ''}`}>
                    {clinica.name}
                  </th>
                );
              }
              })}
            </thead>

          <tbody>
            {entidade.values.map((veterinario) => {
              if (veterinario.base === BASE.VETERINARIO){
                
                return (
                  <>
                <tr class="hover: border  border-2 border-transparent ">
                  <td class="p-3 sticky top-20 left-[-1px] bg-white">{veterinario.name}</td>

                  {/* 
                   
                  {veterinario.endereco.map( async (distancia) => {
                    const rangeNumber =  (!parseInt(distancia.replace("km","")) || 
                          distancia.replace("km","") == "0" )? -1 : parseInt(distancia.replace("km",""));
                    const rangeClass = await getRangeDistance(rangeNumber);
                    return (
                       fix: Linhas referentes a cada distancia
                      <td class={ ` hover:opacity-90 pt-3 ${rangeClass ? [rangeClass] : []}`}>{distancia}</td> 
                      )
                    })}
                  */}
                </tr>
                </>
              )
            }
            })}
          </tbody>
        </table>               
        </div>
      </main>
    </div>

  );
});