import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'


const app = express();
dotenv.config()
const PORT = process.env.PORT

const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())


app.get('/api/notes',async (req,res) => {
    try {
        const notes = await prisma.note.findMany()
        res.json(notes)
    } catch (error) {
        res 
        .status(500)
        .send("something went wrong")
    }
})


app.post('/api/notes/create',async (req,res) => {
    try {
        const {content , priority , category}= req.body
        if (!content || !priority || !category) {
            console.log(content,priority,category)
            throw new Error('Request missing needed data!')
        }
        const note = await prisma.note.create({
            data:{
                content:content,
                priority:priority,
                category:category
            }
        })
        res.json(note)
        
    } catch (error) {
        console.error('Error creating note:', error);
        res 
        .status(500)
        .send("something went wrong")
    }
})

app.put('/api/notes/:id', async (req, res) => {
    const { id, content, priority, category } = req.body;
  
    if (!id || isNaN(id)) {
      return res
        .status(400)
        .send("id must be valid");
    }
  
    // Remove the ID from the request body
    delete req.body.id;
  
    try {
      const updatedNote = await prisma.note.update({
        where: { id },
        data: req.body
      });
  
      res.json(updatedNote);
    } catch (error) {
      res
        .status(500)
        .send("something went wrong");
    }
  });


app.delete('/api/note/:id',async (req,res) => {
    const id = parseInt(req.params.id)

    if(!id || isNaN(id)){
        res 
        .status(400)
        .send("id must be valid")
    }
    try {
        await prisma.note.delete({
            where:{id}
        })
        res.status(204).send();
    } catch (error) {
        res 
        .status(500)
        .send("something went wrong")
    }

})

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body
    // check if user exists
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    // if user exists, return error!
    if (user) {
        return res.status(400).json({ error: "User with email " + email + " already exists!" })
    }

    // at this point, we're sure that the user record does not exist yet
    const hashedPass = bcrypt.hashSync(password, saltRounds);

    console.log(hashedPass)
    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            // we never store raw password anywhere!
            password: hashedPass
        }
    })

    // before we respond to the fronted
    // we remove any sensitive information
    newUser['password'] = ''

    console.log(newUser)
    // if not exists, create it
    res.json(newUser)
})

app.listen(PORT,()=>{
    console.log(`server running on localhost:${PORT}`)
})