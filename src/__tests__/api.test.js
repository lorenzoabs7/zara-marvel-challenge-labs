import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchList, fetchCharacterById, shouldMakeRequest, createMarvelApiUrl } from "../api/marvelApi";
import { expect, jest, describe, test, beforeAll, afterAll } from "@jest/globals";

const mock = new MockAdapter(axios);

const originalDateNow = Date.now;

beforeAll(() => {
  Date.now = jest.fn();
});

afterAll(() => {
  Date.now = originalDateNow;
});


describe("shouldMakeRequest", () => {
  test("returns false if last request was less than 1000 ms ago", () => {
    Date.now.mockReturnValue(0);
    shouldMakeRequest();
    Date.now.mockReturnValue(999);
    expect(shouldMakeRequest()).toBe(false);
  });

  test("returns true if last request was more than 1000 ms ago", () => {
    Date.now.mockReturnValue(0);
    shouldMakeRequest();
    Date.now.mockReturnValue(1001);
    expect(shouldMakeRequest()).toBe(true);
  });
});

describe("createMarvelApiUrl", () => {
  test("constructs correct URL with basic parameters", () => {
    const url = createMarvelApiUrl(true, "characters");
    expect(url).toContain("http://gateway.marvel.com/v1/public/characters");
    expect(url).toContain(`apikey=${process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY}`);
  });

  test("includes hash and timestamp for non-exposed requests", () => {
    const url = createMarvelApiUrl(false, "characters");
    expect(url).toMatch(/&ts=\d+/);
    expect(url).toMatch(/&hash=[a-f0-9]{32}/);
  });
});

describe("fetchList", () => {
  test("returns null if called too soon after previous request", async () => {
    Date.now.mockReturnValue(1000);
    global.lastRequestTime = 999;
    const result = await fetchList(true, "characters");
    expect(result).toBeNull();
  });

  test("fetches data from the API successfully", async () => {
    mock.onGet().reply(200, { data: ["character data"] });
    const result = await fetchCharacterById(true, "/characters");
    expect(result.data).toEqual(["character data"]);
  });
});

describe("fetchCharacterById", () => {
  beforeAll(() => {
    mock.reset();
  });

  test("fetches character data by ID", async () => {
    mock.onGet().reply(200, { data: "character data" });
    const result = await fetchCharacterById(true, "12345");
    expect(result.data).toEqual("character data");
  });
});