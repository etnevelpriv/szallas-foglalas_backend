import { Body, Controller, flatten, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Reservations_DTO } from './Models/DTOs/Reservation.DTO.js';
import { Count_interface } from './Models/Interfaces/Count.Interface.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  async getIndex() {
    const count  = await this.appService.getReservationsCount()
    console.log(count)
    return {
      count:count,

      errMess: null,
      errNameMess: null,
      errEmailMess: null,
      errGuestsMess: null,
      errDateMess: null,

      nameValue: null,
      dateValue: null,
      emailValue: null,
      guestsValue: null,

      success: false
    }

  }

  @Post()
  @Render("index")
  async postIndex(@Body() body: Reservations_DTO) {
    let isErr = false
    let isNameErr = false
    let isEmailErr = false
    let isDateErr = false
    let isGuestsErr = false
    const errMess = "Az urlap bekuldese soran egy, vagy tobb mezot hibasan toltott ki."
    const errNameMess = "A nev mezo kitoltese kotelezo"
    const errEmailMess = "Hibas email formatum"
    const errDateMess = "A datum mezo kitoltese kotelezo es kizarolag jovobeni idot adhat meg."
    const errGuestsMess = "A vendegek szama mezo kitoltese kotelezo, minimum 1, maximum 10 vendeget adhat meg."

    if (body.name.trim() === "" || typeof body.name != "string") {
      isErr = true;
      isNameErr = true;
    };
    if (typeof body.date != "string" || body.date.trim() === "" || new Date(body.date) < new Date()) {
      isErr = true;
      isDateErr = true;
    }
    if (typeof body.guests != "string" || body.guests.trim() === "" || Number(body.guests) < 1 || Number(body.guests) > 10 || Number(body.guests) == null || Number.isNaN(Number(body.guests))) {
      isErr = true;
      isGuestsErr = true;
    };

    const emailRegex = new RegExp(/^[a-z\d]{1,}@[a-z]{1,}\.[a-z]{1,}$/);
    if (emailRegex.test(body.email) == false) {
      isErr = true;
      isEmailErr = true;
    }

    if (!isErr) {
      const response = await this.appService.postReservationToDb({
        name: body.name,
        email: body.email,
        date: new Date(body.date),
        guests: Number(body.guests)
      });
    };

    return {
      errMess: isErr ? errMess : null,
      errNameMess: isNameErr ? errNameMess : null,
      errEmailMess: isEmailErr ? errEmailMess : null,
      errGuestsMess: isGuestsErr ? errGuestsMess : null,
      errDateMess: isDateErr ? errDateMess : null,

      nameValue: isErr ? body.name : null,
      dateValue: isErr ? body.date : null,
      emailValue: isErr ? body.email : null,
      guestsValue: isErr ? body.guests : null,

      success: (!isErr)
    }
  }
}
