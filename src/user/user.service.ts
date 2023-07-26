import { Injectable,  } from '@nestjs/common';
import { UserDTO } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { UpdateUserDTO } from './dto/update-user.dto';
import axios from 'axios';
import { getRandomIndianName, getRandomIndianPhoneNumber, getRandomIndianPostalCode, getRandomNumber } from './function';
import * as fs from 'fs';
import readXlsxFile from 'read-excel-file/node';
import { appConfig } from 'src/common/appConstants';
const excelUrl = process.env.EXCEL_URL;

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) {}

    async generateRandomUser(): Promise<UserDTO> {
        const id = getRandomNumber(1, 1000);
        const name = getRandomIndianName();
        const age = getRandomNumber(18, 70);

        return {
            id: id,
            name: name,
            age: age,
            email: `${name}@gmail.com`,
            phone: '+91 7898250621',
            postal_code: '560021',
        };
    }

    async create(): Promise<User> {
        try {
            const user = await this.generateRandomUser();
            const res = await this.userModel.create(user);
            return res;
        } catch (ex) {
            return ex.message
        }
    }

    async findAll(): Promise<User[]> {
        try {
            const users = await this.userModel.find();
            //Write in excel file
            return users;
        } catch (ex) {
            return ex.message
        }
    }

    async updateById(): Promise<User> {
        try {
            const userDetails = await this.getUsersFromGoogleSheets('update')
            delete userDetails.id
            return await this.userModel.findByIdAndUpdate(userDetails.id, userDetails, {
              new: true,
              runValidators: true,
            });
        } catch (ex) {
            return ex.message
        }
    }

    async deleteById(): Promise<User> {
        try {
            let userId =await this.getUsersFromGoogleSheets('delete')
            return await this.userModel.findByIdAndDelete(userId);
        } catch (ex) {
            return ex.message
        }
    }

    async getUsersFromGoogleSheets(op) {
        try {
            const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1VQfddFLl9vVxZ_P9fd7pV9rjAty0LJQhV8yJaupdIt0/edit#gid=0';
            const response = await axios.get(spreadsheetUrl, { responseType: 'arraybuffer' });
            
            const filePath = 'temp.xlsx';
            fs.writeFileSync(filePath, response.data);
            
            fs.unlinkSync(filePath);
        
        } catch (ex) {
            return ex.message
        }
    }

    

}
