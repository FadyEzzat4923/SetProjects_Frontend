import { useState } from "react";
import ErrorModal from "./ErrorModal.jsx";
import Input from "./Input.jsx";
import { useMutation } from "@tanstack/react-query";
import { createProject, queryClient } from "../util/http.js";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/authentication.js";

export default function NewProject() {
  const [token, isAuth] = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const minmum = new Date();
  const minmumDate = `${minmum.getFullYear()}-${
    minmum.getMonth() < 10 ? "0" : undefined
  }${minmum.getMonth() + 1}-${minmum.getDay() < 10 ? "0" : undefined}${
    minmum.getDay() - 4
  }`;

  const { mutate, isPending } = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      navigate("/");
    },
    onError: () => {
      setOpenModal(true);
    },
  });

  function handleSave(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const projectData = Object.fromEntries(fd.entries());
    if (!isAuth) {
      return navigate("/login");
    }
    mutate({ projectData, token });
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
              disabled={isPending}
              className="px-8 py-2 text-xs md:text-base rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 hover:text-stone-200"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
          </li>
        </menu>
        <div className="py-8">
          <Input label="Title" InputType="input" type="text" id={"title"} />
          <Input label="Description" InputType="textarea" id={"description"} />
          <Input
            label="Due Date"
            InputType="input"
            type="date"
            min={minmumDate}
            id={"dueDate"}
          />
        </div>
      </form>
    </>
  );
}
