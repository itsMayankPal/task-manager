const mongoose = require('mongoose')

// inside connectionString added Database name in between .net/ and ?  

// and updated password in between : and  @

const connectDatabase = (url)=>{

    return mongoose.connect(url,
        { useUnifiedTopology: true ,useNewUrlParser: true}
        )

}

module.exports = connectDatabase