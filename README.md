### README.md

# Node.js with MySQL Mini Project

## Introduction

Kitra is a game where users can collect treasures in a given latitude and longitude. Every treasure collected has points based on its monetary value. A treasure may have more than one monetary value, depending on the user's luck. Kitra users aim to get the highest money value from the treasure collected.

This project involves creating a Node.js application with Express.js and MySQL to manage and interact with treasure data. The application provides API endpoints to find treasure boxes within a certain distance, with specific prize values, and to list treasures by proximity.

## Prerequisites

- Node.js (>= 14.x)
- MySQL
- npm (>= 6.x)

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/renmission/kitra_game.git
cd kitra_game
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up MySQL

#### Install MySQL Server

If you don't have MySQL installed, you can download and install it from the [official MySQL website](https://dev.mysql.com/downloads/mysql/).

#### Start MySQL Server

Start the MySQL server using MySQL Workbench. On Mac, you can also start the server using the following command if installed via Homebrew:

```bash
brew services start mysql
```

#### Create Database

Log in to the MySQL server using MySQL Workbench and create the `kitra_game` database. Alternatively, you can use the command line:

```bash
mysql -u root -p
```

Once logged in, create the database:

```sql
CREATE DATABASE kitra_game;
```

### 4. Configure config file

Config file in the config directory and add the following:

```plaintext
{
  "development": {
    "username": "root",
    "password": "password",
    "database": "kitra_game",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

Replace `root` and `password` with your MySQL username and password.

### 5. Set Up the Database

#### Create Tables and Seed Data

Run the following commands to create tables and seed the database with sample data:

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## Running the Application

Start the Node.js server:

```bash
npm run dev
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
        "id": 102,
        "latitude": 14.5446435656183,
        "longitude": 121.020365629871,
        "name": "T3",
        "createdAt": "2024-07-18T05:36:38.000Z",
        "updatedAt": "2024-07-18T05:36:38.000Z",
        "moneyValues": [
            {
                "id": 21,
                "treasure_id": 102,
                "amt": 20,
                "createdAt": "2024-07-18T05:36:38.000Z",
                "updatedAt": "2024-07-18T05:36:38.000Z"
            },
            {
                "id": 3,
                "treasure_id": 102,
                "amt": 15,
                "createdAt": "2024-07-18T05:36:38.000Z",
                "updatedAt": "2024-07-18T05:36:38.000Z"
            }
        ]
    }
]
```

### 3. List Treasures By Proximity

**Endpoint:** `/api/treasures/proximity`

**Method:** `GET`

**Query Parameters:**

- `latitude` (required): Latitude of the location.
- `longitude` (required): Longitude of the location.
- `distance` (required): Distance in km (only accepts positive numbers).

**Example Request:**

```http
GET /api/treasures/proximity?latitude=14.552036595352455&longitude=121.01696118771324&distance=1
```

**Response:**

```json
{
    "treasures": [
        {
            "name": "T3",
            "latitude": 14.5446435656183,
            "longitude": 121.020365629871,
            "total": 35,
            "proximity": 0.9000319175858437
        },
        {
            "name": "T1",
            "latitude": 14.5437648051331,
            "longitude": 121.019911678311,
            "total": 35,
            "proximity": 0.973058105284692
        }
    ]
}
```

## Testing

You can use Postman or any similar tool to test the API endpoints. Ensure that the server is running and send requests to the endpoints as described above.

## Additional Information

For more information or any queries, please contact the project maintainer.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.