const { Model } = require("sequelize")
//associate et belongsTo : Tables avec une interaction entre autres fichiers models(table)
module.exports = (sequelize, DataTypes) => {
    class Message extends Model {
        static associate({ User }) {
            this.belongsTo(User, {
                onDelete: 'cascade',
                foreignKey: 'id',
            }) 
        }
    }
    Message.init({
        message: {
            type: DataTypes.TEXT
        },
        messageUrl: {
            type: DataTypes.STRING
        },
        UserId: {
            type: DataTypes.INTEGER
        },
    }, 
    {
        sequelize,
        modelName: "Message"
    })
    return Message
}