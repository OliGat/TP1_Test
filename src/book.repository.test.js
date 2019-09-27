const BookRepository = require('./book.repository');

describe('Book repository Save', function () {

    test('Save a book', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            push : jest.fn().mockReturnThis(),
            write : jest.fn().mockReturnThis()
        };
        const repository = new BookRepository(dbMock);
        repository.save({id: 1, name: "Unit test"});

        expect(dbMock.write.mock.calls.length).toBe(1);
    });
});

describe('Book repository getTotalCount', function () {

    test('getTotalCount', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            size : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(1)
        };
        const repository = new BookRepository(dbMock);


        expect(repository.getTotalCount()).toBe(1);
    });
});

describe('Book repository getTotalPrice', function () {

    test('getTotalPrice', () => {
        const bookMock = {
            price:10
        };
        const dbMock = {
            get : jest.fn().mockReturnThis(),
            size : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue([bookMock,bookMock])
        };
        const repository = new BookRepository(dbMock);
        expect(repository.getTotalPrice()).toBe(20);
    });

    test("Test when no book in db => Exception", () => {
        const dbMock = {
            get : jest.fn().mockReturnThis(),
            size : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(0)
        };
        const repository = new BookRepository(dbMock);
        expect(()=>{repository.getTotalPrice()}).toThrow("Il n'y a pas de livre en db");
    });

});

describe("Book repository getBookByName", function () {

    test("Test when bookname= \"\" => Exception",() => {
        const dbMock = {};
        const repository = new BookRepository(dbMock);
        expect(()=>{repository.getBookByName("")})
            .toThrow('Le titre du livre ne peut être vide');
    });

    test("Test when bookname= \" \" => Exception",() => {
        const dbMock = {};
        const repository = new BookRepository(dbMock);
        expect(()=>{repository.getBookByName(" ")})
            .toThrow('Le titre du livre ne peut être vide');
    });

    test("Test when bookname= undefined => Exception",() => {
        const dbMock = {};
        const repository = new BookRepository(dbMock);
        expect(()=>{repository.getBookByName()})
            .toThrow('Le paramètre n\'est pas valide');
    });
    test("Test when bookname = \"\" => book",() => {
        const book = {id: 1, name: "Unit test"}
        const dbMock = {
            get: jest.fn().mockReturnThis(),
            filter: jest.fn().mockReturnThis(),
            value: jest.fn().mockReturnValue(book)
        };
        const repository = new BookRepository(dbMock);
        expect(repository.getBookByName(book.name)).toEqual(book);
    });

});