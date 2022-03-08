import { useContext } from "react";
import { NavLink } from "react-router-dom";
import  { AuthContext } from "../context/auth.context"

export default function Header() {

  const {isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="Header">

        <NavLink to="/">Home</NavLink> |


        { isLoggedIn && 
          <>
            <NavLink to="/projects">Projects</NavLink> |
            <NavLink to="/projects/create">New Project</NavLink> |

            &nbsp;
            <br />
            <button onClick={logOutUser}>Logout</button>
            <br />
            <span>User: {user && user.username}</span>

          </>
        }

        { !isLoggedIn && 
          <>
            <NavLink to="/signup">Register</NavLink> |
            <NavLink to="/login">Login</NavLink> |
          </>
        }

    </div>
  )
}
