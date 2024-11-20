const dbConfig = require('../.config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,
}
);

sequelize.authenticate()
    .then(() => console.log('Connection successful'))
    .catch((err) => console.error('Unable to connect:', err));

// Initialize the database object
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load the student model
db.students = require('./studentModel')(sequelize, DataTypes);
db.courses = require('./courseModel')(sequelize, DataTypes);

// Synchronize the database
db.sequelize.sync({ force: false }) // No dropping existing tables
    .then(() => {
        console.log("Database sync completed.");
    })
    .catch((err) => { // Error handling for sync
        console.error("Error during database sync: ", err);
    });

//db.courses.hasOne(db.students)
db.students.belongsTo(db.courses, { foreignKey: "course_id" });

module.exports = db;
