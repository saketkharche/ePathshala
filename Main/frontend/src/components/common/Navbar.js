import React from "react";
import { useAuth } from "../../utils/auth";
import { Link } from "react-router-dom";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
      <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>ePathshala</span>
      <div>
        {!user && (
          <>
            <Link to="/about" style={{ marginRight: '1rem' }}>About Us</Link>
            <Link to="/contact">Contact Us</Link>
          </>
        )}
        {user && (
          <>
            <Link to={`/${user.role.toLowerCase()}/profile`} style={{ marginRight: '1rem' }}>Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;