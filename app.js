const express = require('express');
const app = express();
const port = 3000;

const mainRoute = require('./routes');

// Middleware
app.use(express.json());

// Routes
app.use('/api/treasures', mainRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
