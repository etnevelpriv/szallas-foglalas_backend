import { Injectable } from '@nestjs/common';
import { createPool, Pool } from 'mysql2/promise';
import { Reservation_interface } from './Models/Interfaces/Reservation.Interface.js';

@Injectable()
export class AppService {
  myPool:Pool;
  constructor() {
    this.myPool = createPool({
      host:"127.0.0.1",
      port:24818,
      user: "root",
      password:"root",
      database:"reservations13e"
    });
  }
  async postReservationToDb(reservation:Reservation_interface) {
    this.myPool.execute(
      "INSERT INTO reservations (name,email,startDate,guests) VALUES(?,?,?,?)",
      [reservation.name,reservation.email,reservation.date,reservation.guests]
    );
  }
  getHello(): string {
    return 'Hello World!';
  }
}
