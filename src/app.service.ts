import { Injectable } from '@nestjs/common';
import { createPool, Pool } from 'mysql2/promise';

@Injectable()
export class AppService {
  myPool:Pool;
  constructor() {
    this.myPool = createPool({
      host:"127.0.0.1",
      port:27693,
      user: "root",
      password:"root",
      database:"reservations"
    });
  }
  getHello(): string {
    return 'Hello World!';
  }
}
