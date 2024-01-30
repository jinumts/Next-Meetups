

    import EditMeetup from '@/components/meetups/EditMeetUp';
    import { useRouter } from 'next/router';

    export default function EditMeetupPage(){
        const router = useRouter();
      const { id, title, address, description,image } = router.query;
      async function editMeetUpHandler(restData){
        const response = await fetch(`/api/edit-meetup`, {
            method: 'PUT',
            body: JSON.stringify(restData),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          router.push('/');
      }
      return (
        <>
        <EditMeetup onEditMeetup={editMeetUpHandler}
                    id={id}
                    title={title}
                    address={address}
                    description={description}
                    image = {image}
        />
        </>
      );
    }
    