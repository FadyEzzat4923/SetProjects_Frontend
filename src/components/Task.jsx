import { useMutation } from "@tanstack/react-query";
import { deleteTask, queryClient } from "../util/http";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/authentication";

export default function Task({ task }) {
  const [token] = useAuth();
  const projectId = useParams().projectId;
  const { mutate, isPending } = useMutation({
    mutationFn: deleteTask,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", { projectId }],
      });
    },
  });

  function handleDeleteTask(taskId) {
    mutate({ projectId, taskId, token });
  }

  return (
    <li key={task._id} className="flex justify-between my-4">
      <span>{task.title}</span>
      <button
        disabled={isPending}
        onClick={() => handleDeleteTask(task._id)}
        className="text-stone-50 rounded-md px-2  bg-stone-300 hover:bg-green-500"
      >
        {isPending ? "Clearing..." : "Clear"}
      </button>
    </li>
  );
}
