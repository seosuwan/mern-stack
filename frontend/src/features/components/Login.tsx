import React, {Component} from "react";
class Join extends Component<any, any>{
    public render() {
        return <div>
            <b>아이디 : </b>
            <input type='text'/>
            <br/>
            <b>비밀번호 : </b>
            <input type='text'/>
            <br/>
            <input type='button' value="로그인"/>
        </div>;
    }
}
export default Join