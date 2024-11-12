const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run(professorId) { // Adiciona um parâmetro para o ID do professor
  try {
    await client.connect();
    const database = client.db('faculdade');
    const collection = database.collection('alunos');

    const result = await collection.aggregate([
      {
        $lookup: {
          from: "disciplinas",
          localField: "disciplina",
          foreignField: "_id",
          as: "disciplina_info"
        }
      },
      {
        $unwind: "$disciplina_info"
      },
      {
        $lookup: {
          from: "professores",
          localField: "disciplina_info.professor",
          foreignField: "_id",
          as: "professor_info"
        }
      },
      {
        $unwind: "$professor_info"
      },
      {
        $match: {
          "professor_info.id": professorId
        }
      },
      {
        $project: {
          nome_disciplina: "$disciplina_info.nome",
          semestre: 1,
          ano: 1,
          professor: "$professor_info.nome"
        }
      }
    ]).toArray();

    console.log(result);
  } finally {
    await client.close();
  }
}

// Exemplo de uso:
run(1); // Substitua 5 pelo ID do professor desejado