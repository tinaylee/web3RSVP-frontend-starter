import { Web3Storage, File, getFilesFromPath } from "web3.storage";
const { resolve } = require("path");

// Create a handler function to handle incoming requests to store data

//export default exposes function to other modules
export default async function handler(req, res) {
 /*  POST method - creates a new record.  Check if incoming request is POST request and 
 create a new event if it is.*/
    if (req.method == "POST") {
        return await storeEventData(req, res);
    } else {
        return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
}

async function storeEventData(req, res) {
    const body = req.body;
    try {
        const files = await makeFileObjects(body);
        const cid = await storeFiles(files);
        return res.status(200).json({ sucess: true, cid: cid });
    } catch (err) {
        return res
        .status(500)
        .json({ error: "Error creating event", success: false });
    }
}
//creates JSON file that includes metadata passed in from req.body
async function makeFileObjects(body) {
//protocol buffers serialize objects (converts them to bytes) to transmit them to another machine
    const buffer = Buffer.from(JSON.stringify(body));
    
    const imageDirectory = resolve(process.cwd(), `public/images/${body.image}`);
    const files = await getFilesFromPath(imageDirectory);

    files.push(new File([buffer], "data.json"));
    return files;
}
//creates web3Storage client
function makeStorageClient() {
    return new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN });
}
//stores JSON file from req.body in Web3Storage
async function storeFiles(files) {
    const client = makeStorageClient();
    const cid = await client.put(files);
    return cid;
}
//cid is content identifier in the form of a hash.  Will be stored on chain and used for file retrieval

