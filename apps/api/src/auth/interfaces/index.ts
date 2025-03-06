export type Provider = "google"

export interface UserInfo {
  id: string
  email: string
  username: string
  avatar?: string
  provider: Provider
}

export interface GoogleResponse {
  sub: string
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: boolean
  locale: string
}

export interface Plan {
  name: string
  space: number
  collaborators: number
  private_repos: number
}