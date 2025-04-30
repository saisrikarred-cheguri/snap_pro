import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useGetSavedPosts } from "@/lib/react-query/queriesAndMutations";

const SavedPosts = () => {
  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useGetSavedPosts();
  console.log(posts);

  const { user } = useUserContext();

  
  // const posts = object_document?.documents
  //               ?.filter(({user}) => user?.$id === current_user?.$id)
  //               .map(({post}) => post);
    
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <div className="flex gap-4 px-4 w-full rounded-lg">
          <img
            src="assets/icons/save.svg"
            alt=""
            width={24}
            height={24}
            className=""
          />
          <h2 className="h3-bold md: h2-bold w-full">Saved Posts</h2>
        </div>
        <div className="flex justify-between items-center w-full max-w-full  my-2">
          {/* <h3 className="body-bold md: h3-bold ">Popular Today</h3> */}
          <div className="flex gap-14">
            <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-4 cursor-pointer">
              <p className="small-medium md: base-medium text-light-2">Posts</p>
              <img
                src="/assets/icons/posts.svg"
                alt="filter"
                width={20}
                height={20}
              />
            </div>
            <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-4 cursor-pointer">
              <p className="small-medium md: base-medium text-light-2">Reels</p>
              <img
                src="/assets/icons/posts.svg"
                alt="filter"
                width={20}
                height={20}
              />
            </div>
            <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-4 cursor-pointer">
              <p className="small-medium md: base-medium text-light-2">
                Collections
              </p>
              <img
                src="/assets/icons/posts.svg"
                alt="filter"
                width={20}
                height={20}
              />
            </div>
          </div>
          <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-4 cursor-pointer">
            <p className="small-medium md: base-medium text-light-2">All</p>
            <img
              src="/assets/icons/filter.svg"
              alt="filter"
              width={20}
              height={20}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-9 w-full max-w-5xl">
          {isPostLoading ? <Loader /> : <GridPostList posts={posts} />}
        </div>
      </div>
    </div>
  );
};

export default SavedPosts;
