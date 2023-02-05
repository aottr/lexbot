import Logger from './logger';

/**
 *  Schedule handler to plan events
 *
 * @author AlexOttr <alex@ottr.one>
 * @version 2.0
 *
 * @exports Scheduler
 */
export class Scheduler {
  private tasks: Map<string, Task>;
  private static instance: Scheduler;

  private constructor() {
    this.tasks = new Map<string,Task>();

    setInterval(
    () => {
      this.tasks.forEach((task, name) => {
        if (task.date <= Date.now()) this.handleTask(task);
      });
    },
    1 * 1000)
  }

  private handleTask(task: Task) {
    task.callback();
    Logger.get('Scheduler').info(`Executed task: ${task.name}`);
    if (task.timeout) task.date = Date.now() + task.timeout;
    else this.tasks.delete(task.name)
  }

  public add(task: Task) {
    this.tasks.set(task.name, task);
  }

  public remove(name: string) {
    this.tasks.delete(name)
  }

  public static getInstance() {
    if (!Scheduler.instance) Scheduler.instance = new Scheduler();
    return Scheduler.instance;
  }
}

export interface Task {
  name: string;
  callback: Function;
  date: number;
  timeout?: number;
}