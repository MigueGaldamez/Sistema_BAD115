import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
  
export const NavLink = styled(Link)`
  color: #ced0d0 !important;
  display: flex;
  align-items: center;
  text-decoration: none !important;
  padding: 0 0.6rem;
  height: 100%;
  cursor: pointer;
  border-radius: 0.25rem;
  display: block;
  padding: 0.5rem 1rem;
  &.active {
    color: #FFFFFF !important;
    background-color: #1266F1;;
    text-decoration: none !important; 
  }
`;

export const NavLinkDrop = styled(Link)`
  color: #000000 !important;
  display: flex;
  align-items: center;
  text-decoration: none !important;
  padding: 0.2rem 0 0.2rem 0.9rem;
  margin: 0.2rem 0 0.2rem 0.6rem;
  height: 100%;
  cursor: pointer;
  color: white !important;
  &.active {
    border-left: 6px solid #4B7BE5;
    text-decoration: none !important;
  }
`;
  

