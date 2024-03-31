import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
@Injectable()
export class CommonService {
  private lastId: number;

  constructor() {
    try {
      const data = fs.readFileSync('lastId.txt', 'utf8');
      this.lastId = parseInt(data, 10);
    } catch (err) {
      this.lastId = 0;
    }
  }

  generateId(): number {
    this.lastId++;
    fs.writeFileSync('lastId.txt', this.lastId.toString());
    return this.lastId;
  }
}
