import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type UserProps = {
  user: Models.Document
}

const UserCard= ({ user }: UserProps) => {

  console.log(user)

  const followHandler = () => {
    
  }

  return (
    <div className="bg-black text-white p-4 rounded-2xl flex flex-col items-center shadow-md border border-gray-700">
      {/* Clicking anywhere except the button will navigate */}
      <Link to={`/profile/${user.$id}`} state={{ user }} className="w-full flex flex-col items-center">
        <img
          src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
          alt={user.$id}
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-500"
        />
        <h3 className="mt-3 text-lg font-semibold">{user.name}</h3>
        <p className="text-gray-400">@{user.username}</p>
      </Link>
      {/* Follow button remains clickable without navigating */}
      <Button className="mt-3 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
      onClick={followHandler}>
        Follow
      </Button>
    </div>
  );
};

export default UserCard;
