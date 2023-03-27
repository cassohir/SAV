/** @jsxImportSource react */

import { useForm } from 'react-hook-form';
import validator from "validator";
import React, { useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '~/utils/url';

interface FormData {
  name: string;
  email: string;
  endereco: string;
  telefone: string;
  regiao: string;
  terms: boolean;
  base: string;
  distancia?: string;
  url?: string;

}

interface FormProps{
  title: string;
  base: "clinica" | "veterinario";
  urlToRecordData?: string;
  
}

const FormReact = (props: FormProps) => {
  const recordUrl = props.base == 'clinica' ? 'clinicas' : 'veterinarios';
  const recordURL = "entidade";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

 

  const onSubmit = (data: FormData) => {
    data.base = props.base;
    data.url = props.urlToRecordData;
    //console.log(JSON.stringify(data));
    /* Url to record data */
    console.log(data);
    gravarDados(data);

  };
  const handleSubmitConverted = () => {
    console.log("Submited");
  };

  const gravarDados = async (data : FormData) => {
    
    try {
       await axios.post(`${SERVER_URL}/${recordURL}`, { 
        name: data.name,
        email: data.email,
        endereco: data.endereco,
        telefone: data.telefone,
        regiao: data.regiao,
        base: data.base,
      }).then(res => {
        console.log(res);
      })
    } catch (error) {
      console.log(error);
    }
  }

  //const formState  = useContext(FormStateContext);


  return (
    <div className="app-container ">
       <h1 className="font-bold self-center mb-2">{props.title}</h1>
      <div className=" flex flex-col mt-3 w-96  ">
        <label className="text-black font-500 mb-4">Nome</label>
        <input
          className={`p-3 border-none rounded-lg outline-none bg-white text-black shadow-md outline-solid border-2 border-gray-400 placeholder-gray-500 focus:outline-error ${
            errors?.name ? 'mt-2 outline outline-current text-red-500' : ''
          }`}
          type="text"
          placeholder= {   props.base == "clinica" ? "Nome da Clínica" : "Nome do Veterinário" }
          {...register("name", { required: true })}
        />
        {errors?.name?.type === "required" && (
          <p className="text-red-500 pl-2 text-xs mt-2">Nome é obrigatório</p>
        )}
      </div>

      <div className=" flex flex-col mt-3 w-96 ">
        <label className="text-black font-500 mb-4">E-mail</label>
        <input
          className={`p-3 border-none rounded-lg outline-none bg-white text-black shadow-md outline-solid border-2 border-gray-400 placeholder-gray-500 focus:outline-error ${
            errors?.name ? 'mt-2 outline outline-current text-red-500' : ''
          }`}
          type="email"
          placeholder="Email para agenda"
          {...register("email", {
            required: true,
            validate: (value) => validator.isEmail(value),
          })}
        />
        {errors?.email?.type === "required" && (
          <p className="text-red-500 pl-2 text-xs mt-2">Email é obrigatório.</p>
        )}

        {errors?.email?.type === "validate" && (
          <p className="text-red-500 pl-2 text-xs mt-2">Email invalido.</p>
        )}
      </div>

      <div className=" flex flex-col mt-3 w-96 ">
          <label className="text-black font-500 mb-4">Endereço</label>
          <input
            className={`p-3 border-none rounded-lg outline-none bg-white text-black shadow-md outline-solid border-2 border-gray-400 placeholder-gray-500 focus:outline-error ${
              errors?.name ? 'mt-2 outline outline-current text-red-500' : ''
            }`}
            type="text"
            placeholder="Rua Um - 156"
            {...register('endereco', { required: true })}
          />
          {errors?.endereco?.type === 'required' && (
            <p className="text-red-500 pl-2 text-xs mt-2">Endereço é obrigatório</p>
          )}
        </div>

        <div className=" flex flex-col mt-3 w-96 ">
          <label className="text-black font-500 mb-4">Telefone</label>
          <input
             className={`p-3 border-none rounded-lg outline-none bg-white text-black shadow-md outline-solid border-2 border-gray-400 placeholder-gray-500 focus:outline-error ${
              errors?.name ? 'mt-2 outline outline-current text-red-500' : ''
            }`}
             type="text"
             placeholder="(XX) 99999-9999"
             {...register('telefone', {
               required: true, 
               validate: (value) => !validator.isAlpha(value),               
             })}
          />
          {errors?.telefone?.type === 'required' && (
            <p className="text-red-500 pl-2 text-xs mt-2">Telefone é obrigatório</p>
            )}
          {errors?.email?.type === "validate" && (
          <p className="text-red-500 pl-2 text-xs mt-2">Digite um número</p>
        )}

        </div>

        <div className=" flex flex-col mt-3 w-96 solid ">
          <label className="text-black font-500 mb-4">Região</label>
          <input
           className={`p-3 border-none rounded-lg outline-none bg-white text-black shadow-md outline-solid border-2 border-gray-400 placeholder-gray-500 focus:outline-error ${
            errors?.name ? 'mt-2 outline outline-current text-red-500' : ''
          }`}
            type="text"
            placeholder="Região Nordeste"
            {...register('regiao', { required: true })}
          />
          {errors?.regiao?.type === 'required' && (
            <p className="text-red-500 pl-2 text-xs mt-2">Região é obrigatória</p>
          )}
        </div>
              {/* 
                    {clinicas.map((clinic) => (
                      <div  className='form-clinica-group' key={clinic.id}>
                      <div>
                        <label htmlFor={`distance-${clinic.id}`}>{clinic.name}</label>
                        <input
                          id={`distance-${clinic.id}`}
                          type=" p-3 number"
                        
                        />
                      </div>
                      </div>
                    ))}       
                      */}
        

      <div className="">
        {/* handleSubmitConverted, handleSubmit(onSubmit)() */ }
        
        <button type="submit" 
              className="border-none py-2 px-4 rounded-lg font-medium text-white bg-purple-700 shadow-md hover:opacity-80 transition-all duration-500 ease-in-out mt-4" 
              onClick={ () =>  handleSubmit(onSubmit)()}
              >Cadastrar</button>
      </div>
    </div>
  );
};

export default FormReact;