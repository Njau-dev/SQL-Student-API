module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define("courses", {
        course_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        classtime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        intake: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        course: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    return Course;
};
