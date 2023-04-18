
import sqlite3 from "sqlite3";
import {open} from "sqlite";
export interface EntidadeType {
  id: string;
  name: string;
  email: string;
  base: "clinica" | "veterinario";
  telefone: string;
  regiao: string;
  endereco: string[];
}


export async function openDB() {
  return open ({
    filename: "./sav-dev.db",
    driver: sqlite3.Database
  })
}


export async function getEntidade(){
 const sql = "select * from Entidade";

  return openDB().then(db => {
    return  db.all(sql).then(res => res)
  })
}

export async function getDistanceClinica(origemId: number, destinoId : number){
  const sql = 
  "SELECT (SELECT name FROM Entidade WHERE id = d.entidade1) AS Origem,(SELECT name FROM Entidade WHERE id = d.entidade2) AS Destino, d.distancia as distancia FROM Distancia d WHERE (d.entidade1 =? and d.entidade2 =?) OR  (d.entidade2 =? AND d.entidade1 =?)";

  return openDB().then(db => {
    return db.get(sql,[origemId,destinoId,origemId,destinoId]).then(res => res);
  })

}
export async function setEntidade(data: EntidadeType){
  //console.log("function..."+data);
  const sql = "INSERT INTO Entiade (name, email, endereco, telefone, regiao, base) values (?,?,?,?,?,?)";
  openDB()
    .then(db => {
    db.run(sql,[data.name,data.email, data.endereco, data.telefone, data.regiao,data.base])
  });
}



