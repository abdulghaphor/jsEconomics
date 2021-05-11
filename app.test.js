require("./toFils");
const gccCountryData = require("./gulfCountries");
const {
  gdpGrowthCalculatorFn,
  gccTotalPopulationFn,
  sortGccByExchangeRateFn,
  newGccFn,
  newExchangeRatesFn,
  whereToBuildUAFn,
} = require("./app");

test(`GCC growth calculator`, () => {
  const growthRate = Math.floor(Math.random() * (10000 - 1000) + 100) / 100000;
  const adjustedGrowthRate = growthRate + 1;
  const growthArr = gccCountryData
    .map((cv) => cv.grossDomesticProduct * adjustedGrowthRate)
    .map((cv) => cv.toFils());
  const newGrowthArr = gdpGrowthCalculatorFn(growthRate);
  growthArr.forEach((cv, i) => {
    expect(newGrowthArr[i]).toBeCloseTo(cv);
  });
});

test(`Get total GCC total population`, () => {
  const newTotalPopulation = gccTotalPopulationFn();
  expect(newTotalPopulation).toBeCloseTo(57.696);
});

describe("Tulaitelah joins the GCC", () => {
  const newGccArr = newGccFn();
  const findCountry = newGccArr.find(
    (cv) => cv.name === "People's Republic of Tulaitelah"
  );
  const reducedPopulations = [
    { n: "Saudi Arabia", p: 32.5565 },
    { n: "United Arab Emirates", p: 9.28245 },
    { n: "Oman", p: 4.72625 },
    { n: "Kuwait", p: 3.99665 },
    { n: "Qatar", p: 2.6904 },
    { n: "Bahrain", p: 1.55895 },
    { n: "People's Republic of Tulaitelah", p: 4.8828 },
  ];

  test("Add Tulaitelah to GCC", () => {
    expect(findCountry).not.toBeNull();
  });

  test("Khaleejis migrate to Tulaitelah by 5%", () => {
    expect(findCountry.population).toBeCloseTo(4.8828);
  });

  test("GCC reduce population by 5%", () => {
    reducedPopulations.forEach((cv, i) => {
      let populationTest = newGccArr[i].population;
      expect(cv.p).toBeCloseTo(populationTest.toFils());
    });
  });
});

test("Sort GCC by Kuwaiti exchange rate", () => {
  const sortByEr = [
    "Kuwait",
    "Bahrain",
    "Oman",
    "Qatar",
    "United Arab Emirates",
    "Saudi Arabia",
  ];
  const newSortByEr = sortGccByExchangeRateFn().map((cv) => cv.name);
  sortByEr.forEach((cv, i) => {
    expect(newSortByEr[i] === cv).toBeTruthy();
  });
});

test("Kuwait depreciates currency by 25%", () => {
  const ExchangeRate = gccCountryData
    .map((cv) => ({
      ...cv,
      exchangeRateToKWD: cv.name === "Kuwait" ? 1 : cv.exchangeRateToKWD * 0.75,
    }))
    .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  const newExchangeRate = newExchangeRatesFn().sort((a, b) =>
    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
  );
  ExchangeRate.forEach((cv, i) =>
    expect(newExchangeRate[i].exchangeRateToKWD).toBeCloseTo(
      cv.exchangeRateToKWD
    )
  );
});

test("University of Amsterdam branch in highest GCC GDP", () => {
  const result = whereToBuildUAFn();
  expect(result).toBe("Saudi Arabia");
});
