import React from "react";
import styled from "@emotion/styled/macro";
import TopNavigation from "../components/TopNavigation";
import BottomNavigation from "../components/BottomNavigation";
import UserInfo from "../components/SeeMore/UserInfo";
import IconButtonList from "../components/SeeMore/IconButtonList";
import { useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { IProfile } from "../types";
import { fetchMyProfile } from "../apis/userApi";

const Base = styled("div")`
  width: 100%;
  height : 100vh;
  padding : 0 12px;
  box-sizing: border-box;
`;

const Container = styled("div")`
  display:flex;
  flex-direction: column;
`;


const SeeMore: React.FC = () => {
  const { data: profileData } = useQuery<AxiosResponse<IProfile>, AxiosError>(
    "fetchMyProfile",
    fetchMyProfile
  );
  return (
  <Base>
    <Container>
      <TopNavigation title={"More"} />
      {
        profileData && (
          <UserInfo
            username={profileData?.data.username}
            phoneNumber="010-7777-7777"
          />
      )}
      <IconButtonList/>
      <BottomNavigation />
    </Container>
  </Base>)
};

export default SeeMore;
