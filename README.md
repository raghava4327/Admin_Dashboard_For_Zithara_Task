# Customer Data Management Application

This application is designed to demonstrate a full-stack development project using React, Node.js, and PostgreSQL. It provides a simple interface for managing customer data, including features like search, pagination, and sorting.

## Features

- Display customer data in a table format.
- Search functionality based on customer name or location.
- Pagination to handle the display of data in chunks.
- Sorting by date or time.
- The `created_at` data is displayed in two separate columns as `date` and `time`.

## Technologies Used

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Others:** Axios for API requests, CORS for cross-origin resource sharing, React Icons for UI enhancements.

## Setup and Installation

### Prerequisites

- Node.js
- npm or yarn
- PostgreSQL

### Database Setup

1. Ensure PostgreSQL is installed and running on your system.
2. Create a database named `postgres`.
3. Use the following SQL command to create the required table:

```sql
CREATE TABLE users (
    sno VARCHAR(12),
    name VARCHAR(300),
    age INT,
    phoneno VARCHAR(10),
    location VARCHAR(100),
    created_at TIMESTAMP
);
```

4. Insert dummy data into the `users` table as needed.

### Backend Setup

1. Navigate to the backend directory.
2. Install the required dependencies:

```bash
npm install
```

3. Start the backend server:

```bash
npm start
```

The server will start on `http://localhost:9000/`.

### Frontend Setup

1. Navigate to the frontend directory.
2. Install the required dependencies:

```bash
npm install
```

3. Start the React application:

```bash
npm start
```

The application will be available on `http://localhost:3000/`.

## Usage

- The application's home page displays the customer data in a table.
- Use the search field to filter data based on the customer's name or location.
- Use the pagination controls at the bottom of the table to navigate through pages.
- Sort the data by clicking on the "Sort by" dropdown menu.

## Acknowledgements

- React Icons
- Axios
- PostgreSQL
- Express


