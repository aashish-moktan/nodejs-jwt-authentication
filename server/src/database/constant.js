export function createTableQuery(tableName, columns) {
    const query = `
        CREATE TABLE users (
            id INTERGER AUTO INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100),
            password VARCHAR(100)
        )
    `       
    return query
}
