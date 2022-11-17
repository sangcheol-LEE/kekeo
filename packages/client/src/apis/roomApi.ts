import axiosInstance from "../apis";

export interface MakeChatRoomRequest {
  opponentId : string
}

// 룸 목록을 조회합니다.
export function fetchChatRoomList() {
    return axiosInstance.get(`/room`);
}

// 룸 아이디를 파라미터로 전달받아서 해당 룸의 상세정보를 조회
export function fetchChatRoomDetail(roomId : string){
    return axiosInstance.get(`/room/${roomId}`);
}

// 새로운 룸을 만듭니다.
export function makeChatRoom(body : MakeChatRoomRequest) {
    return axiosInstance.post(`/room`, body)
}