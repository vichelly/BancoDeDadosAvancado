const { MongoClient } = require('mongodb');

// Conexão com o banco de dados
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function getAlunosFormados(ano, semestre) {
    try {
        await client.connect();
        const db = client.db('faculdade');

        // Buscando alunos que foram aprovados em todas as disciplinas da matriz curricular
        const alunos = await db.collection('alunos').find({
            "historico_escolar": {
                $elemMatch: {
                    ano: ano,
                    semestre: semestre,
                    nota_final: { $gte: 5 } // Considerando que a nota mínima para aprovação é 7
                }
            }
        }).toArray();

        if (alunos.length > 0) {
            console.log(`Alunos formados no semestre ${semestre} do ano ${ano}:`);
            alunos.forEach(aluno => {
                console.log(`ID Aluno: ${aluno.id_aluno} - Nome: ${aluno.nome}`);
                aluno.historico_escolar.forEach(item => {
                    if (item.ano === ano && item.semestre === semestre) {
                        console.log(`  Disciplina: ${item.disciplina.id_disciplina} - ${item.disciplina.nome}`);
                        console.log(`  Nota Final: ${item.nota_final}`);
                    }
                });
                console.log('-----------------------------');
            });
        } else {
            console.log(`Nenhum aluno encontrado que se formou no semestre ${semestre} do ano ${ano}.`);
        }
    } finally {
        await client.close();
    }
}

// Executa a função para um semestre e ano específicos (substitua pelos valores desejados)
getAlunosFormados(2024, 1).catch(console.error); // Exemplo: Semestre 2 do ano 2024
