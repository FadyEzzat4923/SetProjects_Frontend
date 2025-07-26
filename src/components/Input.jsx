function Input({ label, id, InputType, ...props }) {
  const calsss = InputType === "textarea" ? "h-20" : undefined;
  return (
    <p className="flex flex-col gap-1 my-4">
      <label className="text-sm font-bold text-stone-500">{label}</label>
      <InputType
        {...props}
        id={id}
        name={id}
        className={
          "resize-none w-full px-2 py-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600 " +
          `${calsss}`
        }
      />
    </p>
  );
}

export default Input;
