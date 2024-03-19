import prisma from "@/app/libs/prismadb";

export async function getAllUsers() {
    try {

        const users = await prisma.user.findMany({
            where: {
                role: "USER"
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        if (!users) {
            return null;
        }

        const safeAllUsers = users.map(
            (user) => ({
                ...user,
                createdAt: user.createdAt.toISOString(),
                updatedAt: user.updatedAt.toISOString(),
                emailVerified:
                    user.emailVerified?.toISOString() || null,
            })
        );

        return safeAllUsers;

    } catch (error: any) {
        console.log("Error", error);
        throw new Error()
    }
}