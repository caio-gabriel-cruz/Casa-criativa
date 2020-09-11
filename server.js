
   // Usei o express pra criar e configurar meu servidor

const express = require('express')
const server = express()

const db = require("./db")

// const ideias = [
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
//         title: "Cursos de Programação",
//         category: "Estudo",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//         url: "https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
//         title: "Exercícios",
//         category: "Saúde",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//         url: "https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
//         title: "Meditação",
//         category: "Mentalidade",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//         url: "https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
//         title: "Karaokê",
//         category: "Diverção em família",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//         url: "https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729038.svg",
//         title: "Pintura",
//         category: "Criatividade",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//         url: "https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729048.svg",
//         title: "Recortes",
//         category: "Criatividade",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//         url: "https://rocketseat.com.br"
//     }
    
// ]

    // configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

    // configuração do nunjucks] 
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

// Habilirtar uso do req.body
server.use(express.urlencoded({extended: true}))

    // criei uma rota /
    // e capturo o pedido do cliente para responder

server.get("/", function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err){
            console.log(err)
            return res.send("Erro no banco de dados!")
        }
    
    const reversedIdeias = [...rows].reverse()

    let lastIdeias = []
    for (let ideia of reversedIdeias){
        if(lastIdeias.length < 2){
            lastIdeias.push(ideia)
        }
    }

    return res.render("index.html", { ideias: lastIdeias})
        })   
})

server.get("/ideias", function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err){
            console.log(err)
            return res.send("Erro no banco de dados!")
        }
        const reversedIdeias = [...rows].reverse()

        return res.render("ideias.html", {ideias: reversedIdeias})
    })

  
})

server.post("/", function(req, res) {
    // Inserir dados na tabela
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);

    `
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]

    db.run(query, values, function(err){
        if (err){
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        return res.redirect("/ideias")
    })
})

    // liguei meu servidor na porta 3000

server.listen(3000)
