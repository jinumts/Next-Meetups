import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, ...updatedData } = req.body;

    const client = await MongoClient.connect('mongodb+srv://jinu:esP5Ah8XPkBwhWLi@cluster0.fvclnmm.mongodb.net/Next?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('Next');

    try {
      const existingMeetup = await meetupsCollection.findOne({ _id: new ObjectId(id) });

      if (!existingMeetup) {
        return res.status(404).json({ message: 'Meetup not found.' });
      }

      const result = await meetupsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      );

      console.log(result);

      client.close();
      res.status(200).json({ message: 'Meetup updated!' });
    } catch (error) {
      console.error('Error updating meetup:', error.message);
      client.close();
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
