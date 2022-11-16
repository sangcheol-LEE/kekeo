import axiosInstance from "./index";

interface User {
  username : string
}


// 유저 조회
export function fetchUserList () {
  try {
    return axiosInstance.get(`/user`);
  }catch(e) {
    return console.log(e)
  }
}

// 로그인한 사용자 정보조회
export function fetchMyProfile() {
  try{
    return axiosInstance.get(`/user/me`)
  }catch(e) {
    return console.log(e)
  }
}

// 로그인하기
export function login(body: User) {
  try {
    return axiosInstance.post(`/user/login`, body)
  } catch(e) {
    return console.log(e)
  }
}

// 로그아웃하기
export function logout() {
  try {
    return axiosInstance.post(`/user/logout`)
  }catch(e) {
    return console.log(e)
  }
}

