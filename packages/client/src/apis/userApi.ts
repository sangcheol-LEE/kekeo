import axiosInstance from '../apis';
interface User {
  username : string
}


// 유저 조회
export function fetchUserList () {
    return axiosInstance.get(`/user`);
}

// 로그인한 사용자 정보조회
export function fetchMyProfile() {
    return axiosInstance.get(`/user/me`)

}

// 로그인하기
export function login(body: User) {
    return axiosInstance.post(`/user/login`, body)
}

// 로그아웃하기
export function logout() {
    return axiosInstance.post(`/user/logout`)
}

