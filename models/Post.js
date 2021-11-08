const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Post extends Model {}

Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        onDelete: 'CASCADE'
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      contents: {
        type: DataTypes.STRING,
        allowNull: false
        // validate: {
        //   isURL: true
        // }
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',//joing user Model on id column
          // association is still required at index.js of models
          key: 'id'
        }
      }
    },
    {
      sequelize,
      // what each of these metadata means?
      freezeTableName: true,
      underscored: true,
      modelName: 'post'
    }
  );

  module.exports = Post;