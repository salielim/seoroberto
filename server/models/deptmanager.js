// TODO: 6.2 Define dept_manager model
// Creates a model for dept_manager table
// References:
// http://docs.sequelizejs.com/en/latest/docs/getting-started/#your-first-model
// http://docs.sequelizejs.com/en/latest/docs/models-definition/
module.exports = function (conn, Sequelize) {
    var Manager = conn.define('manager', {
            emp_no: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'employees',
                    key: 'emp_no'
                }
            },
            dept_no: {
                type: Sequelize.CHAR(4),
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'departments',
                    key: 'dept_no'
                }
            },
            from_date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            to_date: {
                type: Sequelize.DATE,
                allowNull: false
            }
        },
        {
            // don't add timestamps attributes updatedAt and createdAt
            timestamps: false,
            tableName: "dept_manager"
        }
    );

    return Manager;
};