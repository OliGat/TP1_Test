const BookRepository = require('../../src/book.repository');

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

    test("Test when db is Empty => Exception", () => {
       const dbMock = {
           get: jest.fn().mockReturnThis(),
           size: jest.fn().mockReturnThis(),
           value: jest.fn()
               .mockReturnValue(0)};
       const repository = new BookRepository(dbMock);
       expect(() => {repository.getBookByName("Unit test")})
           .toThrow('La base est vide');
    });

    test("Test when bookname = \"Unit test\" => book",() => {
        const book = {name: "Unit test2"};
        const book2 = {name: "Unit test2"};
        const book3 = {name: "Unit test"};
        const dbMock = {
            get: jest.fn().mockReturnThis(),
            size: jest.fn().mockReturnThis(),
            value: jest.fn()
                .mockReturnValue(3)
                .mockReturnValue([book,book2,book3])
        };
        const repository = new BookRepository(dbMock);
        expect(repository.getBookByName(book.name)).toEqual(book);
    });

    test("Test when bookname = \"Unit test\" => Exception",() => {
        const book1 = {name: "Unit test1"};
        const book2 = {name: "Unit test2"};
        const dbMock = {
            get: jest.fn().mockReturnThis(),
            size: jest.fn().mockReturnThis(),
            value: jest.fn()
                .mockReturnValue(2)
                .mockReturnValue([book1,book2])
        };
        const repository = new BookRepository(dbMock);
        expect(repository.getBookByName("Unit test")).not.toBeDefined();
    });

});

describe("Book repository getCountBookAddedByMonth", function () {

    test("Test when no book in db => Exception", () => {
        const dbMock = {
            get : jest.fn().mockReturnThis(),
            size : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(0)
        };
        const repository = new BookRepository(dbMock);
        expect(()=>{repository.getCountBookAddedByMonth()})
            .toThrow("Il n'y a pas de livre en db");
    });

    test("Test  => {}",() => {
        const book = {added_at: "2019-01-01"};
        const book1 = {added_at: "2019-02-01"};
        const book2 = {added_at: "2019-02-01"};
        const result = [
                {
                    year: '2019', month: '01', count: 1, count_cumulative: 1
                },
                {
                    year: '2019', month: '02', count: 2, count_cumulative: 3
                }
            ];
        const dbMock = {
            get: jest.fn().mockReturnThis(),
            size: jest.fn().mockReturnThis(),
            sortBy: jest.fn().mockReturnThis(),
            value: jest.fn().mockReturnValue([book,book1,book2])
        };
        const repository = new BookRepository(dbMock);
        expect(repository.getCountBookAddedByMonth()).toEqual(result);
    });
});

describe("Book repository getCountBookAddedByMont", function () {

    test("Test when no book in db => Exception", () => {
        const dbMock = {
            get : jest.fn().mockReturnThis(),
            size : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(0)
        };
        const repository = new BookRepository(dbMock);
        expect(()=>{repository.getCountBookAddedByMont("Test")})
            .toThrow("Il n'y a pas de livre en db");
    });

    test("Test when bookname= \" \" => Exception",() => {
        const dbMock = {};
        const repository = new BookRepository(dbMock);
        expect(()=>{repository.getCountBookAddedByMont(" ")})
            .toThrow('Le titre du livre ne peut être vide');
    });

    test("Test when bookname= undefined => Exception",() => {
        const dbMock = {};
        const repository = new BookRepository(dbMock);
        expect(()=>{repository.getCountBookAddedByMont()})
            .toThrow('Le paramètre n\'est pas valide');
    });

    test("Test  => {}",() => {
        const nameBookTest = "Unit test";
        const book = {name: nameBookTest, added_at: "2019-01-01"};
        const book1 = {name: nameBookTest, added_at: "2019-02-01"};
        const book2 = {name: nameBookTest, added_at: "2019-02-01"};
        const book3 = {name: nameBookTest, added_at: "2018-02-01"};
        const book4 = {name: "Unit test2", added_at: "2017-02-01"};
        const result = [
            {
                year: '2018', month: '02', count: 1, count_cumulative: 1
            },
            {
                year: '2019', month: '01', count: 1, count_cumulative: 2
            },
            {
                year: '2019', month: '02', count: 2, count_cumulative: 4
            }
        ];
        const dbMock = {
            get: jest.fn().mockReturnThis(),
            size: jest.fn().mockReturnThis(),
            value: jest.fn().mockReturnValue([book,book1,book2,book3,book4])
        };
        const repository = new BookRepository(dbMock);
        expect(repository.getCountBookAddedByMont("Unit test")).toEqual(result);
    });
});