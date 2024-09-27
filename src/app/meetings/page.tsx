import { Metadata } from "next";
import MyMeetingsPage from "../../components/custom/meetings/MyMeetingsPage"

export const metadata: Metadata = {
  title: "My Meetings",
};

export default function Page() {
  return <MyMeetingsPage />;
}