'use-strict'

const addresses=(sequelize,DataTypes)=>{

    const Address=sequelize.define("user_address",{
        
        address:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        }
        
    },{
        freezeTableName: true,
    });
    Address.associate = models => {
        Address.belongsTo(models.User,{foreignKey:"userId"})
    };

    return Address;
};

module.exports=addresses;