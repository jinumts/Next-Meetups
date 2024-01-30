import Head from "next/head";
import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { Fragment } from "react";



export default function HomePage(props){
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
      </Head>
    <MeetupList meetups={props.meetups}/>

    </Fragment>

  )
}
export async function getStaticProps(){
  const client = await MongoClient.connect('mongodb+srv://jinu:esP5Ah8XPkBwhWLi@cluster0.fvclnmm.mongodb.net/Next?retryWrites=true&w=majority')
    const db= client.db()
    const meetupsCollections = db.collection('Next')
    const meetups = await meetupsCollections.find().toArray()
    client.close()
  return{
    props: {
      meetups: meetups.map(meetup=>({
        title:meetup.title,
        address:meetup.address,
        image:meetup.image,
        id:meetup._id.toString()
      }))
    },
    revalidate:1
  }
}