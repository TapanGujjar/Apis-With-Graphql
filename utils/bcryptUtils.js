const bcrypt=require("bcrypt-nodejs");

generateHashPassword=(password,saltRounds)=>{
    salt=bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password,salt);
}

compareHashPassword=(password,hashPassword)=>{
    
    return bcrypt.compareSync(password,hashPassword);
}

module.exports={generateHashPassword,compareHashPassword}