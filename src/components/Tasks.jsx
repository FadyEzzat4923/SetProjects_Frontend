import NewTask from "./NewTask";
import Task from "./Task";

export default function Tasks({ taskContent }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask />
      {taskContent.length === 0 && (
        <p className="text-stone-800 mb-4">
          This project does not has any tasks yet.
        </p>
      )}
      {taskContent.length > 0 && (
        <ul className="p-4 mt-8 rounded-sm bg-stone-100">
          {taskContent.map((task) => {
            return <Task key={task._id} task={task} />;
          })}
        </ul>
      )}
    </section>
  );
}
