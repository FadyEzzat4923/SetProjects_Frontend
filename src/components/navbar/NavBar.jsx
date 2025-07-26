import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import CreatorButton from "../CreatorButton";
import NavBarLink from "./NavBarLink";
import { useQuery } from "@tanstack/react-query";
import { getProjects, queryClient } from "../../util/http";
import { motion } from "framer-motion";
import { clearLocalStorage } from "../../util/auth";
import useAuth from "../../hooks/authentication";

export default function NavBar() {
  const navigate = useNavigate();
  const [token, isAuth] = useAuth();

  const { data, isError, error, isPending } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects({ token }),
    enabled: isAuth && token !== "",
    refetchInterval: 1000,
  });

  function handleSignOut() {
    clearLocalStorage();
    queryClient.invalidateQueries({ queryKey: ["projects"] });
    queryClient.clear();
    navigate("/login");
  }

  function handleTextFormate(text) {
    let newText = text;
    if (text.length > 25) {
      newText = text.slice(0, 25) + ".....";
    }
    return newText;
  }

  return (
    <motion.nav
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={"nav h-[100vh] w-[18rem] rounded-r-lg overflow-y-auto"}
    >
      <div className="logo sticky top-0 py-3 my-5 text-center">
        <NavLink className={"inline-block"} to={"/"}>
          <img src={logo} width={80} alt="logo" />
        </NavLink>
        <h1 className="text-lg text-center mt-3 uppercase text-stone-200">
          Your Projects
        </h1>
      </div>
      <CreatorButton to={"/new-project"} className={"ms-3"}>
        + Add Project
      </CreatorButton>
      <ul className="flex flex-col gap-2 px-1 mt-5">
        {isAuth && isPending && (
          <p className="text-stone-200 text-center">Loading...</p>
        )}
        {isAuth && isError && (
          <p className="text-rose-500 text-center">{error.message}</p>
        )}
        {data && data.length === 0 && (
          <p className="text-center text-stone-200">No Projects Found.</p>
        )}
        {!isAuth && (
          <p className="text-center text-stone-200">No Projects Found.</p>
        )}
        {isAuth &&
          data &&
          data.map((project) => (
            <NavBarLink
              key={project._id}
              NavBarLink
              route={"/projects/" + project._id}
            >
              {handleTextFormate(project.title)}
            </NavBarLink>
          ))}
      </ul>
      <div className="auth absolute bottom-16 md:bottom-26 lg:bottom-0 -translate-y-1/2 left-3 flex gap-6">
        {!isAuth && (
          <>
            <NavLink
              className={"hover:text-stone-200 text-stone-400"}
              to={"/login"}
            >
              Login
            </NavLink>
            <NavLink
              className={"hover:text-stone-200 text-stone-400"}
              to={"/signup"}
            >
              Signup
            </NavLink>
          </>
        )}
        {isAuth && (
          <button
            className={"hover:text-stone-200 text-stone-400"}
            onClick={handleSignOut}
          >
            Signout
          </button>
        )}
      </div>
    </motion.nav>
  );
}
