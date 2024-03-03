import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id?: string | null
    name?: string | null
    nickname?: string | null
    email?: string | null
    avatar?: string | null
    roles?: string[] | null
  }

  interface Session extends NextAuth.Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string | null
    name?: string | null
    nickname?: string | null
    email?: string | null
    avatar?: string | null
    roles?: string[] | null
  }
}