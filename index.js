//index.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser'); // Import body-parser
const cors = require('cors'); // Import cors module
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();
const PORT = process.env.PORT || 3000;

// Use body-parser middleware
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Initialize ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server and apply middleware
async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
}

// Use student routes
const studentRoutes = require('./routes/student');
app.use('/api', studentRoutes);

// Use course routes
const courseRoutes = require('./routes/course');
app.use('/api', courseRoutes);

// Use enrollment routes
const enrollmentRoutes = require('./routes/enrollment');
app.use('/api', enrollmentRoutes);

// Start the server and listen for connections
startServer().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});






