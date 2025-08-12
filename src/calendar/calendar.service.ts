import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity'

@Injectable()
export class CalendarService {
    constructor(
        @InjectRepository(Event)
        private eventsRepository: Repository<Event>,
      ) {}
    
      /**
   * Retrieves all events.
   * @returns A promise that resolves to an array of all events.
   */
  async findAll(): Promise<Event[]> {
    return this.eventsRepository.find({ relations: ['term'] });
  }

  /**
   * Finds a single event by its ID.
   * @param id The UUID of the event.
   * @returns A promise that resolves to the found event.
   * @throws NotFoundException if the event with the given ID does not exist.
   */
  async findOne(id: string): Promise<Event> {
    const event = await this.eventsRepository.findOne({ where: { id }, relations: ['term'] });
    if (!event) {
      throw new NotFoundException(`Event with ID "${id}" not found.`);
    }
    return event;
  }

  /**
   * Creates a new event.
   * @param createEventDto The event data to be created.
   * @returns A promise that resolves to the newly created event.
   */
  async create(createEventDto: CreateEventDto): Promise<Event> {
    const newEvent = this.eventsRepository.create({
      ...createEventDto,
      term: { id: createEventDto.termId } as any,
    });
    return this.eventsRepository.save(newEvent);
  }

  /**
   * Updates an existing event.
   * @param id The UUID of the event to update.
   * @param updateEventDto The new event data.
   * @returns A promise that resolves to the updated event.
   * @throws NotFoundException if the event with the given ID does not exist.
   */
  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    await this.eventsRepository.update(id, updateEventDto);
    const updatedEvent = await this.findOne(id);
    return updatedEvent;
  }

  /**
   * Deletes an event.
   * @param id The UUID of the event to delete.
   * @returns A promise that resolves when the event is successfully deleted.
   * @throws NotFoundException if the event with the given ID does not exist.
   */
  async remove(id: string): Promise<void> {
    const result = await this.eventsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Event with ID "${id}" not found.`);
    }
  }
}
