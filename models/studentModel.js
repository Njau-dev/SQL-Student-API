module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define("students", {
        student_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstname: {
            type: DataTypes.STRING, // Changed to STRING
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING, // Changed to STRING
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING, // Changed to STRING
            allowNull: true,
        },
        course_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    });

    return Student;
};
