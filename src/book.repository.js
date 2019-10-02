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

    getCountBookAddedByMont(bookName) {

        let countBookTab = [];

        if(typeof bookName === "undefined"){
            throw 'Le paramètre n\'est pas valide';
        }
        if(bookName==="" || bookName===" "){
            throw 'Le titre du livre ne peut être vide';
        }

        if(this.db.get('books').size().value()===0){
            throw "Il n'y a pas de livre en db";
        }

        let map = new Map();
        let currentA, dateSplit;
        let annee, month;
        let books = this.db.get('books').filter({name:bookName}).sortBy('added_at').value();
        for (let book of books){
            dateSplit = book.added_at.split('-');
            annee = dateSplit[0];
            month = dateSplit[1];
            currentA = map.get(annee);
            if(currentA === undefined){
                currentA = new Map();
                map.set(annee, currentA);
            }
            if(currentA.get(month) === undefined){
                currentA.set(month,1);
            }
            else {
                currentA.set(month,currentA.get(month)+1);
            }
        }

        countBookTab = this.updateOut(map);

        return countBookTab;

    }


    getCountBookAddedByMonth() {

        let countBookTab = [];

        if(this.db.get('books').size().value()===0){
            throw "Il n'y a pas de livre en db";
        }

        let map = new Map();
        let currentA, dateSplit;
        let annee, month;
        let books = this.db.get('books').sortBy('added_at').value();
        for (let book of books){
            dateSplit = book.added_at.split('-');
            annee = dateSplit[0];
            month = dateSplit[1];
            currentA = map.get(annee);
            if(currentA === undefined){
                currentA = new Map();
                map.set(annee, currentA);
            }
            if(currentA.get(month) === undefined){
                currentA.set(month,1);
            }
            else {
                currentA.set(month,currentA.get(month)+1);
            }
        }

        countBookTab = this.updateOut(map);

        return countBookTab;
    }

    updateOut(map) {
        let countBookTab = [];
        let cumulBooks;
        map.forEach(function (valueMap, keyMap) {
            cumulBooks = 0;
            valueMap.forEach(function (valueMois, keyMois) {
                cumulBooks += valueMois;
                countBookTab.push({
                    year: keyMap,
                    month: keyMois,
                    count: valueMois,
                    count_cumulative: cumulBooks
                });
            });
        });
        return countBookTab;
    }

}


module.exports = BookRepository;