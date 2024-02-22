import { useMutation, gql } from "@apollo/client";
import { NavLink, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useStore } from "../store";

const LOGOUT_USER = gql`
  mutation {
    logout
  }
`;

function Header() {
  const [logoutUser] = useMutation(LOGOUT_USER);
  const { user, setState } = useStore();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 990px)" });

  const logout = async (e) => {
    e.preventDefault();

    await logoutUser();

    setState((oldState) => ({
      ...oldState,
      user: null,
    }));

    navigate("/");
  };

  return (<header></header>);
}

export default Header;
