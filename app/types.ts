export type User = {
    id: string,
    name: string,
    photo: string,
    polls?: Poll[],
  }
  
  export type Poll = {
    id: string,
    title: string,
    choices?: string[],
    votes?: Vote[],
  }
  
  export type Vote = {
    user: User,
    reason: string,
    vote_index: number,
  }
  