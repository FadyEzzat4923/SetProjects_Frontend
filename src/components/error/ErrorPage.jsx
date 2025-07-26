import NavBar from "../navbar/NavBar";
import ErrorCard from "./ErrorCard";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

export default function ErrorPage() {
  const [showNavBar, setShowNavBar] = useState(true);

  function handleShowNavBar() {
    setShowNavBar((prevValue) => !prevValue);
  }
  return (
    <>
      <div className="fixed top-0 left-0 flex h-[100vh] items-center">
        <AnimatePresence mode="sync">
          {showNavBar && <NavBar />}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            rotate: showNavBar ? 0 : 180,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={handleShowNavBar}
          className="text-black mt-3 me-3 border-2 border-gray-400 hover:border-gray-600 transition-colors rounded-full ms-1 w-8 h-8 flex justify-center items-center shadow-sm bg-white"
          title={showNavBar ? "Hide Sidebar" : "Show Sidebar"}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </motion.button>
      </div>
      <main
        className={
          showNavBar
            ? "px-3 mx-auto md:mx-0 lg:mx-0 max-w-[35rem] w-full static md:relative lg:relative md:-translate-x-1/4 lg:-translate-x-1/4 md:left-1/2 lg:left-1/2 md:max-w-[25rem] md:w-full lg:max-w-[35rem] lg:w-full"
            : "mx-auto max-w-[35rem] w-full px-3"
        }
      >
        <ErrorCard />
      </main>
    </>
  );
}
