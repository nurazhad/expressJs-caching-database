const {MongoClient} = require('mongodb')

const client = new MongoClient("mongodb://localhost:27017", {
    useNewUrlParser : true,
    useUnifiedTopology : true,
})

client.connect((err, client) => {
    if(err){
        return console.log("KONEKSI GAGAL")
    }
    console.log("BERHASIL")
    const db = client.db("pedete")
    db.collection.findAll()
})

