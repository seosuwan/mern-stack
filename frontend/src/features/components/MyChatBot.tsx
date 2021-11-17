import React, {useState} from "react";
// @ts-ignore
import ChatBot from 'react-simple-chatbot';


const MyChatBot = () => {
    const [name,setName] = useState({})

        return (
            <div>
                <h1>챗봇</h1>
                <ChatBot
                    // steps 챗봇의 시나리오를 작성한다.
                    steps={[
                        {
                            id: '1',
                            message: '이름을 알려주세요.',
                            // trigger는 다음 이동해야 할 시나리오를 가져온다.
                            trigger: 'name',
                        },
                        {
                            id: 'name',
                            // user에 true넣으면 값이 입력 된다.
                            user: true,
                            validator: (va:string) => {
                                setName(va)
                                if (va === '') {
                                    setName(va)
                                    return 'value should be a number';
                                }
                                return true;
                            },
                            trigger: '2',
                        },
                        {
                            id: '2',
                            component: (
                                <div> '안녕하세요. {name}님, 만나서 반갑습니다.'</div>
                            ),
                            end: true,
                        },
                    ]}

                />
            </div>
        );

}
export default MyChatBot