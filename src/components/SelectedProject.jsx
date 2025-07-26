import { useMutation, useQuery } from "@tanstack/react-query";
import CreatorButton from "./CreatorButton";
import Tasks from "./Tasks";
import { deleteProject, getProject, queryClient } from "../util/http";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/authentication";

export default function SelectedProject() {
  const [token] = useAuth();
  const params = useParams();
  const navigate = useNavigate();
  const projectId = params.projectId;
  const { data, isError, error, isPending } = useQuery({
    queryKey: ["projects", { projectId }],
    queryFn: () => getProject({ projectId, token }),
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const { mutate, isPending: isPendingDelete } = useMutation({
    mutationFn: deleteProject,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      navigate("/");
    },
  });

  function handleDeleteProject() {
    mutate({ projectId, token });
  }

  let content;
  if (isPending) {
    content = <p className="text-stone-800 mt-32 text-center">Loading...</p>;
  }
  if (isError) {
    content = (
      <p className="text-rose-500 mt-32 text-center">{error.message}</p>
    );
  }
  if (data) {
    const formattedDate = new Date(data.dueDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    content = (
      <div className="mx-auto my-16">
        <header className="pb-4 mb-4 border-b-2 border-stone-300">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-stone-600 mb-2">
              {data.title}
            </h1>
            <CreatorButton
              disabled={isPendingDelete}
              onClick={handleDeleteProject}
            >
              {isPendingDelete ? "deleting..." : "delete"}
            </CreatorButton>
          </div>
          <p className="mb-4 text-stone-400">{formattedDate}</p>
          <p className="text-stone-600 whitespace-pre-wrap">
            {data.description}
          </p>
        </header>
        <Tasks taskContent={data.tasks} />
      </div>
    );
  }

  return content;
}
