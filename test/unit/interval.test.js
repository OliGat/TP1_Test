const Interval = require('../../src/interval');



describe('overlaps', function () {

    test("Test overlap avec interval1(10,20) et interval2(15,25) => true", () => {
        let interval1 = new Interval(10,20);
        let interval2 = new Interval(15,25);
        expect(interval1.overlaps(interval2)).toBe(true);
    });

    test("Test overlap avec interval1(10,20) et interval2(25,35) => false", () => {
        let interval1 = new Interval(10,20);
        let interval2 = new Interval(25,35);
        expect(interval1.overlaps(interval2)).toBe(false);
    });

    test("Test overlap avec interval1(25,35) et interval2(10,20) => false", () => {
        let interval1 = new Interval(25,35);
        let interval2 = new Interval(10,20);
        expect(interval1.overlaps(interval2)).toBe(false);
    });

    test("Test overlap avec interval1(5,25) et interval2(10,20) => false", () => {
        let interval1 = new Interval(5,25);
        let interval2 = new Interval(10,20);
        expect(interval1.overlaps(interval2)).toBe(true);
    });

    test("Test overlap avec interval1(15,25) et interval2(10,20) => true", () => {
        let interval1 = new Interval(15,25);
        let interval2 = new Interval(10,20);
        expect(interval1.overlaps(interval2)).toBe(true);
    });


});

describe('includes', function () {

    test("Test includes avec interval1(5,25) et interval2(10,20) => true", () => {
        let interval1 = new Interval(5,25);
        let interval2 = new Interval(10,20);
        expect(interval1.includes(interval2)).toBe(true);
    });

    test("Test includes avec interval1(5,25) et interval2(5,25) => false", () => {
        let interval1 = new Interval(5,25);
        let interval2 = new Interval(5,25);
        expect(interval1.includes(interval2)).toBe(false);
    });

    test("Test includes avec interval1(5,25) et interval2(5,24) => false", () => {
        let interval1 = new Interval(5,25);
        let interval2 = new Interval(5,24);
        expect(interval1.includes(interval2)).toBe(false);
    });

    test("Test includes avec interval1(5,25) et interval2(6,25) => false", () => {
        let interval1 = new Interval(6,25);
        let interval2 = new Interval(5,25);
        expect(interval1.includes(interval2)).toBe(false);
    });

    test("Test includes avec interval1(10,20) et interval2(5,25) => false", () => {
        let interval1 = new Interval(10,20);
        let interval2 = new Interval(5,25);
        expect(interval1.includes(interval2)).toBe(false);
    });

    test("Test includes avec interval1(10,20) et interval2(5,15) => false", () => {
        let interval1 = new Interval(10,20);
        let interval2 = new Interval(5,15);
        expect(interval1.includes(interval2)).toBe(false);
    });

    test("Test includes avec interval1(10,20) et interval2(15,25) => false", () => {
        let interval1 = new Interval(10,20);
        let interval2 = new Interval(15,25);
        expect(interval1.includes(interval2)).toBe(false);
    });



});