const parse = require("./parse");
const fs = require("fs");

jest.mock("fs");

test("parse the config file", () => {
  expect(jest.isMockFunction(fs.readFileSync)).toBeTruthy();
  fs.readFileSync.mockReturnValue(`{ "test": "Testen" }`);

  const sut = parse("test.config.json");
  expect(sut).toEqual({ test: "Testen" });
});

test("throw error if config file cant be parsed", () => {
  expect(jest.isMockFunction(fs.readFileSync)).toBeTruthy();
  fs.readFileSync.mockReturnValue(`CANT PARSE ME`);

  expect(() => {
    parse("test.config.json");
  }).toThrow();
});
