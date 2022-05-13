export interface IUserResponse {
  name: string;
  lastname: string;
  email: string;
  id: number;
  token?: string;
}

export interface IUpdateResponse {
  ok: boolean;
  mensagem: string;
}
