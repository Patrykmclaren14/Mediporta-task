import { NavLink } from "react-router-dom";

const NavigationLink = ({ path, name }: { path: string; name: string }) => {
  const defaultClasses = 'text-gray-500 transition hover:text-gray-500/75';
  const activeClasses = 'font-bold';

  return (
    <NavLink
      to={`/${path}`}
      className={({ isActive }) =>
        `${defaultClasses} ${isActive ? activeClasses : ''}`
      }
      end
    >
      {name}
    </NavLink>
  )
}

export default NavigationLink;