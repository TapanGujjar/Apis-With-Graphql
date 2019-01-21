'use-strict'

const products=(sequelize,DataTypes)=>{

    const Product=sequelize.define("products",{
        
        name:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        inventory:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0
        }
        
    },{
        freezeTableName: true,
    });
    Product.associate = models => {
        Product.hasMany(models.CartItem,{foreignKey:"id"})
    };

    return Product;
};

module.exports=products;