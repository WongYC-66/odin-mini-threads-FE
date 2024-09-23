'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"


export default function ProfileTabs(props) {

    const { threads, replies } = props.profile

    console.log(threads)
    // console.log(replies)

    return (
        <Tabs defaultValue="threads" className="h-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="threads">Threads</TabsTrigger>
                <TabsTrigger value="replies">Replies</TabsTrigger>
                <TabsTrigger value="reposts">Reposts</TabsTrigger>
            </TabsList>

            <TabsContent value="threads">
            </TabsContent>

            <TabsContent value="replies">
            </TabsContent>

            <TabsContent value="reposts">
                <p>no reposts yet</p>
            </TabsContent>
        </Tabs>
    );
}
