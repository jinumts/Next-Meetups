import Card from "@/components/ui/Card";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import classes from "./EditMeetUp.module.css";

export default function EditMeetup(props) {
  const router = useRouter();
  const { id, title, address, description, image } = router.query;
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();
  const [previewImageUrl, setPreviewImageUrl] = useState(image || '');

  function handleImageChange() {
    const enteredImage = imageInputRef.current.value;
    setPreviewImageUrl(enteredImage);
  }

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
        id:id,
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    props.onEditMeetup(meetupData);
  }

  return (
    <div>
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="title">Meetup Title</label>
            <input
              type="text"
              required
              id="title"
              ref={titleInputRef}
              defaultValue={title}
            />
          </div>

          <div className={classes.control}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              required
              id="address"
              ref={addressInputRef}
              defaultValue={address}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              required
              rows="5"
              ref={descriptionInputRef}
              defaultValue={description}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="image">Meetup Image</label>
            <input
              type="url"
              required
              id="image"
              ref={imageInputRef}
              defaultValue={image}
              onChange={handleImageChange}
            />
            {/* Display the image */}
            {previewImageUrl && (
              <img
                src={previewImageUrl}
                alt="Meetup Image"
                className={classes.imagePreview}
              />
            )}
          </div>
          <div className={classes.actions}>
            <button>Edit Meetup</button>
          </div>
        </form>
      </Card>
    </div>
  );
}
