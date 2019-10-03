const _ = require('lodash');

class BookRepository {

    /**
     * @param db
     */
    constructor(db) {
        this.db = db;
    }

    save (book) {
        this.db.get('books').push(book).write();
    }

    /**
     * Nombre total de livre
     */
    getTotalCount() {
        let count = this.db.get('books').size().value();
        return count;
    }

    /**
     * Somme du prix de tous les livre
     */
    getTotalPrice() {
        let totalPrice = 0;

        if(this.db.get('books').size().value()===0){
            throw "Il n'y a pas de livre en db";
        }

        for (let book of this.db.get('books').value()){
            totalPrice += book.price;
        }
        return Math.round(totalPrice);
    }


    /**
     * Retourne un livre
     */
    getBookByName(bookName) {

        if(typeof bookName === "undefined"){
            throw 'Le paramètre n\'est pas valide';
        }
        if(bookName==="" || bookName===" "){
            throw 'Le titre du livre ne peut être vide';
        }

        let book = this.db.get('books').filter({name:bookName}).value();

        return book;
    }

    /**
     * Nombre de livre ajouté par mois
     *
     *  [
     *      {
     *          year: 2017,
     *          month, 2,
     *          count, 129,
     *          count_cumulative: 129
     *      },
     *      {
     *          year: 2017,
     *          month, 3,
     *          count, 200,
     *          count_cumulative: 329
     *      },
     *      ....
     *  ]
     */

    getCountBookAddedByMonth() {

        if(this.db.get('books').size().value()===0){
            throw "Il n'y a pas de livre en db";
        }

        let sum = 0;
        const test = _(this.db.get('books').value());

        return test.groupBy(x=>x.added_at.slice(0,7))
            .map((val, key) => {
                return {
                    year : key.slice(0,4),
                    month: key.slice(5,7),
                    count: val.length,
                    count_cumulative: sum+=val.length
                };
            }).value();

    }
    getCountBookAddedByMont(bookName) {

        if(bookName === undefined){
            throw 'Le paramètre n\'est pas valide';
        }
        if(bookName==="" || bookName===" "){
            throw 'Le titre du livre ne peut être vide';
        }
        if(this.db.get('books').size().value()===0){
            throw "Il n'y a pas de livre en db";
        }


        let sum = 0;
        const test = _(this.db.get('books').value())
            .filter({name:bookName})
            .sortBy('added_at')
            .groupBy(x=>x.added_at.slice(0,7))
            .map(function (val, key) {
                return {
                    year : key.slice(0,4),
                    month: key.slice(5,7),
                    count: val.length,
                    count_cumulative: sum+=val.length
                };

            }).value();

        return test;
    }
}



module.exports = BookRepository;