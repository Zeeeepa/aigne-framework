import Decimal from "decimal.js";
import { useCallback } from "react";

export default function useGetTokenPrice() {
  const getPrices = useCallback(
    ({
      model,
      inputTokens,
      outputTokens,
    }: {
      model?: string;
      inputTokens: number;
      outputTokens: number;
    }) => {
      if (!model) {
        return {
          inputCost: new Decimal(0),
          outputCost: new Decimal(0),
        };
      }

      const price = (window as any).modelPrices?.[model];
      if (!price) {
        return {
          inputCost: new Decimal(0),
          outputCost: new Decimal(0),
        };
      }

      // @ts-ignore
      const inputCostPerToken = new Decimal(price.input_cost_per_token || 0);
      // @ts-ignore
      const outputCostPerToken = new Decimal(price.output_cost_per_token || 0);

      return {
        inputCost: new Decimal(inputTokens).mul(inputCostPerToken),
        outputCost: new Decimal(outputTokens).mul(outputCostPerToken),
      };
    },
    [],
  );

  return getPrices;
}
