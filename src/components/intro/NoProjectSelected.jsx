import logo from "../../assets/logo.png";
import CreatorButton from "../CreatorButton";
export default function NoProjectSelected() {
  return (
    <div className="text-1xl mt-24 text-center">
      <img src={logo} className="w-36 h-36 object-contain mx-auto" />
      <h2 className="text-3xl font-bold text-stone-500 my-4 ">
        No Project Selected
      </h2>
      <p className="text-stone-400 mb-4">
        Select a project or get started with new one
      </p>
      <p className="mt-8">
        <CreatorButton to={"/new-project"}>Create New Project</CreatorButton>
      </p>
    </div>
  );
}
