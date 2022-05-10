import { compare, hash } from 'bcrypt';

export const Password = {
  async Compare(password: string, hash: string): Promise<boolean> {
    console.log(password, hash);
    try {
      const ComprePassword = await compare(password, hash);

      return ComprePassword;
    } catch (err) {
      throw new Error(`Erro Ao comparar as senhas!`);
    }
  },

  async encrypt(password: string): Promise<string> {
    return await hash(password, 8);
  },
};
