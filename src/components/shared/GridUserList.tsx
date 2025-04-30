import { Models } from "appwrite";
import UserCard from "./UserCard";
import { useUserContext } from "@/context/AuthContext";

type GridUserListProps = {
  creators: Models.Document;
};



const GridUserList = ({ creators }: GridUserListProps) => {

  const current_user = useUserContext();
  console.log(current_user)

  return (
    <ul className="grid-user_container">
      {creators.documents
        .filter((creator: Models.Document) => creator.$id !== current_user?.user?.id)
        .map((creator: Models.Document, index: number) => {
          return <UserCard key={index} user={creator} />;
        })}
    </ul>
  );
};

export default GridUserList;
