import { $, component$, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import axios from "axios";
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { EntidadeProps, EntidadeType } from "~/contexts/Entidade";
import { SERVER_URL } from "~/utils/url";


type Data = {
 date: number;
 formatedDate: string;
}

export default component$ (() => {

    // fix: virá por contexto...
    const clinicas = useStore<EntidadeProps>({
        values: [],
    });
    
    const dates = useStore<Data>({
        date: 0,
        formatedDate: format( new Date(), 'dd/MM', { locale: ptBR })
    })




    const handleChangeDate = $( (event: React.ChangeEvent<HTMLInputElement>) => {
        dates.date = Number(event.target.value);
        dates.formatedDate = format(dates.date,'dd/MM', { locale: ptBR })
        console.log(dates.date);
    })

    useTask$(async () => {
        // fix: Mudar pro sqlite interno.
    const response = await axios.get(`${SERVER_URL}/entidade`);

    clinicas.values = response.data
          .filter((elemento: EntidadeType) => elemento.base === 'clinica') 
          .map((elemento: EntidadeType) => ({
            ...elemento,
          }));
    });

    return (
        <div class="flex items-center  w-full justify-between">
            <div class=" p-4 w-60 bg-purple-300 rounded-r-xl">
                <div class="flex justify-between items-center font-bold ">
                    <span class="">Data </span>
                    <span class="">{dates.formatedDate}</span>
                    {/* 
                     <input type="date" value={dates.date} onChange$={handleChangeDate} />
                     */}
                </div>
                <div class="flex justify-between items-center">
                    <span>Clinica: </span>
                    <select class="bg-transparent w-28" name="clinica" id="clinica">
                        {clinicas.values.map((clinica: EntidadeType) => {
                          return (
                            <option class="text-xs" value={clinica.id} key={clinica.id}>
                              {clinica.name}
                            </option>
                          );
                        })}
                    </select>
                </div>
            </div>
            <div>
                <div class="flex flex-col">
                    <button class="border-none py-2 px-4 rounded-lg text-sm font-medium text-white bg-purple-700 shadow-md hover:opacity-80 transition-all duration-500 ease-in-out mt-4">
                        Combo datas</button>
                        <button class="border-none py-2 px-4 rounded-lg text-sm font-medium text-white bg-purple-700 shadow-md hover:opacity-80 transition-all duration-500 ease-in-out mt-4">
                        Combo clínicas cadastradas</button>
                </div>
            </div>
        </div>
    )
})  