const express =  require("express");
const { default: mongoose } = require("mongoose");
const app = express()

//Passando para json
app.use(express.json())
const port = 3000;
mongoose.connect('mongodb+srv://houtarousenki:pYuWQ6LRAXpSgmQL@mesa.wybqozy.mongodb.net/?retryWrites=true&w=majority&appName=mesa')

//Resolvendo problemas com CORS
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
  


//Modelo
const Mesa = mongoose.model('Mesa',{
    nome: String,
    descricao: String,
    foto: String,
    contato: String,
})


//Utilizar o método GET utilizando o ID para pegar um dado específico
app.get("/:id",async(req, res) => {
    const mesa = await Mesa.findById(req.params.id)
    res.send(mesa)
})

//Utilizar o método GET para pegar todos os dados armazenados
app.get("/",async(req, res) => {
    const mesas = await Mesa.find()
    res.send(mesas)
})


//Utilizando o método POST para adicionar um dado
app.post("/", async (req,res) =>{
    const mesa = new Mesa({
        nome: req.body.nome,
        descricao: req.body.descricao,
        foto: req.body.foto,
        contato: req.body.contato,
    })
   await mesa.save()
   res.send(mesa)
})

//Conectando no banco de dados,MongoDB, e rodando na porta especificada
app.listen(port, () =>{
    mongoose.connect('mongodb+srv://houtarousenki:pYuWQ6LRAXpSgmQL@mesa.wybqozy.mongodb.net/?retryWrites=true&w=majority&appName=mesa')

    console.log("tá rodando")
})


//Utilizando o método delete para deletar um dado específico urilizando um ID
app.delete( '/:id', async ( req ,res)=>{
    const mesa = await Mesa.findByIdAndDelete(req.params.id);
    return res.send(mesa);
});

//Utilizando o método PUT para atualizar um dado específico
app.put('/:id', async (req, res)=> {
   const mesa = await Mesa.findByIdAndUpdate(req.params.id,{ 
       nome : req.body.nome,
       descricao :req.body.descricao,
       foto: req.body.foto,
       contato: req.body.contato,
},
{new:true}
)
return res.send(mesa)
});
