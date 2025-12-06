import React from 'react';
import { NavLink } from 'react-router';
import { motion } from 'motion/react';
// import { AuthContext } from "../../Contexts/AuthContext/AuthContext";

const Links = ({ nav }) => {
  //   const {user} = useContext(AuthContext);
  return (
    <motion.li
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <NavLink
        to={nav.path}
        target="_parent"
        className={({ isActive }) =>
          `relative inline-block text-white/90 hover:text-secondary font-semibold ${
            isActive
              ? 'border-b-2 border-secondary'
              : ''
          }`
        }
      >
        <span>{nav.name}</span>
        {/* <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-[#9f62f2]"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        /> */}
      </NavLink>
    </motion.li>
  );
};

export default Links;
