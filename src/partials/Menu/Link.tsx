import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export interface LinkProps {
  icon: IconDefinition,
  name: string,
  route: string
}

export default function Link(props: LinkProps) {
  const inactiveLink = 'flex items-center font-semibold text-slate-600'
  const activeLink = 'flex items-center font-bold text-emerald-500';

  return (
    <div className='h-8 my-1'>
      <NavLink 
        to={props.route} 
        className={({ isActive }) => (isActive ? activeLink : inactiveLink)}
      >
        <FontAwesomeIcon icon={props.icon} className='w-5' />
        <span className='capitalize ml-3'>{props.name}</span>
      </NavLink>
    </div>
  );
}