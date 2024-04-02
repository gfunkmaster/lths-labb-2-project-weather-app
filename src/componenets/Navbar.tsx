import { Link } from "react-router-dom";
import styled from "styled-components";

// Define the styled components for the navbar
const Nav = styled.nav`
  background-color: #333;
  color: #fff;
  padding: 10px;
`;

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
`;

const Li = styled.li`
  margin-right: 10px;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const Navbar = () => (
  <Nav>
    <Ul>
      <Li>
        <NavLink to="/">Home</NavLink>
      </Li>
      <Li>
        <NavLink to="/favorites">Favorites</NavLink>
      </Li>
    </Ul>
  </Nav>
);

export default Navbar;
