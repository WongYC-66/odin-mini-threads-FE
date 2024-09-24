'use client'

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import Post from "../post/post"
import ReplyWithThread from "./thread-reply"

export default function ProfileTabs(props) {

    const { threads, replies } = props.profile

    return (
        <Tabs defaultValue="threads" className="h-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="threads">Threads</TabsTrigger>
                <TabsTrigger value="replies">Replies</TabsTrigger>
                <TabsTrigger value="reposts">Reposts</TabsTrigger>
            </TabsList>

            <TabsContent value="threads">
                {threads.map(thread => <Post key={thread.id} post={thread} setIsLoading={props.setIsLoading} />)}
            </TabsContent>

            <TabsContent value="replies">
                {replies.map(reply => <ReplyWithThread key={reply.id} reply={reply} setIsLoading={props.setIsLoading} />)}
            </TabsContent>

            <TabsContent value="reposts">
                <p className="text-center">repost feature not supported yet</p>
            </TabsContent>
        </Tabs>
    );
}
