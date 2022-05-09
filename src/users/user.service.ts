import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./user.entity";

@Injectable()
export class UserService {
    constructor(@InjectRepository(Users)
    private userRepository : Repository<Users>,
    ){}

    async getAll():Promise<Users[]> {
        return await this.userRepository.find();
    }

    async getByEmail(email :string) :Promise<Users> {
        
        return await this.userRepository.findOneBy({email})
    }

    async getById(id : number):Promise<Users> {
    
        console.log("Cheguei")
        return await this.userRepository.findOneBy({id});
    }

    async createUser(user : Users):Promise<Users> {

        return await this.userRepository.save(user);
    }

    async updatePassword(password:string , id:number) : Promise<[number , Users[]]> {

        return await this.userRepository.query(`UPDATE users SET password=${password} WHERE id=${id}`);
    }

    async deleteUser(id : number):Promise<Users> {
        return await this.userRepository.query(`DELETE FROM users WHERE id=${id}`);
    }
}