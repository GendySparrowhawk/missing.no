import { useQuery, gql } from "@apollo/client";
import { useState, useEffect } from "react";
import { useStore } from "./store";

import Auth from "./Pages/Auth";
import Header from "./componets/Header";

const AUTHENTICATE = gql`
  query {
    authenticate {
      _id
      email
      username
      wishlists {
        _id
        name
      }
    }
  }
`;

function App() {
  const { loading, error, data: userData } = useQuery(AUTHENTICATE);
  const { setState } = useStore();

  useEffect(() => {
    if (userData) {
      setState((oldState) => ({
        ...oldState,
        user: userData.authenticate,
      }));
    }
  }, [userData]);

  return (
    <>
      {loading ? (
        <h3 className="fontbold">Loading...</h3>
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Auth isLogin={true} />}></Route>
            <Route path="/register" element={<Auth isLogin={false} />}></Route>
            <Route
              path="/profile"
              element={
                <Protect user={userData}>
                  <Profile userData={userData} />
                </Protect>
              }
            />
            <Route path="/user/:userId" element={<User />}></Route>

            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
