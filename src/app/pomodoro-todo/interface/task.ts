export interface Task {
  id: number;
  name: string;
  pCount: number;
  pCurrent: number;
  inProgress: boolean;
  done: boolean;
}
