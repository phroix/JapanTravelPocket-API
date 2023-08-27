module.exports = (sequelize, Sequelize) => {
    const Entry = sequelize.define(
      "entries",
      {
        entry_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          field: "entry_id",
        },
        day: {
          type: Sequelize.DATEONLY, // Use DATEONLY for date without time
          allowNull: false,
          field: "day",
        },
        name: {
          type: Sequelize.STRING(45),
          allowNull: false,
          field: "name",
        },
        amount: {
          type: Sequelize.FLOAT,
          allowNull: true,
          field: "amount",
        },
      },
      {
        tableName: "entries",
        timestamps: false, // To not add createdAt & updatedAt per default
        freezeTableName: true, // Stop auto-pluralization
      }
    );
  
    return Entry;
  };
  