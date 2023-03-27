
import { $, component$, useSignal, useTask$ } from '@builder.io/qwik';




interface TableProps {
  title?: string;
}


import { qwikify$ } from '@builder.io/qwik-react';
import { clinicas, veterinarios } from '~/utils/data';


//Veterinário: Casa x Clínica
// Clínica x Clínica

/* 
  | Distancias | Id1 | Id2  | Id3
  | Id1        |     | 1km  | 5km
  | id2        | 1km |      | 15km
  | id3        | 3km | 15km | 
  
*/


type DistanceRange = [number, number, string];
const DISTANCE_RANGES: DistanceRange[] = [
  [-1, 0, 'bg-distance-100'],
  [0.02, 3, 'bg-distance-200'],
  [3.01, 5, 'bg-distance-300'],
  [5.01, 10, 'bg-distance-400'],
  [10.01, 15, 'bg-distance-500'],
  [15.01, Infinity, 'bg-distance-600'],
];



export const TableData =  component$((props : TableProps) => {

  const getRangeDistance = $( (value: number) => {
    if(!value) return;
    for (const [min, max, className] of DISTANCE_RANGES) {      
      if (value >= min && value <= max || value == 0) {
        return className;
      }
    }
    return [];
  });

  return (
    
      <div class="w-full flex flex-col items-center justify-center">
      <main class = "w-4/5 text-center">
        <h1 class="pt-4 font-bold text-xl ">{props.title}</h1>

        <table class="w-full table-auto border-spacing-x-0 text-center mt-6">
            <thead class="table-head text-base text-style-100 bg-blue-700">
              <th class="rounded-tl-xl"></th>
              {clinicas.map((clinica, index) => {
                return (
                  <th class={`p-3 ${index === clinicas.length - 1 ? 'rounded-tr-xl' : ''}`}>
                    {clinica.name}
                  </th>
                );
              })}
            </thead>
          <tbody>
            {veterinarios.map((veterinario) => {
              return (
                <tr>
                  <td class="p-3">{veterinario.name}</td>
                  {veterinario.distance.map( async (distancia) => {
                   const rangeNumber =  (!parseInt(distancia.replace("km","")) || distancia.replace("km","") == "0" )? -1 : parseInt(distancia.replace("km",""));
                   const rangeClass = await getRangeDistance(rangeNumber);
                      return (
                        <td class={ ` pt-3 ${rangeClass ? [rangeClass] : []}`}>{distancia}</td>
                      )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </main>
    </div>

  );
});