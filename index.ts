import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { auth } from "./middleware/auth";
import { JwtPayload } from "jsonwebtoken";

const saltRounds = 10;

const app = express();
dotenv.config();
const PORT = process.env.PORT;

const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/api/notes", async (req, res) => {
  try {
    const notes = await prisma.note.findMany();
    res.json(notes);
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

app.post("/api/notes/create", auth, async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send("Authorization token is missing");
    }

      // @ts-ignore
      const userId = JSON.parse(req.decoded.data).userId;
    console.log('Decoded Token in /api/notes/create:', userId);

    const { content, priority, category } = req.body;

    if (!content || !priority || !category || !userId) {
      console.log(content, priority, category, userId);
      throw new Error("Request missing needed data!");
    }

    const note = await prisma.note.create({
      data: {
        content: content,
        priority: priority,
        category: category,
        userId: userId, // Associate the note with the decoded user ID
      },
    });

    res.json(note);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).send("something went wrong");
  }
});


app.put("/api/notes/:id", async (req, res) => {
  const { id, content, priority, category } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).send("id must be valid");
  }

  // Remove the ID from the request body
  delete req.body.id;

  try {
    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        content,priority,category
      },
    });

    res.json(updatedNote);
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

app.delete("/api/note/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    res.status(400).send("id must be valid");
  }
  try {
    await prisma.note.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  // check if user exists
  const user = await prisma.user.findUnique({
    // @ts-ignore
    where: {
      email: email,
    },
  });

  // if user exists, return error!
  if (user) {
    return res
      .status(400)
      .json({ error: "User with email " + email + " already exists!" });
  }

  // at this point, we're sure that the user record does not exist yet

  const hashedPass = bcrypt.hashSync(password, saltRounds);

  console.log(hashedPass);
  
    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPass,
      },
    });
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: JSON.stringify({ userId: newUser.id }),
      },
      "some-secret-no-one-knows-except-this-backend"
    );

   console.log(token);

  newUser["password"] = "";

  console.log(newUser);

  res.json({ token: token });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Received email:", email);

  try {
    // check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // if user does not exist, return error
    if (!user) {
      return res
        .status(400)
        .json({ error: "User with email " + email + " does not exist!" });
    }

    // at this point, we know that the user exists
    const hash = user.password;
    const authentication = bcrypt.compareSync(password, hash);

    if (!authentication) {
      // If authentication fails, display an alert for incorrect password
      return res
        .status(401)
        .json({ error: "Email and password do not match!" });
    }

    // sanitize / remove sensitive values from response
    user["password"] = "";

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: JSON.stringify({ userId: user.id }),
      },
      "some-secret-no-one-knows-except-this-backend"
    );

    console.log(token);
    res.json({ token: token });
    console.log('User Data with Token:', { user: user, token: token });



  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Something went wrong");
  }
});



// return only notes for user
app.get("/notes", auth, async (req, res) => {
  try {
    // @ts-ignore
    const userId = JSON.parse(req.decoded.data).userId;
    console.log("Decoded User ID:", userId);

    const notes = await prisma.note.findMany({
      where: {
        userId: userId,
      },
    });

    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).send("Something went wrong");
  }
});

app.listen(PORT, () => {
  console.log(`server running on localhost:${PORT}`);
});
