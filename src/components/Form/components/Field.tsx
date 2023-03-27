import { $, component$, createContextId, QwikChangeEvent, useStore, useTask$ } from '@builder.io/qwik';

import "./field.css";


export const FormDataContext = createContextId("FormDataContext");

export interface InputProps {
  name: string;
  type: string;
  placeholder: string;

}

export interface SelectProps {
  name: string;
  options: string[];
}
export interface FieldDataType {
  type: "input" | "select";
  labelText: string;
  for: string;
  dataField: InputProps | SelectProps;
}


export interface FieldProps {
  name: string;
  label?: string;
  inputType?: string;
  placeholder?: string;
  required: boolean; 
  inputProps: InputProps;
 
 }


const Field = component$((props: FieldProps) => { 
  const field  = useStore({
    value: ""
   });
  
  const handleInputChange = $((event : Event) => {

  })
  
  return (
    <div class="container">
    <div>
      <label for={props.name}>{props.label}</label><br></br>
      {props.inputProps.type === "input" ? (
          <input 
            value={field.value} 
            onInput$={handleInputChange}
            type={props.inputType} 
            id={props.name} 
            name={props.name} 
            placeholder={props.placeholder} 
            required={props.required}
          />
        ) : (
          <select
            value={field.value}
            onInput$={handleInputChange}
            id={props.name}
            name={props.name}
            required={props.required}
          >
           {/* {props.inputProps.options?.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
           */}
          </select>
        )}

    {/* 
      <input value ={field.value} 

    
     onInput$={(ev) => {
       field.value = (ev.target as HTMLInputElement).value;
    }}

      type={props.type} id={props.name} name={props.name} placeholder={props.placeholder} required={props.required}></input>

             
    */}
    </div>
    <span>{field.value}</span>
    </div>
    
    )

});




export default Field;
