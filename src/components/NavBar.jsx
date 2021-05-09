import React, {useEffect, useState, useContext} from "react";
import { Link, Route, useLocation } from "react-router-dom";
import appContext from '../contexts/AppContext';
import styled, {css} from 'styled-components';
import axios from "axios";
import logo from '../assets/logo.png';

const MainNav = styled.nav`
  position: fixed;
  height: 85px;
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid;
  display: flex;
  align-items:center;
  padding: 0 20px 0 20px;
  top: 0;
  z-index: 100;
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-right: 20px;
  @media only screen and (max-width: 600px) {
    width: 30vw;
  }
`

const Flex = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`


const NavBar = () => {
  const location = useLocation();
  const {currentUser, setCurrentUser} = useContext(appContext);

  const logOut = () => {
    localStorage.clear();
    setCurrentUser("");
  };
  
  return (
    <> 
      <MainNav>
        <Flex>
          <Link to="/"><Logo src={logo}/></Link>
          <p>hey</p>
          <p>hey</p>
          <p>hey</p>
          { currentUser?
            <button class="ui negative basic button" onClick={logOut}>
              Logout
            </button> 
            :
            <> 
            <Link to="/login">
              <button class="ui primary button">
                Login
              </button>
            </Link>  
            </>
          }
        </Flex>
      </MainNav>
    </>
  );
};

export default NavBar;