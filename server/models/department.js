// TODO: 3.1 Deifine departments table model
//Model for departments table
// References:
// http://docs.sequelizejs.com/en/latest/docs/getting-started/#your-first-model
// http://docs.sequelizejs.com/en/latest/docs/models-definition/
module.exports = function (sequelize, Sequelize) {
    var Department = sequelize.define("departments",
        {
            dept_no: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false
            },
            dept_name: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },
        {
            // don't add timestamps attributes updatedAt and createdAt
            timestamps: false
         });

    return Department;
};