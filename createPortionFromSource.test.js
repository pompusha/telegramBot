import { describe, it, expect } from "vitest";
import { createPortionFromSource } from "./handlers/AllfunctionhandlerQueryKeyboard/allVariablesmodules/createPortionFromSource";

describe("createPortionFromSource", () => {
  it("should extract 'Average chocolate' from the input string", async () => {
    const input =
      "Calories in Quality Street Chocolates (individual) Per Average chocolate - 45 calories | 1.9 fat";
    const result = await createPortionFromSource(input);
    expect(result).toBe("Average chocolate");
  });
  it("should extract 'Doughnut' from the input string", async () => {
    const input =
      "1. Calories in Lidl Bakery Jam Filled Doughnut Per Doughnut - 251 calories | 10.7 fat";
    const result = await createPortionFromSource(input);
    expect(result).toBe("Doughnut");
  });
  it("should extract `serving (1 biscuit)*` from the input string", async () => {
    const input =
      "1. Calories in Paterson's Classic Shortbread Fingers 300g Per serving (1 biscuit)* - 75 calories | 3.6 fat";
    const result = await createPortionFromSource(input);
    expect(result).toBe("serving (1 biscuit)*");
  });
});
