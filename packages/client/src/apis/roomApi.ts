import axiosInstance from "./index";


export interface MakeChatRoomRequest {
  opponentId : string
}

// 룸 목록을 조회합니다.
export function fetchChatRoomList() {
  try {
    return axiosInstance.get(`/room`);
  }catch(e) {
    return console.log(e)
  }
}

// 룸 아이디를 파라미터로 전달받아서 해당 룸의 상세정보를 조회
export function fetchChatRoomDetail(roomId : string){
  try {
    return axiosInstance.get(`/room/${roomId}`);
  }catch(e) {
    return console.log(e)
  }
}

// 새로운 룸을 만듭니다.
export function makeChatRoom(body : MakeChatRoomRequest) {
  try {
    return axiosInstance.post(`/room`, body)
  }catch(e) {
    return console.log(e)
  }
}