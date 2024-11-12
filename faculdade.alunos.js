const { MongoClient } = require('mongodb');

// Conexão com o banco de dados
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db('faculdade');  
        const alunosCollection = database.collection('alunos');

        // Inserindo os novos alunos diretamente
        const result = await alunosCollection.insertMany([
            {
                id_aluno: 1,
                nome: "Vitor Lucas Fujita Felício",
                historico_escolar: [
                    {
                        ano: 2024,
                        semestre: 2,
                        nota_final: 8.5,
                        disciplina: {
                           id_disciplina: 103,
                           nome: "Compiladores"
                        }
                    }
                ],
                grupo_TCC: {
                    id_grupo_tcc: 10,
                    tema: "Rotas de GPS para Caminhões",
                    orientador: { id_professor: 4 },
                    colegas: [
                        { id_aluno: 2, "nome": "Murilo da Fonseca Guimarães" },
                        { id_aluno: 3, "nome": "Juan Caio" },
                        { id_aluno: 4, "nome": "Rafael Leal" }
                    ]
                }
            },
            {
                id_aluno: 2,
                nome: "Murilo da Fonseca Guimarães",
                historico_escolar: [
                    {
                        ano: 2023,
                        semestre: 1,
                        nota_final: 9.5,
                        disciplina: {
                            id_disciplina: 101,
                            nome: "Cálculo"
                        }
                    }
                ],
                grupo_TCC: {
                    id_grupo_tcc: 10,
                    tema: "Rotas de GPS para Caminhões",
                    orientador: { id_professor: 4 },
                    colegas: [
                        { id_aluno: 1, nome: "Vitor Lucas Fujita Felício" },
                        { id_aluno: 3, nome: "Juan Caio" },
                        { id_aluno: 4, nome: "Rafael Leal" }
                    ]
                }
            },
            {
                id_aluno: 3,
                nome: 'Juan Caio',
                historico_escolar: [
                  {
                      ano: 2024,
                      semestre: 1,
                      nota_final: 2,
                      disciplina: { id_disciplina: 103, nome: 'Compiladores' }
                  },
                  {
                      ano: 2024,
                      semestre: 2,
                      nota_final: 9.0,
                      disciplina: { id_disciplina: 104, nome: 'Banco de Dados' }
                  }
                ],
                grupo_TCC: {
                  id_grupo_tcc: 10,
                  tema: 'Rotas de GPS para Caminhões',
                  orientador: { id_professor: 4 },
                  colegas: [
                      { id_aluno: 1, nome: 'Vitor Lucas Fujita Felício' },
                      { id_aluno: 2, nome: 'Murilo da Fonseca Guimarães' },
                      { id_aluno: 4, nome: 'Rafael Leal' }
                  ]
              }
            },
            {
                id_aluno: 4,
                nome: 'Rafael Leal',
                historico_escolar: [
                  {
                      ano: 2024,
                      semestre: 1,
                      nota_final: 8.8,
                      disciplina: { id_disciplina: 105, nome: 'Estrutura de Dados' }
                  }
                ],
                grupo_TCC: {
                  id_grupo_tcc: 10,
                  tema: 'Rotas de GPS para Caminhões',
                  orientador: { id_professor: 4 },
                  colegas: [
                      { id_aluno: 1, nome: 'Vitor Lucas Fujita Felício' },
                      { id_aluno: 2, nome: 'Murilo da Fonseca Guimarães' },
                      { id_aluno: 3, nome: 'Juan Caio' }
                  ]
              }
            }
        ]);

        console.log(`alunos foram inseridos`);

    } finally {
        await client.close();
    }
}

// Executa a função principal
run().catch(console.dir);
