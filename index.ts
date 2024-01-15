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

app.put('/api/notes/:id',async (req,res) => {
    const {content , priority , category}= req.body
    const id = parseInt(req.params.id)
    if(!id || isNaN(id)){
        return res 
        .status(400)
        .send("id must be valid")
    }
    try {
        const updatedNote= await prisma.note.update({
            where:{id},
            data:{
                content:content,
                priority:priority,
                category:category
            }
        })
        res.json(updatedNote)
    } catch (error) {
        res 
        .status(500)
        .send("something went wrong")
    }
})

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

app.listen(PORT,()=>{
    console.log(`server running on localhost:${PORT}`)
})