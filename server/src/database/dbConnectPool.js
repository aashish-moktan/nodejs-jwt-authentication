const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const connectDb = async () => {
    try {
        const pool = new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT,
        });

        await pool.connect()
        return pool
    } catch (error) {
        console.log("Failed to connect to database")
    }
}

module.exports = connectDb