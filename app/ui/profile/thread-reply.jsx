'use client'

import Thread from './thread.jsx';
import Reply from './reply.jsx'

export default function ReplyWithThread(props) {
    const { Post } = props.reply

    return (
        <div className='border-solid border-t-2 '>

            {/* Original Thread section i.e post */}
            <div>
                <Thread thread={Post} setIsLoading={props.setIsLoading}/>
            </div>

            {/* Reply section i.e. comment*/}
            <div>
                <Reply reply={props.reply} setIsLoading={props.setIsLoading}/>
            </div>
        </div>
    );
}