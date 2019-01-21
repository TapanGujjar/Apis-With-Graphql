'use-strict'

const cartItems=(sequelize,DataTypes)=>{

    const CartItem=sequelize.define('cartItems',{
        quantity:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0
        }
    });
    CartItem.associate = models => {

        CartItem.belongsTo(models.Cart,{foreignKey:"cartId"});
        CartItem.belongsTo(models.Product,{foreignKey:"productId"})
        // CartItem.belongsTo(models.Cart,{foreignKey:""})

    };
    return CartItem;
};

module.exports=cartItems;