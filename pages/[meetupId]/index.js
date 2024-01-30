import MeetUpDetail from "@/components/meetups/MeetUpDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

export default function MeetUpDetails(props) {
  return (
    <Fragment>
    <Head>
      <title>{props.meetupData.title}</title>
      <meta 
      name="description"
      content={props.meetupData.description}/>
    </Head>
      <MeetUpDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://jinu:esP5Ah8XPkBwhWLi@cluster0.fvclnmm.mongodb.net/Next?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollections = db.collection("Next");
  const meetups = await meetupsCollections.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false, // fallback will explain if the path have all meetup id or some of it.if it is false means it contains all
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}
export async function getStaticProps(context) {
  //fetc data for a single meetup
  //we cant use hook inside it
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://jinu:esP5Ah8XPkBwhWLi@cluster0.fvclnmm.mongodb.net/Next?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollections = db.collection("Next");
  const selectedMeetUp = await meetupsCollections.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetUp._id.toString(),
        title: selectedMeetUp.title,
        image: selectedMeetUp.image,
        description: selectedMeetUp.description,
      },
    },
  };
}
