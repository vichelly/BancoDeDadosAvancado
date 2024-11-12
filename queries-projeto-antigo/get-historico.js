const { MongoClient } = require('mongodb');

// Conexão com o banco de dados
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function getHistoricoEscolar(id_aluno) {
    try {
        await client.connect();
        const db = client.db('faculdade');

        // Buscando o histórico escolar do aluno
        const aluno = await db.collection('alunos').findOne({ id_aluno });

        if (aluno) {
            console.log(`Histórico escolar de ${aluno.nome}:`);
            aluno.historico_escolar.forEach(item => {
                console.log(`Disciplina: ${item.disciplina.id_disciplina} - ${item.disciplina.nome}`);
                console.log(`Semestre: ${item.semestre}, Ano: ${item.ano}`);
                console.log(`Nota Final: ${item.nota_final}`);
                console.log('-----------------------------');
            });
        } else {
            console.log(`Aluno com ID ${id_aluno} não encontrado.`);
        }
    } finally {
        await client.close();
    }
}

// Executa a função para um aluno específico (substitua pelo ID do aluno desejado)
getHistoricoEscolar(3).catch(console.error); // Exemplo: ID do aluno 1
