import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
  
export const NavLink = styled(Link)`
  color: #ced0d0 !important;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 0.9rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #FFFFFF !important;
  }
`;
  

