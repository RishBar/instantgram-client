import React, {useState, useEffect} from 'react';
import { setDefaultHeaders } from "../commonFunctions/functions";
import axios from 'axios';

const useUser = () => {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")));
  const [fresh, setFresh] = useState(false)
  setDefaultHeaders();

  useEffect(() => {
    if (currentUser && currentUser.id && !fresh) {
      const getAndSetCurrentUser = () => {
        axios.get(`/users/${currentUser.id}`)
          .then((res) => {
            setCurrentUser(res.data.user)
            setFresh(true)
          })
      }

      getAndSetCurrentUser()
    }
  }, [currentUser])
  return [currentUser, setCurrentUser];
};

export default useUser;