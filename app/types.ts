export type User = {
    id: string,
    name: string,
    photo: string,
    polls?: Poll[],
  }
  
  export type Poll = {
    id: string,
    title: string,
    question?: string,
    choices?: string[],
    votes?: Vote[],
  }
  
  export type Vote = {
    userId: number,
    reason?: string,
    choiceIndex: number,
  }
  