const fs = require('fs').promises;
const path = require('path')
const express = require('express')

const app = express();
const PORT = 8080;

// path to the db.json file
const dbFilePath = path.join(__dirname, "db.json")

console.log(dbFilePath)

// middleware to parse the body of a POST/PUT/PATCH request
app.use(express.json())

async function fileOperationsDemo() {
    const fileName = "demo.txt"
    const jsonFileName = "data.json"

    try {
        console.log("File Systems Operation Demo - GO!")

        // Write text to a file
        console.log("Writing to file...")
        const textContent = "Hello happy monday to you all!"
        await fs.writeFile(fileName, textContent, 'utf-8')
        console.log("Written to file successfuly!")

        // write to a json file
        console.log("Writing to data.json...")
        const jsonData = {
            learners: [
                {
                    id: 0,
                    firstName: "Jimmy",
                    lastName: "Thomson"
                },
                {
                    id: 1,
                    firstName: "Susan",
                    lastName: "Smitts"
                },
                {
                    id: 2,
                    firstName: "David",
                    lastName: "Thames"
                }
            ]
        }

        await fs.writeFile(jsonFileName, JSON.stringify(jsonData, null, 2), "utf-8")
        console.log("Written to JSON successfully!")


    } catch (error) {
        console.log("Something went wrong!")
        console.log(error)
    }
}

// runs the operations demo above
// fileOperationsDemo()

app.get("/api/health", (req, res) => {
    res.send("We are so hot! and the API is alive...")
})

// GET - /api/data - get ALL data from the db.json file
app.get('/api/data', async (req, res) => {
    try {
        console.log("reading json file...")
        const data = await fs.readFile(dbFilePath, "utf-8")
        const jsonData = JSON.parse(data)
        res.json(jsonData)
    } catch (err) {
        console.error('Failed to read or parse db.json:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET - /api/users - get all users from db.json file
app.get("/api/users", async (req, res) => {
    try {
        const data = await fs.readFile(dbFilePath, "utf-8")
        const db = JSON.parse(data)
        console.log(db)
        res.json(db.users || [])
    } catch (error) {
        console.error("we got a problem!")
        console.log(error)
    }
})

// GET - /api/posts - get all posts from db.json file
app.get("/api/posts", async (req, res) => {
    try {
        const data = await fs.readFile(dbFilePath, "utf-8")
        const db = JSON.parse(data)
        console.log(db)
        res.json(db.posts || [])
    } catch (error) {
        console.error("we got a problem!")
        console.log(error)
    }
})

app.listen(PORT, () => {
    console.log("API running!")
})