import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
    console.log('delete')
  const meetupId = req.query.id;
  if (req.method === 'DELETE') {
    const client = await MongoClient.connect('mongodb+srv://jinu:esP5Ah8XPkBwhWLi@cluster0.fvclnmm.mongodb.net/Next?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('Next');

    try {
      const result = await meetupsCollection.deleteOne({ _id: new ObjectId(meetupId) });

      if (result.deletedCount === 0) {
        res.status(404).json({ message: 'Meetup not found.' });
      } else {
        res.status(200).json({ message: 'Meetup deleted!' });
      }
    } catch (error) {
      console.error('Error deleting meetup:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    } finally {
      client.close();
    }
}
}
//   else if (req.method === 'GET') {
//     const client = await MongoClient.connect('your-mongodb-connection-string');
//     const db = client.db();
//     const meetupsCollection = db.collection('meetups');

//     const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

//     if (!meetup) {
//       res.status(404).json({ message: 'Meetup not found.' });
//       client.close();
//       return;
//     }

//     res.status(200).json(meetup);
//     client.close();
//   } else if (req.method === 'PUT') {
//     const updatedData = req.body;

//     const client = await MongoClient.connect('your-mongodb-connection-string');
//     const db = client.db();
//     const meetupsCollection = db.collection('meetups');

//     const result = await meetupsCollection.updateOne(
//       { _id: ObjectId(meetupId) },
//       { $set: updatedData }
//     );

//     console.log(result);

//     client.close();
//     res.status(200).json({ message: 'Meetup updated!' });
//   } 



