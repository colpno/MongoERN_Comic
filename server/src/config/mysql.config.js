import mysql from 'mysql';

const config = {
  host: 'localhost',
  user: 'root',
  password: 'X2FD39.PpSqA5IhK',
  database: 'comic',
};

export const db = mysql.createConnection(config);
