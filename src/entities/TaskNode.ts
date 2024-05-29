import { Task } from '../types/Tasks'

export default class TaskNode {
  private head: Task
  private children: TaskNode[]

  constructor(head: Task) {
    this.head = head
    this.children = []
  }

  public getHead(): Task {
    return this.head
  }

  public getChildren(): TaskNode[] {
    return this.children
  }

  public addChild(child: Task): TaskNode {
    const taskNode = new TaskNode(child)
    this.children.push(taskNode)
    return taskNode
  }
}
