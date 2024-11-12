const { MongoClient } = require('mongodb');

// Conexão com o banco de dados
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db('faculdade');

        // Inserindo cursos de Ciência da Computação e Engenharia Elétrica
        const result = await db.collection('cursos').insertMany([
            {
                id_curso: 1,
                nome: "Ciência da Computação",
                departamento: {
                    id_departamento: 1,
                    nome: "Ciência da Computação"
                }
            },
            {
                id_curso: 2,
                nome: "Engenharia Elétrica",
                departamento: {
                    id_departamento: 2,
                    nome: "Engenharia Elétrica"
                }
            }
        ]);

        console.log(`${result.insertedCount} cursos foram inseridos com sucesso!`);
    } finally {
        await client.close();
    }
}

// Executa a função principal
run().catch(console.error);
