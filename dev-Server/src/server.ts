


import express from 'express';
import cors from 'cors';
import { clinicas, Entidade, veterinarios } from './database';

import { getDistanceClinica, getEntidade, openDB, setEntidade } from "./utils/DbQuerys";



//CONSULTAS TESTES;

const app = express();
const port = 3333;  

/* rotas de teste */ 
app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
  res.send('Server is Online');
});

//console.log(getDistanceClinica(2,12));

async function testes(){
  const teste = await getDistanceClinica(2,12);
  console.log(teste);
}


app.get('/api/clinicas', (req, res) => {
    res.json(clinicas);
})
app.get('/api/veterinarios', (req, res) => {
    res.json(veterinarios);
})

app.get('/api/entidade', async (req, res) =>{
  const entity = await getEntidade();
  res.json(entity);
})

app.get('/api/getdistanciaclinica/:origemId/:destinoId', async (req , res) => {
  const { origemId, destinoId } = req.params;
  const statement = await getDistanceClinica(Number(origemId), Number(destinoId));
  const distancias = statement ? statement :  0 ;
  res.json(distancias);
})


app.post('/api/entidade', (req, res) => {
    const data = req.body;
    setEntidade(data);
    console.log(data);
    res.send(data);
 });

app.post('/api/veterinarios',(req,res) => {
  const novoVeterinario = req.body;
  console.log(novoVeterinario)
  //veterinarios.push(novoVeterinario);
  res.json(novoVeterinario);
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
