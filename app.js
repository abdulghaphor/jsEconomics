require("./toFils");
const gccCountryData = require("./gulfCountries");
const tulaitelaData = require("./tulaitelah");

// The International Monetary Fund estimates that GCC countries will economically grow
// an average of 4% in 2021. Create a function that uses gccCountryData to estimate
// the new growth of Gross Domestic Product (a measure of the economy). The default
// value of growth should be 4%.
// The growth equation is: GDP * (1 + growthRate)
// use: .map()
const gdpGrowthCalculatorFn = (growthRate = 0.04) => {
  return gccCountryData.map((currentValue) => {
    const adjustedGrowthRate = 1 + growthRate;
    return currentValue.grossDomesticProduct * adjustedGrowthRate;
  });
};

// Due to the Covid-19 pandemic, the birthrate in the GCC has increased substantially.
// Create a function that returns the total number of GCC residents with a 9% increase.
// equation: total population * 1 + growthRate in decimals.
// use: .reduce()
const gccTotalPopulationFn = () => {
  const total = gccCountryData.reduce(
    (accumilator, currentValue, index) => accumilator + currentValue.population,
    0
  );
  return total;
};

// This function sorts GCC countries according to their currency exchange rate
// and returns an array of objects.
// use: sort()
const sortGccByExchangeRateFn = () => {
  return gccCountryData.sort(
    (a, b) => a.exchangeRateToKWD - b.exchangeRateToKWD
  );
};

// Prince Ali from a royal family in the Middle East organized a successful coup and
// seized the government. He renamed his country to the People's Republic of Tulaitelah
// and appointed himself as "Sovereign of Tulaitelah". He also decided to join the GCC.
// It's estimated that 5% of the GCC will migrate to their this year, due to their lax
// pandemic proceedures, high infrastructure spending and quick food delivery.
// newGccFn() should reflect this new situation in the gcc.
// Add a new object to gccCountryData, and remove 5% from each GCC country and add it to
// Tulaitelah's population.
const newGccFn = () => {
  const newTulaitela = {
    ...tulaitelaData,
    population: gccCountryData.reduce((acc, cv) => {
      const immigrants = cv.population * 0.05;
      return acc + immigrants;
    }, 1.998),
  };
  const newGccCountryData = gccCountryData.map((cv) => ({
    ...cv,
    population: cv.population * 0.95,
  }));
  newGccCountryData.push(newTulaitela);
  return newGccCountryData;
};

// As the government of Kuwait faced an unending pendemic and shrinking oil prices; the
// Central Bank of Kuwait decided to depreciate the exchange rate of the KD to 75% of its
// current value as it cannot reduce the salaries of government employees nor remove subsidies.
// gccCountryData should reflect this new reality, and as such, the function below should
// adjust the all exchange rates between countries and Kuwait.
const newExchangeRatesFn = () => {
  return gccCountryData.map((cv) => ({
    ...cv,
    exchangeRateToKWD: cv.name === "Kuwait" ? 1 : cv.exchangeRateToKWD * 0.75,
  }));
};

// The Dutch government is looking for a place to build a new branch for the University
// of Amsterdam in the GCC. It want to find the country with the highest GDP.
// The function below should return the name of the GCC country with the highest GDP, from
// the list
const whereToBuildUAFn = () => {
  return gccCountryData.sort(
    (a, b) => b.grossDomesticProduct - a.grossDomesticProduct
  )[0].name;
};

module.exports = {
  gdpGrowthCalculatorFn,
  gccTotalPopulationFn,
  sortGccByExchangeRateFn,
  newGccFn,
  newExchangeRatesFn,
  whereToBuildUAFn,
};
