import { sumArray } from "bluejay";

test("access to native Rust code", () => {
  expect(sumArray([1, 2, 3])).toBe(6);
});
