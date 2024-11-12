const { MongoClient } = require('mongodb');

async function insertMoreData() {
    const url = 'mongodb://localhost:27017';
    const dbName = 'faculdade';
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db(dbName);

        // Inserindo cursos
        await db.collection('departamentos').insertMany([
            {
                id_departamento: 1,
                nome: "Ciência da Computação",
                chefe: {
                  id_professor: 4,
                  nome: "Charles"
                }
              },
              {
                id_departamento: 2,
                nome: "Elétrica",
                chefe: {
                  id_professor: 2,
                  nome: "Isaac"
                }
              }
        ]);

        console.log("Dados inseridos com sucesso!");
    } finally {
        await client.close();
    }
}

insertMoreData().catch(console.error);
