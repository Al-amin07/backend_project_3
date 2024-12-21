export interface TRegistration {
  name: string;
  email: string;
  password: string;
}

export interface TLogin {
  email: string;
  password: string;
}

// export interface TUserRegistration extends Model<TRegistration> {
//   isUserExist(email: string): Promise<TUser>;
// }
