
module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("user", {
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING,
//            set(value) {
//                this.setDataValue('password', bcrypt.hashSync(value, 8));
//            }
        }
    }, {
        tableName: 'users',
        underscored: true
    });

    
    return user;
};
