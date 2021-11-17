import React, {Component} from "react";
export interface Props {
    id: string;
    passwd: string;
    email: string;
    addr: string;
}
class Join extends Component<Props, object>{
    public user(){
        alert("aa")
    }

    public render() {
        return <div>
            <b>아이디 : </b>
            <input type='text'/>
            <br/>
            <b>비밀번호 : </b>
            <input type='text'/>
            <br/>
            <b>이메일 : </b>
            <input type='text'/>
            <br/>
            <b>주소 : </b>
            <input type='text'/>
            <br/>
            <input type='button' onClick={this.user} value="회원가입"/>

        </div>;
    }
}
export default Join