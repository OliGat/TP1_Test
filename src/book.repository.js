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
//        let book = this.db.get('books').filter({name:bookName}).value();
//        return book;
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
    getCountBookAddedByMont(bookName) {
    }

}


module.exports = BookRepository;