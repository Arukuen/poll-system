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
    userId: string,
    name?: string,
    photo?: string,
    reason?: string,
    choiceIndex: number,
    choiceName?: string
  }
  