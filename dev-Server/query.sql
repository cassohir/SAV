
INSERT INTO Distancia (Entidade1, Entidade2, 'distancia') values (11, 13, 20 );

SELECT * FROM Entidade;
SELECT * FROM Distancia;  


SELECT  Entidade.name, Distancia.distancia
FROM Entidade 
INNER  JOIN Distancia ON Entidade.id = distancia.Entidade
WHERE distancia.Entidade1 = 12;


SELECT * FROM Distancia d WHERE d.entidade1 = 13 OR d.entidade2 = 13;




-- Distancias relacionadas pra cada Entidade ...
SELECT
(SELECT name FROM Entidade WHERE id = d.entidade1) AS Origem,
(SELECT name FROM Entidade WHERE id = d.entidade2) AS Destino,
d.distancia AS Distancia
FROM Distancia d
WHERE d.entidade1 = 9 OR d.entidade2 = 9;
--- 


-- Busca por Distância Origem e Destino
SELECT
(SELECT name FROM Entidade WHERE id = d.entidade1) AS Origem,
(SELECT name FROM Entidade WHERE id = d.entidade2) AS Destino,
d.distancia AS Distancia
FROM Distancia d
WHERE (d.entidade1 = 2 and d.entidade2 = 12) OR (d.entidade2 = 2 AND d.entidade1= 12);

-- Delete 
SELECT * FROM Distancia d WHERE d.distancia = 5;
DELETE FROM Distancia WHERE id = 10;

-- Distância entre clínicas

SELECT 
et1.name AS Clinica1,
et2.name AS Clinica2,
Distancia.distancia AS Distancia
FROM 
Distancia 
INNER JOIN Entidade AS et1 ON Distancia.Entidade1 = et1.id AND et1.base ='clinica'
INNER JOIN Entidade AS et2 ON Distancia.Entidade2 = et2.id AND et2.base = 'clinica';
--filtro
WHERE et1.name LIKE '%João%' OR et2.name LIKE '%João%';

--Biocor Hemres  MaterDay Teles João
-- WHERE et1.id < et2.id ;


-- Distancia entre veterinario e Clínicas
SELECT 
et1.name AS veterinario,
et2.name AS Clinica,
Distancia.distancia AS Distancia
FROM 
Distancia 
INNER JOIN Entidade AS et1 ON Distancia.Entidade1 = et1.id AND et1.base ='veterinario'
INNER JOIN Entidade AS et2 ON Distancia.Entidade2 = et2.id AND et2.base = 'clinica';
-- Filtro 
WHERE
et1.name = 'John Doe';
