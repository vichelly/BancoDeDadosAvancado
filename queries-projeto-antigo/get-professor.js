const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run(professorId) { // Adiciona um parâmetro para o ID do professor
  try {
    await client.connect();
    const database = client.db('faculdade');
    const collection = database.collection('professores');

    const result = await collection.aggregate([
      {
        $match: {
          id_professor: professorId // Filtra pelo ID do professor
        }
      },
      {
        $lookup: {
          from: "disciplinas", // Nome da coleção de disciplinas
          localField: "disciplinas_ministradas.id_disciplina", // Campo que contém a referência à disciplina
          foreignField: "id_disciplina", // Campo na coleção de disciplinas que corresponde ao localField
          as: "disciplina_info"
        }
      },
      {
        $unwind: "$disciplina_info" // Desagrega as disciplinas
      },
      {
        $project: {
          nome_disciplina: "$disciplina_info.nome", // Nome da disciplina
          semestre: "$disciplina_info.semestre", // Semestre da disciplina
          ano: "$disciplina_info.ano", // Ano da disciplina
          professor_nome: "$nome" // Nome do professor
        }
      }
    ]).toArray();

    console.log(result);
  } finally {
    await client.close();
  }
}

// Exemplo de uso:
run(1); // Substitua 2 pelo ID do professor desejado
