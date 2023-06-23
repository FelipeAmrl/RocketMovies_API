require("express-async-errors");

const cors = require("cors");
const routes = require("./routes");
const express = require("express");
const AppError = require("./utils/AppError");
const uploadConfig = require("./config/upload");
const migrationsRun = require("./database/sqlite/migrations");

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

migrationsRun();

app.use((error, request, response, next) => {
    if(error instanceof AppError)
    {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    });
});

const PORT = 3334;
app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});