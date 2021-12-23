import { IUserInPutDTO,  userUniqueSearchInput, userExist } from "../interfaces/IUser";
import User from "../models/User";

const createUser = (data: IUserInPutDTO) => {
    const user = new User(data);
    return user.save();
}
const modifyUser = (data: IUserInPutDTO ) => {
    const { email, username, password, address, birth, job, phone, user_interests } = data
    console.log(`data :: ${email}`)
    return User.updateOne({email: email}, { username, password, address, birth, job, phone, user_interests})
}
const findLogin = (data: userUniqueSearchInput) => {
    const { email,password  } = data;
    return User.findOne({ email, password });
}
const findEmail = (data: userExist) => {
    const { email } = data;
    // console.log(`여기는 파인드 이메일}`)
    // console.log(User.findOne({email}))
    return User.findOne({ email });
}
export default {
    createUser,
    findLogin,
    findEmail,
    modifyUser
};