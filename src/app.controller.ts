import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Reservations_DTO } from './Models/DTOs/Reservation.DTO.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getIndex() {
  }

  @Post()
  @Render("index")
  postIndex(@Body() body: Reservations_DTO) {
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

    }
    console.log(body)
  }
}
