const BookRepository = require('./book.repository');
const db = require('./db')

const repository = new BookRepository(db);

const nameBook = "Test_" + Math.round(Math.random()*10000);

const  month = (Math.round(Math.random()*10)+1).toLocaleString(undefined,{minimumIntegerDigits:2});


repository.save({
    'id' : 1,
    "name" : nameBook,
    'price' :Math.round(Math.random()*100),
    "added_at" : '2019-'+month+'-01'
});

console.log("Nombre de livres en bd : " + repository.getTotalCount());

console.log("Somme du prix de tous les livres : " + repository.getTotalPrice());

console.log("Retourne un livre : \n");
console.log(repository.getBookByName(nameBook));

console.log("Nombre de livre ajouté par mois : \n");
console.log(repository.getCountBookAddedByMonth());

console.log("Nombre de livre 'Test' ajouté par mois : \n");
console.log(repository.getCountBookAddedByMont("test"));