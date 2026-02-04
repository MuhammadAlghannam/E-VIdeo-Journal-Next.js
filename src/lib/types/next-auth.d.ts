import type { DefaultSession, DefaultUser } from "next-auth"
import type { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
  * Returned by useSession, getSession and received as a prop on the SessionProvider React Context
  */
  interface Session extends DefaultSession {
    user: (AdapterUser & ApiUser)
    token?: string
  }
  /**
  * The shape of the user object returned in the OAuth providers' profile callback,
  * or the second parameter of the session callback, when using a database.
  */
  interface User extends DefaultUser {
    id: string
    token: string
    user: ApiUser
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string
    accessToken?: string
    user?: ApiUser
  }
}