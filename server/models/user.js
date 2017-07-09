module.exports = function(conn, Sequelize) {
    var Users=  conn.define('users', {
        user_id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        tableName: 'users',
        timestamps: false
    });
    return Users;
};