
import { $, component$, useContextProvider, useSignal, useStore, useTask$ } from '@builder.io/qwik';

interface TableProps {
  title?: string;
}

import axios from 'axios';
import { useContext } from 'react';
import { Veterinarios, EntidadeProps, EntidadeType} from '~/contexts/Entidade';


import { SERVER_URL } from '~/utils/url';


type DistanceRange = [number, number, string];
const DISTANCE_RANGES: DistanceRange[] = [
  [-1, 0, 'bg-distance-100'],
  [0.02, 3, 'bg-distance-200'],
  [3.01, 5, 'bg-distance-300'],
  [5.01, 10, 'bg-distance-400'],
  [10.01, 15, 'bg-distance-500'],
  [15.01, Infinity, 'bg-distance-600'],
];

const getRangeDistance = $( (value: number) => {
  if(!value) return;
  for (const [min, max, className] of DISTANCE_RANGES) {      
    if (value >= min && value <= max || value == 0) {
      return className;
    }
  }
  return [];
});

interface ClinicaSchedule {
  origemId: number;
  destinoId: number; 
}
interface Queue {
  queue: number[];
}

export const TableData =  component$((props : TableProps) => {

  // fix: Virá por contexto... 
  const actualClinicaId = 9;
  const getDistanceClinica = $(async (origemId: number, destinoId : number) =>{
    try {
      // fix: Mudar pro sqlite interno.
      const response = await axios.get(`${SERVER_URL}/getdistanciaclinica/${origemId}/${destinoId}`) 
      return response.data.distancia;
    } catch (error){
      console.log(error);     
    }
  });

// fix: Virá por contexto... 
const veterinarios = useStore<EntidadeProps>({
  values: [],
});
const clinicas = useStore<EntidadeProps>({
    values: [],
});

const rideQueue = useStore<Queue>({
  queue: [],
});
const addClinicaIdToQueue = $((clinicaId: number) => {
  if(!isNaN(clinicaId)){
    const orderedList = [...rideQueue.queue, clinicaId];
    orderedList.sort((a, b) => a - b);
    rideQueue.queue = orderedList;
  }
});
  
  useTask$(async () => {
    // fix: Mudar pro sqlite interno.
    const response = await axios.get(`${SERVER_URL}/entidade`);
    veterinarios.values = response.data
      .filter((elemento: EntidadeType) => elemento.base === 'veterinario') 
      .map((elemento: EntidadeType) => ({
        ...elemento,
      }));
      clinicas.values = response.data
      .filter((elemento: EntidadeType) => elemento.base === 'clinica') 
      .map((elemento: EntidadeType) => ({
        ...elemento,
      }));
  })

  const counterQueue = useSignal(0);
  let hora = 8;
  const rows = 11;

  return (
    
      <div class="w-full flex flex-col items-center justify-center">
      <main class = "w-4/5 text-center">
        <h1 class="pt-4 font-bold text-xl ">{props.title}</h1>
        <div class="overflow-x-auto ">
        <table class="w-full  overflow-x-auto table-auto  border-spacing-x-0 text-center mt-6">
            <thead class="table-head top-[-1px] text-base text-style-100 bg-blue-700">
              <th class=" rounded-tl-xl sticky bg-blue-700"></th>
              {veterinarios.values.map((veterinario, index) => {
                return (
                  <th class={`p-3 ${index === veterinarios.values.length - 1 ? 'rounded-tr-xl' : ''}`}>
                    {veterinario.name}
                  </th>
                );
              })}
            </thead>
          <tbody class="">
            <tr class="">
              <td class="bg-blue-700 text-white font-bold p-1"> Origem </td>
              {veterinarios.values.map((veterinario, index) => {
                return (
                  <td>{veterinario.endereco}</td>
                )
              })}
            </tr>
          {Array.from({ length: rows }, (_, index) => {
            const hora = index + 8; 
            return (
              <tr key={index}>
                <td class="p-3">{`${hora}:00`}</td> 
                {veterinarios.values.map(async (veterinario: EntidadeType) => {
                    const lastClinicaScheduled = useStore<ClinicaSchedule>
                    ({  origemId : parseInt(veterinario.id), destinoId: actualClinicaId});
                    const distancia = useSignal(0);
                    const handleChange =  $(async (event: React.ChangeEvent<HTMLSelectElement>) => {
                    console.log("Id origem atual: "+lastClinicaScheduled.origemId);
                    distancia.value = await getDistanceClinica(lastClinicaScheduled.origemId, parseInt(event.target.value));
                    console.log("Distância entre 1º ponto e 2º: "+distancia.value);
                    lastClinicaScheduled.origemId = parseInt(event.target.value);
                    console.log("Id da próxima origem: " +lastClinicaScheduled.origemId)
                  });
                 const rangeClass = await getRangeDistance(distancia.value);
          return (
                    <td key={veterinario.id}>
                      <select
                        title={`${distancia.value} Km`}
                        class={`w-full bg-green flex items-center justify-center border-none ${rangeClass ? [rangeClass] : "bg-transparent"}`}
                        name="agenda"
                        id="agenda"
                        onChange$={handleChange}
                      >
                        <option value="0"></option>
                        {clinicas.values.map((clinica: EntidadeType) => {
                          return (
                            <option class="text-xs" value={clinica.id} key={clinica.id}>
                              {clinica.name}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                  );
                })}

              </tr>
            );
          })}

          </tbody>
        </table>
        </div>
      </main>
    </div>

  );
});