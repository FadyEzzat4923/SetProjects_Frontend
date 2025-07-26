import { useState } from "react";
import ErrorModal from "./ErrorModal";
import MainButton from "./MainButton";
import { useMutation } from "@tanstack/react-query";
import { addTask, queryClient } from "../util/http";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/authentication";
function NewTask() {
  const [token] = useAuth();
  const params = useParams();
  const projectId = params.projectId;
  const [openModal, setOpenModal] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: addTask,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", { projectId }],
      });
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const task = fd.get("task");
    if (task.trim().length > 0) {
      mutate({ projectId, taskData: { title: task }, token });
      event.target.reset();
    } else {
      setOpenModal(true);
    }
  }
  return (
    <>
      {openModal && (
        <ErrorModal onClose={() => setOpenModal(false)}>
          <h2 className="text-xl font-bold text-stone-700 my-4 ">
            Invalid input!
          </h2>
          <p className="text-stone-600 mb-4">
            Oops ... looks like you forgot to enter value.
          </p>
          <p className="text-stone-600 mb-4">
            Please ,make sure you provide a valid value for input task.
          </p>
        </ErrorModal>
      )}
      <form onSubmit={handleSubmit} className="flex items-center gap-4 mb-4">
        <input
          className="resize-none w-full px-2 py-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
          type="text"
          placeholder="Add_New_Task"
          id="task"
          name="task"
        />
        <MainButton disabled={isPending}>
          {isPending ? "Sending..." : "Submit"}
        </MainButton>
      </form>
    </>
  );
}

export default NewTask;
