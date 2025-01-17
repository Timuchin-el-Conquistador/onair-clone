import GuestConferenceRoom from "@/components/room/guest";
import UserConferenceRoom from "@/components/room/user";
import CallEnded from "@/components/Presentational/call-ended";


import { retrieveSession } from "@/lib/actions/user";

async function ConferenceRoomPage(props: any) {
  console.log(props, "props");


  const session = await retrieveSession();
  return <CallEnded />;
}

export default ConferenceRoomPage;
