import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  await prisma.usuario.createMany({
    data: [
      {
      "email": "admin@email.com",
      "nome": "Raphael Alves de Oliveira",
      "senha": "1234",
      "cep": "08473440",
      "rua": "Rua Wilma Flor",
      "numero": "767",
      "bairro": "Guaianazes",
      "estado": "SP",
      "cidade": "São Paulo"
    },
    {
      "nome": "Leles Juzes",
      "email": "leles@gmail.com",
      "senha": "1234",
      "cep": "08440340",
      "rua": "Rua Almocrafe",
      "numero": "999",
      "bairro": "Vila Chabilândia",
      "cidade": "São Paulo",
      "estado": "SP"
    },
    {
      "nome": "Danilo Lopes",
      "email": "downilo@gmail.com",
      "senha": "123",
      "cep": "08440‑475",
      "rua": "Rua André Feliciani",
      "numero": "676",
      "bairro": "Vila Chabilândia",
      "cidade": "São Paulo",
      "estado": "SP"
    }
    ]
  }),
  await prisma.produto.createMany({
      data:[
        {          
          "nome": "TV",
          "usuario_id": 1,
          "preco": "10000",
          "vendido": false,
          "descricao": "TV 4k LED FULL HD SMART",
          "fotos": ""
        },
        {          
          "nome": "Smartphone",
          "usuario_id": 2,
          "preco": "4000",
          "vendido": false,
          "descricao": "Iphone de última geração",
          "fotos": ""
        },
        {          
          "nome": "Notebook",
          "usuario_id": 3,
          "preco": "2500",
          "vendido": false,
          "descricao": "Notebook feito pelo Elon Musk",
          "fotos": ""
        },
        {          
          "nome": "TV",
          "usuario_id": 3,
          "preco": "10000",
          "vendido": false,
          "descricao": "TV 4k LED FULL HD SMART",
          "fotos": ""
        },
        {          
          "nome": "Smartphone",
          "usuario_id": 1,
          "preco": "4000",
          "vendido": false,
          "descricao": "Iphone de última geração",
          "fotos": ""
        },
        {          
          "nome": "Notebook",
          "usuario_id": 2,
          "preco": "2500",
          "vendido": false,
          "descricao": "Notebook feito pelo Elon Musk",
          "fotos": ""
        },
        {          
          "nome": "TV",
          "usuario_id": 3,
          "preco": "10000",
          "vendido": false,
          "descricao": "TV 4k LED FULL HD SMART",
          "fotos": ""
        },
        {          
          "nome": "Smartphone",
          "usuario_id": 2,
          "preco": "4000",
          "vendido": false,
          "descricao": "Iphone de última geração",
          "fotos": ""
        },
        {          
          "nome": "Notebook",
          "usuario_id": 2,
          "preco": "2500",
          "vendido": false,
          "descricao": "Notebook feito pelo Elon Musk",
          "fotos": ""
        },
        {          
          "nome": "TV",
          "usuario_id": 3,
          "preco": "10000",
          "vendido": false,
          "descricao": "TV 4k LED FULL HD SMART",
          "fotos": ""
        },
        {          
          "nome": "Smartphone",
          "usuario_id": 1,
          "preco": "4000",
          "vendido": false,
          "descricao": "Iphone de última geração",
          "fotos": ""
        },
        {          
          "nome": "Notebook",
          "usuario_id": 3,
          "preco": "2500",
          "vendido": false,
          "descricao": "Notebook feito pelo Elon Musk",
          "fotos": ""
        },
      ]
        
      
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })