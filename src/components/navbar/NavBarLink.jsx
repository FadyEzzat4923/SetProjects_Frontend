import { NavLink } from "react-router-dom";

export default function NavBarLink({ route, children, ...props }) {
  return (
    <NavLink {...props} to={route} end>
      <li className="w-full text-left px-2 py-1 rounded-sm hover:text-stone-200 hover:bg-stone-800 text-stone-400">
        {children}
      </li>
    </NavLink>
  );
}
