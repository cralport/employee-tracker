//console.log("skdhfdfs;");
const inquirer = require('inquirer');


const db = require('./config/connection');

const doQuery = async (sql) => (await db.promise().query(sql))[0];

db.connect(async() => {
    console.log("db connected");
    await createInquirer();
    db.destroy();
});

async function createInquirer() {
    const questions = await inquirer.prompt([
        {
            type:'list',
            name: 'title',
            message: 'What is the title?',
            choices: ['View Department', 'exit']
        }
    ])
    console.log(questions);
    if ('View Department' == questions.title ) {
        const results = await doQuery(`SELECT * FROM department`);
        console.table(results);
        await createInquirer();
    }
}