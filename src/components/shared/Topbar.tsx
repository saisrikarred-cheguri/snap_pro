// import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
// import { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "../ui/button";
// import { useUserContext } from "@/context/AuthContext";

// const Topbar = () => {
//   const { mutate: signOut, isSuccess } = useSignOutAccount();
//   const navigate = useNavigate();
//   const { user } = useUserContext();
//   useEffect(() => {
//     if (isSuccess) {
//       navigate("/login");
//     }
//   }, [isSuccess]);

//   return (
//     <section>
//       <div className="flex-between py-4 px-5">
//         <Link to="/" className="flex gap-3 items-center">
//           <img
//             src="/assets/images/logo.svg"
//             alt="logo"
//             width={130}
//             height={325}
//           />
//         </Link>
//         <div className="flex gap-4">
//           <Button
//             className="shad-button_ghost"
//             variant="ghost"
//             onClick={() => signOut()}
//           >
//             <img src="/assets/icons/logout.svg" alt="logout" />
//           </Button>
//           <Link to={`/profile/${user.id}`}>
//             <img
//               src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
//               alt="profile"
//               className="h-8 w-8 rounded-full"
//             />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Topbar;

import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate("/sign-in"); // Redirect to login instead of reloading
    }
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img src="/assets/images/logo.svg" alt="logo" width={130} height={325} />
        </Link>

        <div className="flex gap-4">
          <Button className="shad-button_ghost" variant="ghost" onClick={() => signOut()}>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>

          {user?.id && (
            <Link to={`/profile/${user.id}`}>
              <img
                src={user?.imageUrl ? user.imageUrl : "/assets/icons/profile-placeholder.svg"}
                alt="profile"
                className="h-8 w-8 rounded-full object-cover"
              />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Topbar;

