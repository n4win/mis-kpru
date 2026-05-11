// import NextAuth, { CredentialsSignin } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { UserService } from "@/services";

// class AuthError extends CredentialsSignin {
//   constructor(code: string) {
//     super(code);
//     this.code = code;
//   }
// }

// const DEFAULT_ERROR_MESSAGE = "เกิดข้อผิดพลาดจากระบบ กรุณาลองใหม่อีกครั้ง";

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   trustHost: true,
//   secret: process.env.AUTH_SECRET,
//   session: {
//     strategy: "jwt",
//     maxAge: 24 * 60 * 60, // 24 ชั่วโมง
//     updateAge: 0, // ไม่ต่อเวลาเพิ่มเติม
//   },
//   pages: {
//     signIn: "/login",
//   },
//   providers: [
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const username = String(credentials.username);
//         const password = String(credentials.password);

//         try {
//           const res = await UserService.loginUser({ username, password });

//           if (res.success && res.data) {
//             return {
//               id: String(res.data.id),
//               username: res.data.username,
//               firstname: res.data.firstName,
//               lastname: res.data.lastName,
//               token: res.data.jwt,
//               depId: res.data.depId ?? "",
//               depName: res.data.depName ?? "",
//               roleId: res.data.roleId,
//               roleName: res.data.roleName,
//             };
//           }

//           throw new AuthError(res.message);
//         } catch (error) {
//           if (error instanceof AuthError) throw error;

//           const message =
//             error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;

//           throw new AuthError(message || DEFAULT_ERROR_MESSAGE);
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.username = user.username;
//         token.firstname = user.firstname;
//         token.lastname = user.lastname;
//         token.depId = user.depId;
//         token.depName = user.depName;
//         token.roleId = user.roleId;
//         token.roleName = user.roleName;
//         token.token = user.token;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token && session.user) {
//         session.user.id = token.id as string;
//         session.user.username = token.username;
//         session.user.firstname = token.firstname;
//         session.user.lastname = token.lastname;
//         session.user.depId = token.depId;
//         session.user.depName = token.depName;
//         session.user.roleId = token.roleId;
//         session.user.roleName = token.roleName;
//         session.user.token = token.token;
//       }
//       return session;
//     },
//   },
// });
