const sql = require('../config/database');

async function executeQuery(query, values) {
    try {
        const result = await sql.unsafe(query, values);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = executeQuery;