import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
  
export const NavLink = styled(Link)`
  color: #ced0d0 !important;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 0.6rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #FFFFFF !important;
  }
`;

export const NavLinkDrop = styled(Link)`
  color: #000000 !important;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.2rem 0.9rem;
  height: 100%;
  cursor: pointer;
  &.active {
    border-left: 6px solid #4B7BE5;
  }
`;
  

