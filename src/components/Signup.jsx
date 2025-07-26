import { useState } from "react";
import ErrorModal from "./ErrorModal.jsx";
import Input from "./Input.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "../util/http.js";

export default function Signup() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      navigate("/login");
    },
    onError: () => {
      setOpenModal(true);
    },
  });

  function handleSave(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
    mutate({ user: formData });
  }

  return (
    <>
      {openModal && (
        <ErrorModal onClose={() => setOpenModal(false)}>
          <h2 className="text-xl font-bold text-stone-700 my-4 ">
            Invalid input!
          </h2>
          <p className="text-stone-600 mb-4">
            Oops ... looks like you forgot to enter a some of value.
          </p>
          <p className="text-stone-600 mb-4">
            Please ,make sure you provide a valid value for every input&rsquo;s
            filed.
          </p>
        </ErrorModal>
      )}
      <form onSubmit={handleSave} className="mx-auto mt-16">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <menu className="flex items-center justify-end gap-4 my-4">
            <li>
              <button
                type="button"
                className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-200 text-stone-800 hover:bg-stone-300 hover:text-stone-950"
              >
                Cancel
              </button>
            </li>
            <li>
              <button
                // disabled={isPending}
                className="px-8 py-2 text-xs md:text-base rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 hover:text-stone-200"
              >
                {/* {isPending ? "Saving..." : "Save"} */}save
              </button>
            </li>
          </menu>
        </div>
        <div className="py-8">
          <Input label="Name" InputType="input" type="text" id={"name"} />
          <Input label="E-Mail" InputType="input" type="email" id={"email"} />
          <Input
            label="Password"
            InputType="input"
            type="password"
            id={"password"}
          />
          <Input
            label="Confirm Password"
            InputType="input"
            type="password"
            id={"confirmPassword"}
          />
        </div>
      </form>
      <NavLink className={"text-stone-500 hover:text-stone-700"} to={"/login"}>
        I have an account already.
      </NavLink>
    </>
  );
}
