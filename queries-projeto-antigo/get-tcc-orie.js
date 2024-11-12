const { MongoClient } = require('mongodb');

// Conexão com o banco de dados
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function getAlunosComTCC() {
    try {
        await client.connect();
        const db = client.db('faculdade');

        // Buscando alunos que formaram grupos de TCC
        const alunos = await db.collection('alunos').find({
            "grupo_TCC": { $exists: true }
        }).toArray();

        if (alunos.length > 0) {
            console.log(`Alunos que formaram grupos de TCC:`);
            alunos.forEach(aluno => {
                console.log(`ID Aluno: ${aluno.id_aluno} - Nome: ${aluno.nome}`);
                console.log(`Tema do TCC: ${aluno.grupo_TCC.tema}`);
                console.log(`Orientador ID: ${aluno.grupo_TCC.orientador.id_professor}`);
                console.log(`Orientador Nome: ${aluno.grupo_TCC.orientador.nome}`);
                console.log('-----------------------------');
            });
        } else {
            console.log(`Nenhum aluno encontrado que formou um grupo de TCC.`);
        }
    } finally {
        await client.close();
    }
}

// Executa a função
getAlunosComTCC().catch(console.error);
