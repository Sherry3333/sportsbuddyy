import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const Port = process.env.PORT ?? 5000; 

const server = express();
server.use(cors()); //allow cross-origin requests
server.use(express.json()); //parse json requests


const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "My Express API",
        version: "1.0.0",
        description: "build api documentation using swagger",
      },
      servers: [
        {
          url: "http://localhost:5000",
        },
      ],
    },
    apis: ["src/routes/*.js"], // specify API route file path, it doesn't work with ["./routes/*.js"],because the working directory of swagger-jsdoc is the root directory
  };

  // initialize swagger-jsdoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);
//console.log(swaggerDocs)
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.get("/", (req, res) => {
  res.send("Hello World!");
});

import apiRoutes from "./routes/api.js";
server.use("/api", apiRoutes);


await mongoose.connect(process.env.DB_CONNECTION_STRING); //connect to MongoDB before starting the server

server.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});

  