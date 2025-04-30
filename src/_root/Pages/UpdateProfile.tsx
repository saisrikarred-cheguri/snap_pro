import UpdateProfileForm from "@/components/forms/UpdateProfileForm";
import { useUserContext } from "@/context/AuthContext";
import React from "react";

const UpdateProfile = () => {
  const { user } = useUserContext();
  return (
    <div className="flex flex-1 flex-row">
      <div className="flex flex-col flex-1 items-start overflow-scroll py-10 px-5 md:p-14 custom-scrollbar">
        <div className="max-w-5xl flex flex-col items-start w-full gap-6 md:gap-9">
          <div className="flex gap-4 w-full rounded-lg">
            <img src="assets/icons/edit.svg" alt="" width={36} height={36} />
            <h2 className="h3-bold md: h2-bold w-full">Edit Profile</h2>
          </div>
          {/* <div className="flex flex-1 flex-col "></div> */}
          <div className="flex flex-col w-full">
            <UpdateProfileForm />
          </div>
        </div>
      </div>

      <div className="rightsidebar ml-auto"></div>
    </div>
  );
};

export default UpdateProfile;
