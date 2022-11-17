import React from "react";
import styled from "@emotion/styled";

const Base = styled("ul")`
  list-style: none;
  margin : 0;
  padding: 36px 0 64px 0;
`;

interface Props {
  children : any
}

const ChatRoomList: React.FC<Props> = ({children}) => {
  return (
    <Base>
      {children}
    </Base>

  )
}

export default ChatRoomList