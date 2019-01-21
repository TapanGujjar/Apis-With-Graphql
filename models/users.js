'use-strict'
const bcrypt=require("bcrypt-nodejs")
const {generateHashPassword,compareHashPassword}=require("../utils/bcryptUtils");
const users=(sequelize,DataTypes)=>{

    const User=sequelize.define('users',{
        username:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        email:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        password:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        }
    });
    User.associate = models => {
        User.hasMany(models.Address, { onDelete: 'CASCADE' },{foreignKey:'id'});
        User.hasMany(models.Cart,{onDelete:'CASCADE'},{foreignKey:"id"})
    };

    User.prototype.encryptPassword=async function(){
        var saltRounds=10.
        var salts=await bcrypt.genSaltSync(saltRounds);

        var passwordHash=await bcrypt.hashSync(this.password,salts);
        return passwordHash;
    }

    User.beforeCreate(async user=>{
        user.password=generateHashPassword(user.password);
    });
    
    User.prototype.compareHash=async function(passwd){
        return compareHashPassword(passwd,this.password);
    }



    return User;
};

module.exports=users;