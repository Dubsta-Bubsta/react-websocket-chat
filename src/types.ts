export type WSMessageData = {
    "status": number
    "body": MessageType | string
    "action": WSMessageActionEnum
}
export type MessageType = {
    readonly id: number
    username: string
    content: string
}
export enum WSMessageActionEnum {
    create = "create",
    update = "update",
    delete = "delete",
}