import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { useMutation, gql } from "@apollo/client";

const initialFormData = {
  email: "",
  username: "",
  identifier: "",
  password: "",
};

const REGISTER_USER = gql`
  mutation RegisterUser(
    $email: String!
    $username: String!
    $password: String!
  ) {
    register(eamil: $email, username: $username, password: $password) {
      _id
      email
      username
      Pokedexs {
        _id
        name
      }
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser($identifier: String!, $password: String!) {
    login(identifier: $identifier, password: $password) {
      _id
      email
      username
      pokedexs {
        _id
        name
      }
    }
  }
`;

function Auth({ isLogin }) {
  const { setState } = useStore();
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState("");
  const bavigate = useNavigate();
  const [authenticateUser] = useMutation(isLogin ? LOGIN_USER : REGISTER_USER, {
    variables: formData,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resolverName = isLogin ? "login" : "register";

      const { data: userData } = await authenticateUser();
      setFormData({ ...initialFormData });
      setState((oldState) => ({
        ...oldState,
        user: userData[resolverName],
      }));
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleInpuChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h1>{isLogin ? "login" : "Register"}</h1>
      <section className="auth">
        <form onSubmit={handleSubmit} className="max-w-sm mx auto">
          {!isLogin && (
            <div className="mb-4">
              <label
                htmlFor="username"
                className="bock text-gray-700 text-sm font-bold mb-2"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focuse:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleInpuChange}
              ></input>
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="identifier"
              className="bock text-gray-700 text-sm font-bold mb-2"
            >
              {isLogin ? "Email or Username" : "Email"}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focuse:shadow-outline"
              id="identifier"
              type="text"
              placeholder={isLogin ? "Email or Username" : "Email"}
              name="identifier"
              value={formData.identifier}
              onChange={handleInpuChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="bock text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focuse:shadow-outline"
              id="Password"
              type="password"
              placeholder="*************"
              name="password"
              value={formData.password}
              onChange={handleInpuChange}
            />
          </div>
          <div className="flex items-cneter justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus shadow-outline"
              type="submit"
            >
              {isLogin ? "sign In" : "Sign Up"}
            </button>
            {!isLogin && (
              <NavLink
                to="/login"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Already have an account?
              </NavLink>
            )}
          </div>
          {errorMessage && (
            <p className="text-red-500 text-xs italic mt-4">{errorMessage} </p>
          )}
        </form>
      </section>
    </>
  );
}

export default Auth;
