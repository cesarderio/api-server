'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('orders', {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    shippingSpeed: {
      type: DataTypes.ENUM,
      values: ['Standard', 'Expedited', 'Next Day'],
      allowNull: false,
    },
  });
};
