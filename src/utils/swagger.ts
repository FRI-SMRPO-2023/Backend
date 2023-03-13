import { Express, Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const yaml = require("js-yaml");

import { writeFileSync } from 'fs';


const options = {
    definition: {
        openapi: "3.0.4",
        info: {
            title: "KANBAN FAKE api",
            version: "0.1.0",
            description:
                "This is a simple application made with Express and documented with Swagger",
            contact: {
                name: "Mark Zakelj",
            },
        },
        servers: [
            {
                url: "http://localhost:8000",
            },
        ],
    },
    apis: ["src/schemas/*.ts", "src/routes/*.ts", "src/index.ts"],
};

const specs = swaggerJSDoc(options);

function swaggerDocs(app: Express) {
    // Swagger UI
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

    // Docs in JSON format
    app.get("docs.json", (req: Request, res: Response) => {
        res.setHeader("ContentType", "application/json");
        res.send(specs);
    });

    // write to file
    writeFileSync("swagger.yaml", yaml.dump(specs, {'indent': 2}, {flag: "w"}));


}

export default swaggerDocs;

