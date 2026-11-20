import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Reservations_DTO } from './Models/DTOs/Reservation.DTO.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getIndex() {
  }

  @Post()
  @Render("index")
  postIndex(@Body() body:Reservations_DTO) {
    const isErr = false
    const isNameErr = false
    const isEmailErr = false
    const isDateErr = false
    const isGuestsErr = false
    console.log(body)
  }
}
