import express from "express";
import client from "./connection.js"; // Import database client connection
import cors from "cors";
const app = express();
const port = 9000;

// Enable CORS for client-side requests, allowing only GET requests
app.use(
  cors({
    methods: "GET",
  })
);

client.connect(); // Establish connection to the PostgreSQL database

// route to fetch data 
app.get("/api/data", async (req, res) => {
  // Parse query parameters with defaults
  const page = parseInt(req.query.page) || 1; // Current page
  const limit = parseInt(req.query.limit) || 20; // Records per page
  const offset = (page - 1) * limit;
  const search = req.query.search || ""; 
  const sortBy = req.query.sortBy || "date"; // Sort field: "date" or "time"
  const sortOrder = req.query.sortOrder || "asc"; // Sort order: "asc" or "desc"
  const searchBy = req.query.searchBy || "name"; // Search by field: "name" or "location"

  // Determine column for search and sorting
  const searchColumn = searchBy === "location" ? "location" : "name";
  const sortColumn =
    sortBy === "time"
      ? "EXTRACT(HOUR FROM created_at::timestamp)" // If sorting by time, extract hour from timestamp
      : "created_at::timestamp"; // Default sort by full timestamp (date)

  // Construct SQL query with search and pagination parameters
  // Search operation using ILIKE for case-insensitive matching
  // Ordering by chosen column and direction
  // Limit records per page and apply offset for pagination
  let query = `
      SELECT *, TO_CHAR(created_at::timestamp, 'YYYY-MM-DD') as date, TO_CHAR(created_at::timestamp, 'HH24:MI:SS') as time
      FROM users
      WHERE ${searchColumn} ILIKE '%${search}%' 
      ORDER BY ${sortColumn} ${sortOrder} 
      LIMIT ${limit} OFFSET ${offset} 
    `;

  // Query to count total records matching the search criteria (without pagination)
  const countQuery = `
      SELECT COUNT(*) FROM users
      WHERE ${searchColumn} ILIKE '%${search}%'
    `;

  try {
    const result = await client.query(query); // Execute the main query
    const countResult = await client.query(countQuery); // Execute the count query
    const total = parseInt(countResult.rows[0].count, 10); // Total records matching search criteria

    // Prepare and send the response
    const response = {
      error: false,
      total,
      page,
      limit,
      customers: result.rows, // Data rows
    };

    res.status(200).json(response); // Send success response
  } catch (err) {
    console.error(err); // Log error to console
    return res.status(500).send({ message: "Internal Server Error" }); // Send error response
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`); // Start the server and listen on the specified port
});
