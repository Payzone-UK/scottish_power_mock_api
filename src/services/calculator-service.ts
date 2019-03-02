export const calculatorService = {
  ICalculator: {
    Add({a, b}: {a: number, b: number}, res: Function): void {
      console.log("Adding");
      res({
        result: a + b
      });
    },
    Subtract({a, b}: {a: number, b: number}, res: Function): void {
      console.log("Subtracting");
      res({
        result: a - b
      });
    }
  }
};
