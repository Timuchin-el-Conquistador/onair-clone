import { type User } from "./user";



export interface Settings{
    user:User,
    monthlyMinutesCapacity:number
    monthlyMinutesConsumed:number
    browserNotifications:boolean
}