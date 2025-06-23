export interface IUser {
  id?: string;
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  sex: 'm' | 'w';
}
export type TSortParam = 'email' | 'sex' | 'lastName' | 'firstName'
