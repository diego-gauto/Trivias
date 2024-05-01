import { IUserInfoResult } from './IUser';

export interface IUseAuthProps {
  user: IUserInfoResult;
  isAuthenticating: boolean;
  logout: () => Promise<void>;
  reloadUser: () => void;
  setUser: React.Dispatch<React.SetStateAction<IUserInfoResult>>;
}
