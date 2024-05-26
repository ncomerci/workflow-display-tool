import { Task } from "../types/Workflow";

export default class Workflow {
  private head: Task;
  private children: Workflow[];

  constructor(head: Task) {
    this.head = head;
    this.children = [];
  }

  public getHead(): Task {
    return this.head;
  }

  public getChildren(): Workflow[] {
    return this.children;
  }

  public addChild(child: Task): Workflow {
    const workflow = new Workflow(child);
    this.children.push(workflow);
    return workflow;
  }

  public getNodes(): Task[] {
    return [this.head, ...this.children.flatMap(child => child.getNodes())];
  }
}