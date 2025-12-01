import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {dbConnection} from "@/app/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {
                const { email, password } = credentials;
                await dbConnection();

                const user = await User.findOne({ email });
                if (!user) throw new Error("No user found");

                const valid = await bcrypt.compare(password, user.password);
                if (!valid) throw new Error("Invalid password");

                return { id: user._id, name: user.name, email: user.email, role: user.role };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user){
                token.role = user.role;
            token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.role = token.role;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
