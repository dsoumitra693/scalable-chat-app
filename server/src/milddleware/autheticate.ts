import { Socket } from "socket.io";
import { getAccount } from "../services/appwriteService";

export const authenticate = async (socket: Socket, next: (err?: Error) => void) => {
    try {
        const token = socket.handshake.query.token as string;
        const user = await getAccount(token);

        if (user) {
            socket.handshake.auth = {
                userId: user.$id,
                phoneNumber: user.phone,
            };
            return next();
        }

        throw new Error("Authentication failed");
    } catch (error) {
        return next(new Error("Authentication failed"));
    }
};
