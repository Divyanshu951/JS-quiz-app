import { createContext, useContext, useMemo, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [query, setQuery] = useState("");
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [selectedUserDetails, setSelectedUserDetails] = useState({});

  const value = useMemo(
    () => ({
      query,
      onQuery: setQuery,
      fetchedUsers,
      onFetchedUsers: setFetchedUsers,
      selectedUserDetails,
      onSelectedUserDetails: setSelectedUserDetails,
    }),
    [query, fetchedUsers, selectedUserDetails],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUser() {
  const context = useContext(UserContext);

  if (context === undefined)
    throw new Error("UserContext was used outside the UserProvider");
  return context;
}

export { UserProvider, useUser };
