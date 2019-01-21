'use-strict'

const orders=(sequelize,DataTypes)=>{

    const Order=sequelize.define('orders',{},{
        timeStamps:true,
        updatedAt:false,
        createdAt:"purchasedDate",
        freezeTableName:true
    });

    Order.associate = models => {
        Order.belongsTo(models.User,{foreignKey:"userId"})
        Order.belongsTo(models.Cart,{foreignKey:"cartId"})

    };
    return Order;
};

module.exports=orders;