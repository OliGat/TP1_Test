let Util = {};
Util.factorial = (n) => {
    if (n === 0) {
        return 1;
    }

    if (n >= 3000) {
        throw 'n too large'
    }

    if (n < 0) {
        throw 'n is negative'
    }

    return n * Util.factorial(n - 1);
};

/**
 * Détermine si n est un nombre premier.
 * Util.isPrime(5) => false
 * Util.isPrime(6) => true
 *
 * @param {number} n
 * @returns {boolean}
 */
Util.isPrime = function (n) {
    if (n === 1 || n === 0) {
        return false;
    }
    if (n < 0) {
        throw 'Unable to compute prime for n < 0'
    }
    for (let i = 2; i < n; i++)
        if (n % i === 0) return false;
    return true;

};


/**
 * Additionne l'ensemble des nombres premiers de 2 à n
 *
 * Util.sumPrime(6) = 2 + 3 + 5 = 10
 * Util.sumPrime(8) = 2 + 3 + 5 + 7 = 17
 *
 * @param {number} n
 * @returns {number}
 */
Util.sumPrime = function (n) {
    if (n < 0) {
        throw 'Unable to compute sumprime for n < 0'
    }
    let sum = 0;
    for (let i = 0; i < n; i++) {
        if (Util.isPrime(i)) {
            sum += i;
        }
    }
    return sum;
};

/**
 * Cette méthode doit retourner un tableau de 1 à n tel que:
 * - Pour les nombres multiples de 3, les remplacer par "Fizz"
 * - Pour les nombres multiples de 5, les remplacer par "Buzz"
 * - Pour les nombres multiples de 3 et 5, les remplacer par "FizzBuzz"
 *
 * Exp :
 * Util.fizzBuzz(15) => [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]
 *
 * @param {number} n
 * @returns {array}
 */
Util.fizzBuzz = function (n) {
    if (n <= 0) throw "Le nombre ne respecte pas les données d'entres";
    let result = [];
    for (let i = 1; i <= n; i++) {
        if ((i % 15) === 0) result.push("FizzBuzz");
        else if ((i % 5) === 0) result.push("Buzz");
        else if ((i % 3) === 0) result.push("Fizz");
        else result.push(i);
    }
    return result;
};

/**
 * Chiffre une phrase selon la règle suivante : Les A deviennent des B, les B des C, etc.
 *
 * Exp :
 * Util.cipher("Test Unitaire") => "Uftu Vojubjsf"
 *
 * @param phrase
 * @returns {string}
 */
Util.cipher = function (phrase) {
    if (phrase.length === 0) throw "La chaine est vide";

    if (/[1-9]/.test(phrase)) throw "Cette fonction ne gere pas les nombres";

    let result = "";

    for (let phraseElement of phrase) {
        if (phraseElement === "Z") result += "A";
        else if (phraseElement === "z") result += "a";
        else if (phraseElement === " ") result += phraseElement;
        else {
            result += String.fromCharCode(phraseElement.charCodeAt(0) + 1);
        }
    }

    return result;

};


module.exports = Util;

