const yargs = require("yargs")
const connectDB = require("./../database/dbConnectPool")

yargs
    .command({
        command: 'create-users-table',
        describe: 'create users table',
        async handler(argv) {
            try {
                const pool = await connectDB()
                const query = `
                    CREATE TABLE users(
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(100),
                        email VARCHAR(100),
                        password VARCHAR(100),
                        refreshToken VARCHAR DEFAULT NULL
                    )
                `
                const response = await pool.query(query);
                console.log(response);

            } catch(e) {
                console.log(e);
            }
        }

    })
    .command({
        command: 'insert-user',
        describe: 'insert user',
        async handler(argv) {
            try {
                const { id, email, name, password } = argv;
                const pool = await connectDB()
                const result = await pool.query(`
                    INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)
                `, [id, name, email, password])
                console.log("Result = ", result)
            } catch(e) {
                console.log("Error = ", e)
            }
        } 
    })

yargs.parse()