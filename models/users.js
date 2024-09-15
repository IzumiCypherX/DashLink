module.exports = function Users(sequelize, DataTypes) {
    return sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        indexes: [{
            name: 'username_index',
            fields: ['username']
        },
        {
            name: 'user_id_index',
            fields: ['id']
        }]
    });
}