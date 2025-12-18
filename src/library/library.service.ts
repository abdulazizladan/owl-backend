import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { BorrowingRecord } from './entities/borrowing-record.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BorrowBookDto } from './dto/borrow-book.dto';

@Injectable()
export class LibraryService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
        @InjectRepository(BorrowingRecord)
        private borrowingRepository: Repository<BorrowingRecord>,
    ) { }

    // --- Books ---
    createBook(createBookDto: CreateBookDto) {
        const book = this.bookRepository.create(createBookDto);
        return this.bookRepository.save(book);
    }

    findAllBooks() {
        return this.bookRepository.find();
    }

    async findOneBook(id: number) {
        const book = await this.bookRepository.findOneBy({ id });
        if (!book) throw new NotFoundException(`Book #${id} not found`);
        return book;
    }

    async updateBook(id: number, updateBookDto: UpdateBookDto) {
        const book = await this.findOneBook(id);
        Object.assign(book, updateBookDto);
        return this.bookRepository.save(book);
    }

    removeBook(id: number) {
        return this.bookRepository.delete(id);
    }

    // --- Borrowing ---
    async borrowBook(borrowBookDto: BorrowBookDto) {
        const book = await this.findOneBook(borrowBookDto.bookId);

        if (book.quantity <= 0) {
            throw new BadRequestException('Book is out of stock');
        }

        // Decrement quantity
        book.quantity -= 1;
        await this.bookRepository.save(book);

        // Create record
        const record = this.borrowingRepository.create({
            ...borrowBookDto,
            borrowDate: new Date(),
            status: 'BORROWED'
        });
        return this.borrowingRepository.save(record);
    }

    async returnBook(recordId: number) {
        const record = await this.borrowingRepository.findOneBy({ id: recordId });
        if (!record) throw new NotFoundException('Borrowing record not found');

        if (record.status === 'RETURNED') {
            throw new BadRequestException('Book already returned');
        }

        record.returnDate = new Date();
        record.status = 'RETURNED';
        await this.borrowingRepository.save(record);

        // Increment quantity
        const book = await this.findOneBook(record.bookId);
        book.quantity += 1;
        await this.bookRepository.save(book);

        return record;
    }

    async findAllBorrowingRecords() {
        return this.borrowingRepository.find({ order: { borrowDate: 'DESC' } });
    }
}
