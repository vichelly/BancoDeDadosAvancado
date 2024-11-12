const { MongoClient } = require('mongodb');

async function insertMoreData() {
    const url = 'mongodb://localhost:27017';
    const dbName = 'faculdade';
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db(dbName);

        // Inserindo mais professores
await db.collection('professores').insertMany([
  {
    id_professor: 1,
    nome: "Charles",
    disciplinas_ministradas: [
      {
        id_disciplina: 103,
        nome: "Compiladores",
        ano: 2024,
        semestre: 2
      },
      {
        id_disciplina: 102,
        nome: "Sistemas Operacionais",
        ano: 2024,
        semestre: 1
      },
      {
        id_disciplina: 105,
        nome: "Estrutura de Dados",
        ano: 2024,
        semestre: 2
      }
    ],
    chefe_departamento: {
      id_departamento: 1,
      nome: "Ciências"
    }
  },
  {
      id_professor: 2,
      nome: "Isaac",
      disciplinas_ministradas: [
        {
          id_disciplina: 106,
          nome: "Automatos",
          ano: 2024,
          semestre: 1
        },
        {
          id_disciplina: 108,
          nome: "Engenharia de Software",
          ano: 2024,
          semestre: 1
        }
      ],
      chefe_departamento: {
          id_departamento: 2,
          nome: "Engenharias"
      }
  },
  {
      id_professor: 3,
      nome: "Paulo Sérgio",
      disciplinas_ministradas: [
        {
          id_disciplina: 101,
          nome: "Cálculo",
          ano: 2024,
          semestre: 2
        },
        {
          id_disciplina: 107,
          nome: "Teoria da Computação",
          ano: 2024,
          semestre: 2
        }
      ]
  },
  {
    id_professor: 4,
    nome: "Leonardo Anjoletto",
    disciplinas_ministradas: [
        {
          id_disciplina: 104,
          nome: "Banco de Dados",
          ano: 2024,
          semestre: 1
        }
    ]
}
]);

        console.log("Dados inseridos com sucesso!");
    } finally {
        await client.close();
    }
}

insertMoreData().catch(console.error);
