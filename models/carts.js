'use-strict'

const carts=(sequelize,DataTypes)=>{

    const Cart=sequelize.define('carts',{
        purchased:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        }
    });
    Cart.associate = models => {
        Cart.hasMany(models.CartItem, { onDelete: 'CASCADE' },{foreignKey:'id'});
        Cart.belongsTo(models.User,{foreignKey:"userId"})
        Cart.hasOne(models.Order,{foreignKey:"id"})

    };
    return Cart;
};

module.exports=carts;