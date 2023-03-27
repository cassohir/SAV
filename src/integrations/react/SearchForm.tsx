/** @jsxImportSource react */


import { useForm } from "react-hook-form";

import * as z from "zod";


const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
    /* 
    const getTransactions = useContextSelector(TransactionsContext, (context) => {
        return context.getTransactions;
    });
    */
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>();

  async function handleSearchEntidade(data: SearchFormInputs) {
    //await getEntidade(data.query);
  }
  return (
    <form onSubmit={handleSubmit(handleSearchEntidade)} className="my-6 flex gap-2">
      <input
        className="flex-1 rounded-md border-0 bg-gray-200  p-4 placeholder-gray-500"
        type="text"
        placeholder="Busque por veterinários ou clínicas"
        {...register("query")}
      ></input>
      <button 
      type="submit" 
      disabled={isSubmitting}
      className="flex items-center border-blue-700 border gap-3 text-blue-700 border-2  py-4 
        px-6 font-bold rounded-md cursor-pointer transition-colors duration-200 ease-in-out 
        hover:bg-purple-500 hover:border-purple-500 hover:text-white disabled:opacity-60 
        disabled:cursor-not-allowed"
      >
      <i className="ph ph-magnifying-glass text-xl ">
      </i>
        Buscar
      </button>
    </form>
  );
}