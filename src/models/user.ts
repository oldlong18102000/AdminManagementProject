export interface AuthToken {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
}

// export interface IUser {
//   id: number;
//   email: string;
//   name: string;
//   gender: string;
//   avatar: string;
//   region: number;
//   state: number;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
//   token: string;
// }

export interface IUser {
  countOfLoginAttempts: string;
  dateOfLoginAttempt: string;
  firstName: string;
  forceChangePassword: string;
  lastName: string;
  login: string;
  profile_id: string;
}