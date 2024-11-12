const { MongoClient } = require('mongodb');

// Conexão com o banco de dados
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db('faculdade');

        // Inserindo disciplinas diretamente
        const result = await db.collection('disciplinas').insertMany([
            {
                id_disciplina: 101,
                nome: "Cálculo",
                professor: {
                    id_professor: 3,
                    nome: "Paulo Sérgio"
                }
            },
            {
                id_disciplina: 102,
                nome: "Sistemas Operacionais",
                professor: {
                    id_professor: 1,
                    nome: "Charles"
                }
            },
            {
                id_disciplina: 103,
                nome: "Compiladores",
                professor: {
                    id_professor: 1,
                    nome: "Charles"
                }
            },
            {
                id_disciplina: 104,
                nome: "Banco de Dados",
                professor: {
                    id_professor: 3,
                    nome: "Paulo Sérgio"
                }
            },
            {
                id_disciplina: 105,
                nome: "Estrutura de Dados",
                professor: {
                    id_professor: 1,
                    nome: "Charles"
                }
            },
            {
                id_disciplina: 106,
                nome: "Automatos",
                professor: {
                    id_professor: 2,
                    nome: "Isaac"
                }
            },
            {
                id_disciplina: 107,
                nome: "Teoria da Computação",
                professor: {
                    id_professor: 3,
                    nome: "Paulo Sérgio"
                }
            },
            {
                id_disciplina: 108,
                nome: "Engenharia de Software",
                professor: {
                    id_professor: 2,
                    nome: "Isaac"
                }
            },
            {
                id_disciplina: 109,
                nome: "Sistemas Digitais",
                professor: {
                    id_professor: 2,
                    nome: "Isaac"
                }
            }
        ]);

        console.log(`${result.insertedCount} disciplinas foram inseridas com sucesso!`);
    } finally {
        await client.close();
    }
}

// Executa a função principal
run().catch(console.error);
