const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false
    }
);

const connectDB = async() => {
    try{
        await sequelize.authenticate();
        console.log("Database connected succesfully.");
    } catch (error) {
        console.error("Unable to connect to the database: ",error);
    }
};

const isTestEnvironment = process.env.NODE_ENV === "test";
console.log(`Running in ${isTestEnvironment ? 'TEST' : 'DEVELOPMENT'}`)

module.exports = {
    sequelize,
    connectDB
};

