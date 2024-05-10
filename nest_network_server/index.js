const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 3000;

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())

// verify JWT middleware
const verifyToken = (req,res,next)=>{
  const token = req.cookies?.token;
  if(!token) return res.status(401).send({message:'unauthorized access'})
  if(token){
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err){
          console.log(err);
         return res.status(401).send({message:'unauthorized access'})
        }
        console.log(decoded);
        req.user = decoded;
        next()
    })
  }
  // console.log(token);
  
}

const uri = `mongodb+srv://${process.env.user_DB}:${process.env.secret_KEY}@cluster0.2evw8as.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    const jobCollection = client.db("nestNetwork").collection("jobs");
    const bidCollection = client.db("nestNetwork").collection("bids");

    // generate JWT
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "365d",
      });

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    // clear token in logout
    app.get("/logout", (req, res) => {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          maxAge: 0,
        })
        .send({ success: true });
    });
    // get all jobs from the database
    app.get("/jobs", async (req, res) => {
      const result = await jobCollection.find().toArray();
      res.send(result);
    });

    // get  a  single job details from the db
    app.get("/job/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobCollection.findOne(query);
      res.send(result);
    });

    // save bid data into the database
    app.post("/bid", async (req, res) => {
      const bidData = req.body;
      const result = await bidCollection.insertOne(bidData);
      res.send(result);
    });

    // save add-job into the database
    app.post("/add-job", async (req, res) => {
      const addJob = req.body;
      const result = await jobCollection.insertOne(addJob);
      res.send(result);
    });

    // get all jobs posted by users[myPostedJob]
    app.get("/jobs/:email",verifyToken, async (req, res) => {
      const tokenEmail = req.user.email;
      const email = req.params.email;
      if(email!==tokenEmail){
        return res.status(403).send({message:'forbidden access'})
      }
      const query = { "buyer.email": email };
      const result = await jobCollection.find(query).toArray();
      res.send(result);
    });
    // delete a job data from db
    app.delete("/job/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobCollection.deleteOne(query);
      res.send(result);
    });

    // update a job in DB
    app.put("/job/:id", async (req, res) => {
      const id = req.params.id;
      const jobData = req.body;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        // mongodb operator
        $set: {
          ...jobData,
        },
      };
      const result = await jobCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });

    // get all bids using email from the db
    app.get("/bids/:email",verifyToken, async (req, res) => {
      const tokenEmail = req.user.email;
      const email = req.params.email;
      if(email!==tokenEmail){
        return res.status(403).send({message:'forbidden access'})
      }
      const query = { email };
      const result = await bidCollection.find(query).toArray();
      res.send(result);
    });

    // get all bid req from the owner
    app.get("/bid-requests/:email",verifyToken, async (req, res) => {
      const tokenEmail = req.user.email;
      const email = req.params.email;
      if(email!==tokenEmail){
        return res.status(403).send({message:'forbidden access'})
      }
      const query = { "buyer.email": email };
      const result = await bidCollection.find(query).toArray();
      res.send(result);
    });

    // update status
    app.patch("/update-status/:id", async (req, res) => {
      const id = req.params.id;
      const status = req.body;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: status,
      };
      const result = await bidCollection.updateOne(query, updateDoc);
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from Nest Network......");
});
app.listen(port, () => console.log(`server is running in port ${port}`));
