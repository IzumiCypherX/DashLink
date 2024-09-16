module.exports = function Links(sequelize, DataTypes) {
    return sequelize.define('links', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        creator_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shortUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        views: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        indexes: [{
            name: 'shortUrl_index',
            fields: ['shortUrl']
        }, {
            name: 'creator_id_index',
            fields: ['creator_id']
        }, {
            name: 'url_index',
            fields: ['url']
        }]
    });
}