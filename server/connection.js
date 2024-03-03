// Import 'pg' package for PostgreSQL interaction
import pkg from 'pg';
// Extract Client class from the package
const { Client } = pkg;

// Set up database client with connection details
const client = new Client({
  host: "localhost", // Database server address
  user: "postgres", // Database user
  port: 5432, // Database server port
  password: "admin", // Database password
  database: "postgres" // Database name
});

// Export the client for use in other parts of the application
export default client;
