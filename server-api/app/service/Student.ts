import { Service } from 'egg';

/**
 * Student Service
 */
export default class StudentService extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async getList(name: string) {
    return `hi, ${name}`;
  }
}
