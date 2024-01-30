import { Fragment } from "react";
import classes from './MeetUpDetail.module.css'
export default function MeetUpDetail(props){
    return(
        <section className={classes.detail}>
            <img src={props.image} alt={props.title}/>
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.description}</p>
        </section>
    )
}