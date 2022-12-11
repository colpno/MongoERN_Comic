import mysql from 'mysql';

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'X2FD39.PpSqA5IhK',
  database: 'comic',
});
