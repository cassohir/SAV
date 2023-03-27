/* eslint-disable */

import { $, component$, useStore } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { FieldDataType, InputProps, SelectProps } from './components/Field';

import type { UseFormRegister, FieldErrorsImpl } from 'react-hook-form';




import Field from './components/Field';




type Props = {

  formTitle?: string;
  base: "CLINICA" | "VETERINARIO";
  fieldDataType?: FieldDataType[]; 

};

//type: "input" | "select";
//labelText: string;
//for: string;
//dataField: InputProps | SelectProps;

  const Form = component$(( {formTitle, fieldDataType}  : Props) => {
    const formState = useStore({
      value: 0,

    });
    const handleSubmit = $(() => {
      console.log("Submited");
    })

    return (
      <div class="main-container">
      <h3>{formTitle}</h3>
    <div class="container">
   {/*   {fieldDataType?.map(({type , labelText, dataField} => {
        if(type === 'input'){
          retur
        }
      }))}
    */}
      <button onClick$={handleSubmit}  type="submit">Cadastrar</button>
        </div>
        </div>
  );
});



export default Form;
