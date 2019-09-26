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

describe('union', function () {

    test("Test union avec interval1(5,25) et interval2(10,20) => [interval(5,25)]", () => {
        let interval1 = new Interval(5,25);
        let interval2 = new Interval(10,20);
        expect(interval1.union(interval2)).toEqual([interval1]);
    });

    test("Test union avec interval1(5,10) et interval2(15,20) => [interval(5,10),interval(15,20)]", () => {
        let interval1 = new Interval(5,10);
        let interval2 = new Interval(15,20);
        expect(interval1.union(interval2)).toEqual([interval1,interval2]);
    });

    test("Test union avec interval1(15,20) et interval2(5,10) => [interval(15,20),interval(5,10)]", () => {
        let interval1 = new Interval(15,20);
        let interval2 = new Interval(5,10);
        expect(interval1.union(interval2)).toEqual([interval2,interval1]);
    });

    test("Test union avec interval1(5,25) et interval2(5,25) => [interval(5,25)]", () => {
        let interval1 = new Interval(5,25);
        let interval2 = new Interval(5,25);
        expect(interval1.union(interval2)).toEqual([interval1]);
    });
});

describe('intersection', function () {

    test("Test intersection avec interval1(5,25) et interval2(10,20) => [interval(10,20)]", () => {
        let interval1 = new Interval(5,25);
        let interval2 = new Interval(10,20);
        expect(interval1.intersection(interval2)).toEqual([interval2]);
    });

    test("Test intersection avec interval1(5,25) et interval2(10,30) => [interval(10,25)]", () => {
        let interval1 = new Interval(5,25);
        let interval2 = new Interval(10,30);
        expect(interval1.intersection(interval2)).toEqual([new Interval(10,25)]);
    });

    test("Test intersection avec interval1(5,15) et interval2(20,30) => []", () => {
        let interval1 = new Interval(5,15);
        let interval2 = new Interval(20,30);
        expect(interval1.intersection(interval2)).toEqual([]);
    });

    test("Test intersection avec interval1(20,30) et interval2(5,15) => []", () => {
        let interval1 = new Interval(20,30);
        let interval2 = new Interval(5,15);
        expect(interval1.intersection(interval2)).toEqual([]);
    });

    test("Test intersection avec interval1(10,30) et interval2(5,25) => [interval(10,25)]", () => {
        let interval1 = new Interval(10,30);
        let interval2 = new Interval(5,25);
        expect(interval1.intersection(interval2)).toEqual([new Interval(10,25)]);
    });

});