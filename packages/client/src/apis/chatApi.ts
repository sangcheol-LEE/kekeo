import axiosInstance from "./index";


// 룸 아이디를 인자로 받아 메세지 정보를 가져옵니다.
export function fetchChatMessageList(roomId : string) {
    return axiosInstance.get(`/chat/${roomId}`)
}


// 메세지 정보에 새로운 메시지를 보냅니다.
export function sendChatMessage(roomId: string, content : string) {
    return axiosInstance.post(`/chat/${roomId}`, {content});
}