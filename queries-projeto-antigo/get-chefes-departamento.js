const { MongoClient } = require('mongodb');

// Conexão com o banco de dados
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function getChefesDeDepartamento() {
    try {
        await client.connect();
        const db = client.db('faculdade');

        // Buscando professores que são chefes de departamento
        const chefes = await db.collection('departamentos').find({
            "chefe.id_professor": { $exists: true }
        }).toArray();

        if (chefes.length > 0) {
            console.log(`Professores que são chefes de departamento:`);
            chefes.forEach(departamento => {
                console.log(`Professor: ${departamento.chefe.nome} (ID: ${departamento.chefe.id_professor})`);
                console.log(`Departamento: ${departamento.nome}`);
                console.log('-----------------------------');
            });
        } else {
            console.log(`Nenhum chefe de departamento encontrado.`);
        }
    } finally {
        await client.close();
    }
}

// Executa a função
getChefesDeDepartamento().catch(console.error);
