import React,{useEffect, useState, useRef} from "react";
import styled from "@emotion/styled/macro";
import { Global, css } from "@emotion/react";
import {io} from "socket.io-client"

import MessageList from "../components/ChatRoomDetail/MessageList";
import InputChat from "../components/ChatRoomDetail/InputChat";
import { useParams } from "react-router";
import TopNavigation from "../components/ChatRoomDetail/TopNavigation";
import { useMutation, useQuery } from "react-query";

import { fetchMyProfile } from "../apis/userApi";
import { fetchChatRoomDetail } from "../apis/roomApi";
import { fetchChatMessageList, sendChatMessage } from "../apis/chatApi";
import { AxiosError, AxiosResponse } from "axios";
import { IChat, IProfile, IRoom } from "../types";
import SentMessage from "../components/ChatRoomDetail/SentMessage";
import ReceiveMessage from "../components/ChatRoomDetail/ReceiveMessage";
import {API_HOST} from "../config"
import dayjs from "dayjs"

const Base = styled("div")`
  position: relative;
`;

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  margin-top : 64px;
  align-items: center;
  padding : 0 24px;
`;

const globalStyle = css`
  body {
    background-color: #abc1d1;
  }
`;

const RoomDetail: React.FC = () => {

  const scrollBottomRef = useRef<HTMLLIElement>(null)
  const {roomId} = useParams<string>();

  const {data: profileData } = useQuery<AxiosResponse<IProfile>, AxiosError>(
    "fetchMyProfile",
    fetchMyProfile
    );

  const {data: chatRoomDetailData} = useQuery<
    AxiosResponse<IRoom>,
    AxiosError
  >(["fetchChatRoomDetail", roomId], () =>
      fetchChatRoomDetail(roomId as string)
    );

    const [messages, setMessages] = useState<Array<IChat>>([]);

    const {data: chatListData} = useQuery<
      AxiosResponse<Array<IChat>>,
      AxiosError
    >(["fetchChatMessageList", roomId], () =>
        fetchChatMessageList(roomId as string)
      );

  const mutation = useMutation("sendChatMessage", (content: string) => sendChatMessage(roomId as string, content));



  const handleSend = (content: string) => {
    if(content.length) {
      mutation.mutate(content)
    }
  }

  useEffect(() => {
    const socket = io(`${API_HOST}/chat`, {path : "/socket.io"});
    socket.emit("join", roomId);

    socket.on("chat", (newMessage : IChat) => {
      setMessages(prev => [...prev, newMessage])
    })
  },[])

  useEffect(() => {
    scrollBottomRef.current?.scrollIntoView({behavior: "smooth"})
  },[messages]);




  return (
    <Base>
      <Global styles={globalStyle}/>
      {chatRoomDetailData && (
        <TopNavigation title={chatRoomDetailData.data.user.username}/>
      )}
        <Container>
          <MessageList>
            {
              chatListData?.data.map((message) => (
                message.senderId === profileData?.data.userId ? (
                  <SentMessage
                    key={message.id}
                    senderId={message.senderId}
                    content={message.content}
                    timestamp={dayjs(message.createAt).format("HH:mm")}
                  />
                ) : (
                  <ReceiveMessage
                    key={message.id}
                    receiver={message.user?.username}
                    receiverThumbnailImage={message.user?.thumbnailImageUrl}
                    senderId={message.senderId}
                    content={message.content}
                    timestamp={dayjs(message.createAt).format("HH:mm")}
                  />
                )
              ))
            }
            <li ref={scrollBottomRef}/>
          </MessageList>
        </Container>
        <InputChat onClick={handleSend}/>

    </Base>

  )
};

export default RoomDetail;
