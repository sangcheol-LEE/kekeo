export interface IProfile {
  username : string;
  userId : string;
  isLogged: boolean;
}

export interface IUser {
  id : string;
  username : string;
  thumbnailImageUrl?: string;
  createAt: string;
  updateAt: string;
}

export interface IRoom {
  id : number;
  opponentId : string;
  userId : string;
  user: IUser;
  createAt: string;
  updateAt: string;
}

export interface IChat {
  id : number;
  content : string;
  senderId: string;
  roomId: string;
  user: IUser;
  room: IRoom;
  createAt: string;
  updateAt: string;
}