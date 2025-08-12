import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Term } from './entities/term.entity';
import { Holiday } from './entities/holiday.entity';
import { AcademicSession } from './entities/academic-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Term, Holiday, AcademicSession])],
  providers: [CalendarService],
  controllers: [CalendarController]
})
export class CalendarModule {}
