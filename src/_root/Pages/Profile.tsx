import GridPostList from "@/components /shared/GridPostList";
import Loader from "@/components /shared/Loader";
import { Button } from "@/components /ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserPosts } from "@/lib/react-query/queriesAndMutations";
import { Link, useLocation, useParams } from "react-router-dom";

const Profile = () => {
  const { user: current_user } = useUserContext();
  const location = useLocation();
  const user = location.state?.user || current_user;
  const { id: userId } = useParams();

  const {
    data: userPosts,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useGetUserPosts(userId || "");

  console.log(userPosts);
  return (
    <div className="flex flex-1 flex-col p-14 gap-10">
      <div className="flex flex-row gap-6 ">
        <img
          src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
          alt="profile"
          className="w-[150px] h-[150px] rounded-full "
        />
        <div className="flex flex-row justify-items-start mt-[4.5px]">
          <div className="flex flex-1 flex-col gap-[16px]">
            <div className="flex flex-row gap-20">
              <div className="flex flex-col gap-[8px]">
                <h1 className="font-inter font-semibold text-[36px] leading-[140%] tracking-[-1px]">
                  {user.name}
                </h1>
                <p className="small-regular text-light-3">@{user.username}</p>
              </div>
              <div className="px-2 py-2 curson-pointer ">
                <Link
                  to={`/update-profile/${userId}`}
                  className={`${
                    user.id === current_user.$id && "hidden"
                  } flex items-center gap-1 hover:text-purple-500`}
                >
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    width={20}
                    height={20}
                  />
                  <p className="font-inter font-semibold text-[14px] leading-[18px] tracking-[0%] text-center">
                    Edit Profile
                  </p>
                </Link>
              </div>
            </div>
            <div className="flex flex-row w-[293px] gap-[20px] justify-between">
              <div className="flex flex-col gap-[2px]">
                <p className="font-inter font-medium text-[20px] leading-[140%] tracking-[-1px] text-[#877EFF]">
                  {userPosts?.length}
                </p>
                <p className="font-inter font-medium text-[18px] leading-[140%] tracking-[0px] text-[#EFEFEF]">
                  Posts
                </p>
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="font-inter font-medium text-[20px] leading-[140%] tracking-[-1px] text-[#877EFF]">
                  {userPosts?.length}
                </p>
                <p className="font-inter font-medium text-[18px] leading-[140%] tracking-[0px] text-[#EFEFEF]">
                  Followers
                </p>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col gap-[2px]">
                  <p className="font-inter font-medium text-[20px] leading-[140%] tracking-[-1px] text-[#877EFF]">
                    {userPosts?.length}
                  </p>
                  <p className="font-inter font-medium text-[18px] leading-[140%] tracking-[0px] text-[#EFEFEF]">
                    Following
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[628px] overflow-hidden">
              <p className="font-inter font-normal text-[16px] leading-[140%] tracking-[0px] mb-[4px] line-clamp-3 whitespace-pre-line">
                {user.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between pr-[5px]">
        <div
          className="flex items-center justify-between rounded-xl border border-blue-400 px-2 "
          style={{ width: "533px", height: "46px" }}
        >
          <div className="flex w-full">
            <div className="flex-1 flex justify-center">
              <Button
                className="shad-button_ghost flex items-center gap-1 hover:text-purple-700"
                variant="ghost"
              >
                <img
                  src="/assets/icons/posts.svg"
                  width={20}
                  height={20}
                  alt="posts"
                />
                <p className="font-inter font-medium text-[16px] leading-[140%] tracking-[0px]">
                  Posts
                </p>
              </Button>
            </div>

            <div className="flex-1 flex justify-center">
              <Button
                className="shad-button_ghost flex items-center gap-1 hover:text-purple-700"
                variant="ghost"
              >
                <img
                  src="/assets/icons/posts.svg"
                  width={20}
                  height={20}
                  alt="reels"
                />
                <p className="font-inter font-medium text-[16px] leading-[140%] tracking-[0px]">
                  Reels
                </p>
              </Button>
            </div>

            <div className="flex-1 flex justify-center">
              <Button
                className="shad-button_ghost flex items-center gap-1 hover:text-purple-700"
                variant="ghost"
              >
                <img
                  src="/assets/icons/posts.svg"
                  width={20}
                  height={20}
                  alt="tagged"
                />
                <p className="font-inter font-medium text-[16px] leading-[140%] tracking-[0px]">
                  Tagged
                </p>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 bg-dark-3 border border-blue-400 rounded-lg px-4 cursor-pointer">
          <Button
            className="shad-button_ghost flex items-center gap-1 hover:text-purple-700"
            variant="ghost"
          >
            <img
              src="/assets/icons/filter.svg"
              alt="filter"
              width={20}
              height={20}
            />
            <p className="font-inter font-medium text-[16px] leading-[140%] tracking-[0px]">
              All
            </p>
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {isPostLoading ? (
          <Loader />
        ) : userPosts && userPosts.length > 0 ? (
          <GridPostList posts={userPosts} />
        ) : (
          <p className="text-white text-center w-full text-lg">No posts yet</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
