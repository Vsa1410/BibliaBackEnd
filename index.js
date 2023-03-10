const express = require('express')
const { PrismaClient } = require('@prisma/client')
const app = express()
const routes = require('./src/routes')


const cors = require('cors')

app.use(express.json())
app.use(cors({origin:true}));
app.use(routes)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`HelloNode app listening on port ${port}!`))