export interface ReadUserDto {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    permissionLevel?: number;
}