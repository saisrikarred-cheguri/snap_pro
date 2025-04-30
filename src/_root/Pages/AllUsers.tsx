import GridUserList from "@/components/shared/GridUserList";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useGetAllUsers } from "@/lib/react-query/queriesAndMutations";
import React from "react";

const AllUsers = () => {
  const {
    data: creators,
    isLoading: isUsersLoading,
    isError: isErrorCreators,
  } = useGetAllUsers(10);
  
  console.log(creators)
  
  // const creators = creators_all.filter( creator => creator?.$id == current_user?.$id)

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <div className="flex gap-4 px-4 w-full rounded-lg">
          <img
            src="assets/icons/people.svg"
            alt=""
            width={24}
            height={24}
            className=""
          />
          <h2 className="h3-bold md: h2-bold w-full">All Users</h2>
        </div>
        
        <div className="flex flex-wrap gap-9 w-full max-w-5xl">
          {isUsersLoading ? (
            <Loader />
          ) : (
            <div className="flex flex-wrap gap-9 w-full max-w-5xl">
              <GridUserList creators={creators} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
