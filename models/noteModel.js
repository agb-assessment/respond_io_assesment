module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define("note", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        category: {
            type: DataTypes.ENUM('Work', 'Personal', 'Education'), // Remove 'NULL' from ENUM
            allowNull: true, // This allows the column to accept NULL values
            validate: {
                isIn: {
                    args: [['Work', 'Personal', 'Education']],
                    msg: 'Category must be Work, Personal, or Education',
                },
            },
        },
    });

    Note.associate = (models) => {
        Note.belongsTo(models.user, { foreignKey: 'userId', as: 'user' });
    };

    return Note;
};