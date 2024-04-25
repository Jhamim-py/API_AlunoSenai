const express =  require("express");
const { default: mongoose } = require("mongoose");
const multer = require('multer')
const path = require('path');
const app = express();
app.use(express.json()) ;
const port = process.env.PORT || 3000;

//Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });


//Resolver problemas com permições
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });
  


//conectar no banco

mongoose.connect('mongodb+srv://houtarousenki:pYuWQ6LRAXpSgmQL@mesa.wybqozy.mongodb.net/?retryWrites=true&w=majority&appName=mesa')




const Mesa = mongoose.model('Mesa',{
    nome: String,
    descricao: String,
    foto: String,
})



app.get("/",async(req, res) => {
    const mesas = await Mesa.find()
    res.send(mesas)
})



app.post("/", upload.single("foto"), async (req,res) =>{
    const mesa = new Mesa({
        nome: req.body.nome,
        descricao: req.body.descricao,
        foto: req.file.filename,
    })
   await mesa.save()
   res.send(mesa)
})

app.listen(port, () =>{
    mongoose.connect('mongodb+srv://houtarousenki:pYuWQ6LRAXpSgmQL@mesa.wybqozy.mongodb.net/?retryWrites=true&w=majority&appName=mesa')

    console.log("tá rodando")
})



app.delete( '/:id', async ( req ,res)=>{
    const mesa = await Mesa.findByIdAndDelete(req.params.id);
    return res.send(mesa);
});

app.put('/:id', async (req, res)=> {
   const mesa = await Mesa.findByIdAndUpdate(req.params.id,{ 
       nome :       req.body.nome,
       descricao : req.body.descricao,
       foto:    req.body.foto,
})
return res.send(mesa)
});
