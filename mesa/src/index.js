const express =  require("express");
const { default: mongoose } = require("mongoose");
const app = express()
app.use(express.json())
const port = 3000;
mongoose.connect('mongodb+srv://houtarousenki:pYuWQ6LRAXpSgmQL@mesa.wybqozy.mongodb.net/?retryWrites=true&w=majority&appName=mesa')

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
  



const Mesa = mongoose.model('Mesa',{
    nome: String,
    descricao: String,
    foto: String,
})


app.get("/:id",async(req, res) => {
    const mesa = await Mesa.findById(req.params.id)
    res.send(mesa)
})


app.get("/",async(req, res) => {
    const mesas = await Mesa.find()
    res.send(mesas)
})



app.post("/", async (req,res) =>{
    const mesa = new Mesa({
        nome: req.body.nome,
        descricao: req.body.descricao,
        foto: req.body.foto,
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