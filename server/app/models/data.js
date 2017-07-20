module.exports = function(conn, Sequelize) {
    var Data=  conn.define('data', {
        data_id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        url: {
            type: Sequelize.STRING,
            allowNull: false
        },
        meta_robots: {
            type: Sequelize.STRING,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        meta_desc: {
            type: Sequelize.STRING,
            allowNull: false
        },
        og_title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        og_desc: {
            type: Sequelize.STRING,
            allowNull: false
        },
        h1: {
            type: Sequelize.STRING,
            allowNull: false
        },
        h2: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        tableName: 'data',
        timestamps: false
    });
    return Data;
};