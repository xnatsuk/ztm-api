import { getUserScore, updateUserScore } from "./controller/UserScore";
import { userLogin } from "./controller/UserLogin";
import { userProfile } from "./controller/UserProfile";
import { userRegister } from "./controller/UserRegister";
import { handleApiCall } from "./controller/UserImage";

export const AppRoutes = [
  {
    path: "/login",
    method: "post",
    action: userLogin,
  },
  {
    path: "/register",
    method: "post",
    action: userRegister,
  },
  {
    path: "/profile/:id",
    method: "get",
    action: userProfile,
  },
  {
    path: "/score/:id",
    method: "put",
    action: updateUserScore,
  },

  {
    path: "/score/:id",
    method: "get",
    action: getUserScore,
  },

  {
    path: "/image",
    method: "post",
    action: handleApiCall,
  },
];
