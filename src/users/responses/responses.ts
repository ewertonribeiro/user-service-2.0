export interface IUserResponse {
  name: string;
  lastname: string;
  email: string;
  id: number;
}

export interface IUpdatePassword {
  ok: boolean;
  mensagem: string;
}
