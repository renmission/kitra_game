### README.md

# Node.js with MySQL Mini Project

## Introduction

Kitra is a game where users can collect treasures in a given latitude and longitude. Every treasure collected has points based on its monetary value. A treasure may have more than one monetary value, depending on the user's luck. Kitra users aim to get the highest money value from the treasure collected.

This project involves creating a Node.js application with Express.js and MySQL to manage and interact with treasure data. The application provides API endpoints to find treasure boxes within a certain distance and with specific prize values.

## Prerequisites

- Node.js (>= 14.x)
- MySQL
- npm (>= 6.x)

## Project Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd nodejs-mysql-project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```plaintext
DB_HOST=your-database-host
DB_USER=your-database-username
DB_PASS=your-database-password
DB_NAME=your-database-name
```

### 4. Set Up the Database

#### Create Tables and Seed Data

Run the following commands to create tables and seed the database with sample data:

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## Running the Application

Start the Node.js server:

```bash
node app.js
```

The server will start on `http://localhost:3000`.

## API Endpoints

### 1. Find Treasure Boxes Within Distance

**Endpoint:** `/api/treasures`

**Method:** `GET`

**Query Parameters:**

- `latitude` (required): Latitude of the location.
- `longitude` (required): Longitude of the location.
- `distance` (required): Distance in km (only accepts 1 or 10).

**Example Request:**

```http
GET /api/treasures?latitude=14.552036595352455&longitude=121.01696118771324&distance=1
```

**Response:**

```json
[
    {
        "id": 100,
        "latitude": 14.5437648051331,
        "longitude": 121.019911678311,
        "name": "T1",
        "createdAt": "2024-07-18T05:36:38.000Z",
        "updatedAt": "2024-07-18T05:36:38.000Z",
        "moneyValues": [
            {
                "id": 19,
                "treasure_id": 100,
                "amt": 20,
                "createdAt": "2024-07-18T05:36:38.000Z",
                "updatedAt": "2024-07-18T05:36:38.000Z"
            },
            {
                "id": 1,
                "treasure_id": 100,
                "amt": 15,
                "createdAt": "2024-07-18T05:36:38.000Z",
                "updatedAt": "2024-07-18T05:36:38.000Z"
            }
        ]
    }
]
```

### 2. Find Treasure Boxes with Prize Value

**Endpoint:** `/api/treasures`

**Method:** `GET`

**Query Parameters:**

- `latitude` (required): Latitude of the location.
- `longitude` (required): Longitude of the location.
- `distance` (required): Distance in km (only accepts 1 or 10).
- `prize_value` (optional): Prize value range (only accepts whole numbers from 10 to 30).

**Example Request:**

```http
GET /api/treasures?latitude=14.552036595352455&longitude=121.01696118771324&distance=1&prize_value=10
```

**Response:**

```json
[
  {
    "id": 1,
    "latitude": 14.552036595352455,
    "longitude": 121.01696118771324,
    "name": "Treasure 1",
    "moneyValues": [
      { "amt": 10 }
    ]
  }
]
```

### 3. Bonus Endpoint

**Endpoint:** `/api/treasures/bonus`

**Method:** `GET`

**Description:**

This is a placeholder for an additional endpoint that provides extra functionality. You can define any bonus functionality you think would be useful.

## Testing

You can use Postman or any similar tool to test the API endpoints. Ensure that the server is running and send requests to the endpoints as described above.

## Additional Information

For more information or any queries, please contact the project maintainer.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.