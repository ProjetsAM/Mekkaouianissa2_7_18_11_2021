const { Model } = require("sequelize")
//associate et belongsTo : Tables avec une interaction entre autres fichiers models(table)
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate({ Message, User }) {
            this.belongsTo(Message, {
                onDelete: 'cascade',
                foreignKey: 'UserId',
            })
            this.belongsTo(User, {
                onDelete: 'cascade',
                foreignKey: 'id',
            })
        }
    }
    Comment.init({
        comment: {
            type: DataTypes.TEXT
        },
        UserId: {
            allowNull: false,
            type: DataTypes.INTEGER,
          },
        MessageId: {
            allowNull: false,
            type: DataTypes.INTEGER,
          },
    }, 
    {
        sequelize,
        modelName: "Comment"
    })
    return Comment
}