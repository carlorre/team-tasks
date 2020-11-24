export interface ITask {
  complete: boolean,
  date: string,
  id: string,
  text: string,
}

export interface IList {
  id: string,
  owner: string,
  title: string,
  sharedWith: string[],
  tasks: ITask[],
}