import { openDB  } from "./DbQuerys";

interface EntidadeProps {
 name: string;
 email: string;
 endereco: string;
 telefone: string;
 regiao: string;
 base: "veterinario" | "clinica";
}

interface DistanciaProps {
    endereco1: string; // Endereço da Entidade 1 ( referência ao Id da Entiddade 1)
    endereco2: string; // Endereço da Entidade 2 ( referência ao Id da entidade 2)
    distancia: number;

}

//export default async function createTable()