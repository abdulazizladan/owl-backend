import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LibraryService } from './library.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BorrowBookDto } from './dto/borrow-book.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/enums/user-role.enum';

@ApiTags('Library (Librarian)')
@Controller('library')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class LibraryController {
    constructor(private readonly libraryService: LibraryService) { }

    // --- Books ---
    @Post('books')
    @Roles(UserRole.STAFF, UserRole.ADMIN)
    @ApiOperation({ summary: 'Add a new book' })
    createBook(@Body() createBookDto: CreateBookDto) {
        return this.libraryService.createBook(createBookDto);
    }

    @Get('books')
    @Roles(UserRole.STAFF, UserRole.ADMIN, UserRole.STUDENT)
    @ApiOperation({ summary: 'Get all books' })
    findAllBooks() {
        return this.libraryService.findAllBooks();
    }

    @Patch('books/:id')
    @Roles(UserRole.STAFF, UserRole.ADMIN)
    @ApiOperation({ summary: 'Update book details' })
    updateBook(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
        return this.libraryService.updateBook(+id, updateBookDto);
    }

    @Delete('books/:id')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Remove a book' })
    removeBook(@Param('id') id: string) {
        return this.libraryService.removeBook(+id);
    }

    // --- Borrowing ---
    @Post('borrow')
    @Roles(UserRole.STAFF, UserRole.ADMIN)
    @ApiOperation({ summary: 'Borrow a book for a student' })
    borrowBook(@Body() borrowBookDto: BorrowBookDto) {
        return this.libraryService.borrowBook(borrowBookDto);
    }

    @Post('return/:id')
    @Roles(UserRole.STAFF, UserRole.ADMIN)
    @ApiOperation({ summary: 'Return a book (by borrowing record ID)' })
    returnBook(@Param('id') id: string) {
        return this.libraryService.returnBook(+id);
    }

    @Get('borrowing-history')
    @Roles(UserRole.STAFF, UserRole.ADMIN)
    @ApiOperation({ summary: 'Get all borrowing history' })
    getHistory() {
        return this.libraryService.findAllBorrowingRecords();
    }
}
