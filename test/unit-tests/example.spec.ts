import { TestFixture, Test, Expect } from "alsatian";

@TestFixture("example tests")
export default class ExampleTests {

    @Test("two plus two make four")
    public twoPlusTwoMakeFour() {
        Expect(2 + 2).toBe(4);
    }
}