module.exports = (sequelize, Sequelize) => {
    const Cost = sequelize.define(
      "costs",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          field: "id",
        },
        date: {
          type: Sequelize.DATEONLY, // Use DATEONLY for date without time
          allowNull: false,
          field: "date",
        },
        name: {
          type: Sequelize.STRING(45),
          allowNull: false,
          field: "name",
        },
        amount: {
          type: Sequelize.FLOAT,
          allowNull: false,
          field: "amount",
        },
        currency:{
          type: Sequelize.STRING(45),
          allowNull: false,
          field: "currency",
          // values: ['yen', 'eur']
        }
      },
      {
        tableName: "costs",
        timestamps: false, // To not add createdAt & updatedAt per default
        freezeTableName: true, // Stop auto-pluralization
      }
    );
  
    return Cost;
  };
  