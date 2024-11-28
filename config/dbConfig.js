module.exports = {
    HOST: process.env.DB_HOST || 'mysql',  // Use 'mysql' service in Docker Compose
    PORT: process.env.DB_PORT || 3306,     // MySQL port from Docker Compose
    USER: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASSWORD || 'test123',  // Password can be set in docker-compose or .env
    DB: process.env.DB_NAME || 'notes_db',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
