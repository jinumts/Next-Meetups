
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
   if(req.method==='POST'){
    const data = req.body;
    const client = await MongoClient.connect('mongodb+srv://jinu:esP5Ah8XPkBwhWLi@cluster0.fvclnmm.mongodb.net/Next?retryWrites=true&w=majority')
    const db= client.db()
    const meetupsCollections = db.collection('Next')
    const result = await meetupsCollections.insertOne(data)
    console.log(result);
    client.close();
    res.status(201).json({message:'Meetups inserted!'})
   }
}
  