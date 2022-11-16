import React from "react";
import styled from "@emotion/styled/macro";
import { useTheme } from "@emotion/react";


const Base = styled("div")<{color : string}>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding : 48px 0 24px 0;
  width : 100%;
  border-bottom : 1px solid ${({color}) => color};
`;

const AvartarWrapper = styled("div")`
  width : 52px;
  height : 52px;
`;

const Avartar = styled("img")`
  width: 100%;
  height : 100%;
  border-radius: 50%;
  object-fit: contain;
`;

const UsernameWrapper = styled("div")`
  margin-left: 8px;
`;

const Username = styled("p")`
  margin : 0;
  padding :0;
  font-size: 16px;
`;

interface Props {
  username : string;
  thumbnailImage : string;
}


const ProFile : React.FC<Props> = ({username, thumbnailImage}) => {
  const theme = useTheme()
  return (
    <Base color={theme.colors.gray[100]}>
      <AvartarWrapper>
        <Avartar src={thumbnailImage || "/placeholder.png"}/>
      </AvartarWrapper>

      <UsernameWrapper>
        <Username>{username}</Username>
      </UsernameWrapper>
    </Base>
  )
}

export default ProFile