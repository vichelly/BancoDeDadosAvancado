const { MongoClient } = require('mongodb');

// Conexão com o banco de dados
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db('faculdade');

        // Inserindo matrizes curriculares
        const result = await db.collection('matrizes_curriculares').insertMany([
            {
                id_matriz: 1,
                curso: {
                    id_curso: 1,
                    nome: "Ciência da Computação"
                },
                disciplinas_obrigatorias: [
                    { id_disciplina: 101, nome: "Cálculo" },
                    { id_disciplina: 102, nome: "Sistemas Operacionais" },
                    { id_disciplina: 103, nome: "Compiladores" },
                    { id_disciplina: 104, nome: "Banco de Dados" },
                    { id_disciplina: 105, nome: "Estrutura de Dados" },
                    { id_disciplina: 106, nome: "Automatos" },
                    { id_disciplina: 107, nome: "Teoria da Computação" },
                    { id_disciplina: 108, nome: "Engenharia de Software" }
                ]
            },
            {
                id_matriz: 2,
                curso: {
                    id_curso: 2,
                    nome: "Engenharia Elétrica"
                },
                disciplinas_obrigatorias: [
                    { id_disciplina: 101, nome: "Cálculo" }, // Cálculo também é obrigatório para Engenharia Elétrica
                    { id_disciplina: 109, nome: "Sistemas Digitais" } // Adicionando Sistemas Digitais
                ]
            }
        ]);

        console.log(`${result.insertedCount} matrizes curriculares foram inseridas com sucesso!`);
    } finally {
        await client.close();
    }
}

// Executa a função principal
run().catch(console.error);
