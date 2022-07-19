import { userEntries } from "./controller/UserEntries";
import { userLogin } from "./controller/UserLogin";
import { userProfile } from "./controller/UserProfile";
import { userRegister } from "./controller/UserRegister";

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
    path: "/image",
    method: "put",
    action: userEntries,
  },
];
