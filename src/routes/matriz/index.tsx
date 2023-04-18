import { component$, useStore, useTask$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import axios from 'axios';
import { SERVER_URL } from '~/utils/url';
import {TableData} from './components/Table';
import {   TableVxC } from './components/TableVxC';
import { TabelaDistancias } from './components/Test';



export default component$(() => {

  
  return (
    <div class="flex flex-col items-center justify-center">
      {/* 
       */}
      <TableVxC title= "Veterinários X Clínica"></TableVxC>
      {/* 
      <TableData title="Veterinários X Clínica"></TableData>
      <TableData title="Veterinários X Clínica"></TableData>
       */}
    </div>
  );
});

export const head: DocumentHead = {
  title: 'DashBoard Veterinária',
};
