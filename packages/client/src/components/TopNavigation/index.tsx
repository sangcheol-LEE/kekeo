import React from "react";
import styled from "@emotion/styled/macro";

import {AiOutlineSetting} from "react-icons/ai";
import {BiSearchAlt2} from "react-icons/bi";
import {RiChatNewLine} from "react-icons/ri";
import {HiOutlineMusicNote} from "react-icons/hi";



interface props {
  title : string,
}

const Base = styled("header")`
  display: flex;
  justify-content: space-between;
  align-items:center;
  position:fixed;
  top: 0;
  left:12px;
  right: 12px;
  height: 36px;
  box-sizing: border-box;
  background-color:#fff
`;
const Title = styled("h1")`
  font-size : 20px;
  margin : 0;
  padding : 0;
`;
const ActionItemContailner = styled("div")``;
const ActionItem = styled("span")`
  font-size:20px;
  padding : 0 20px;
`;


const TopNavigation : React.FC<props> = ({title}) => {
  return (
    <Base>
      <Title>{title}</Title>
      <ActionItemContailner>
        <ActionItem>
          <BiSearchAlt2 />
        </ActionItem>

        <ActionItem>
          <RiChatNewLine />
        </ActionItem>

        <ActionItem>
          <HiOutlineMusicNote />
        </ActionItem>

        <ActionItem>
          <AiOutlineSetting />
        </ActionItem>
      </ActionItemContailner>
   </Base>
  )
}

export default TopNavigation

