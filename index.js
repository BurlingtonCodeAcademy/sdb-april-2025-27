const fs = require('fs').promises;
const path = require('path')

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

fileOperationsDemo()