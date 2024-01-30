import { useRouter } from 'next/router'
import classes from './MeetUpDetail.module.css'
export default function MeetUpDetail(props){
    const router = useRouter()
    const id  = router.query.meetupId;
    function handleEdit(){
        router.push(`/edit/${id}?title=${props.title}&address=${props.address}&description=${props.description}&image=${props.image}`);
    }
   async function handleDelete(){
        try {
            const response = await fetch(`/api/${id}`, {
              method: 'DELETE',
            });
      
            if (!response.ok) {
              throw new Error('Meetup deletion failed.');
            }
                  router.push('/');
          } catch (error) {
            console.error('Error deleting meetup:', error.message);
          }
    }
    return(
        <section className={classes.detail}>
            <img src={props.image} alt={props.title}/>
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.description}</p>
            <div>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
        </section>
    )
}