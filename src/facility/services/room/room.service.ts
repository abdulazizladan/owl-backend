import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Room } from 'src/facility/entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class RoomService {
    constructor( 
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>) {

    }

    /**
     * 
     * @param createRoomDto 
     * @returns 
     */
    create(createRoomDto: any) {
        try { 
            return this.roomRepository.save(createRoomDto);
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
        
    }

    update(id: number) {
        
        return 'This action updates a #room';
    }

    /**
     * 
     * @returns - list of all rooms
     */
    async getAll() {
        const rooms = await this.roomRepository.find();
        try {
            if (rooms.length === 0) {
                return {
                    success: true,
                    data: null,
                    message: "No records found"
                }
            }else {
                return {
                    success: true,
                    data: rooms,
                    message: "Records found"
                }
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    /**
     * 
     * @param id - Room ID
     * @returns - Room object
     */
    async findOne(id: number) {
        try {
            const room = await this.roomRepository.findOne({where: { id }});
        }catch (error) {
            return {
                success: false,
                message: error.message
                }
        }
        return 'This action returns a #room';
    }

    /**
     * 
     * @param id - id of the room to delete
     * @returns - success message
     */
    async remove(id: number) {
        try {
            await this.roomRepository.delete(id);
            return {
                success: true,
                message: "Room deleted successfully"
            }
        }catch(error){
            return {
                success: false,
                message: error.message
                }
        }
        
    }
}
