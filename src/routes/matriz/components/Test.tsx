import { component$ } from "@builder.io/qwik";


const distanciaEntreClinicas = [
  [0, 10, 15, 20], // distâncias da clínica 1 para as outras clínicas (incluindo ela mesma)
  [10, 0, 8, 12], // distâncias da clínica 2 para as outras clínicas (incluindo ela mesma)
  [15, 8, 0, 5], // distâncias da clínica 3 para as outras clínicas (incluindo ela mesma)
  [20, 12, 5, 0], // distâncias da clínica 4 para as outras clínicas (incluindo ela mesma)
];

const distanciaClinicaParaVeterinarios = [
  [2, 5, 10], // distâncias da clínica 1 para os veterinários
  [7, 3, 8], // distâncias da clínica 2 para os veterinários
  [12, 8, 3], // distâncias da clínica 3 para os veterinários
  [17, 13, 8], // distâncias da clínica 4 para os veterinários
];

export const TabelaDistancias = component$(()=> {

  return (
    <> 
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Clínica 1</th>
          <th>Clínica 2</th>
          <th>Clínica 3</th>
          <th>Clínica 4</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Clínica 1</th>
          {distanciaEntreClinicas[0].map((distancia, index) => (
            <td key={index}>{distancia}</td>
          ))}
        </tr>
        <tr>
          <th>Clínica 2</th>
          {distanciaEntreClinicas[1].map((distancia, index) => (
            <td key={index}>{distancia}</td>
          ))}
        </tr>
        <tr>
          <th>Clínica 3</th>
          {distanciaEntreClinicas[2].map((distancia, index) => (
            <td key={index}>{distancia}</td>
          ))}
        </tr>
        <tr>
          <th>Clínica 4</th>
          {distanciaEntreClinicas[3].map((distancia, index) => (
            <td key={index}>{distancia}</td>
          ))}
        </tr>
        <tr>
          <th>Distância para Veterinários</th>
          {distanciaClinicaParaVeterinarios.map((distancias, index) => (
            <td key={index}>{distancias.join(', ')}</td>
          ))}
        </tr>
      </tbody>
    </table>
    </>

  )}) 
 
