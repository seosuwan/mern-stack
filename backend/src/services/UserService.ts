import { IUserInPutDTO, userUniqueSearchInput } from "../interfaces/IUser";
import User from "../models/User";

const createUser = (data: IUserInPutDTO) => {
    const user = new User(data);
    return user.save();
}

const findEmail = (data: userUniqueSearchInput) => {
    const { email } = data;
    return User.findOne({ email });
}
export default {
    createUser,
    findEmail
};