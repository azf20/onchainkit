'use client';
import { AmountInput } from '../../../../internal/components/amount-input/AmountInput.js';
import { SendAmountInputTypeSwitch } from './SendAmountInputTypeSwitch.js';
import { jsxs, jsx } from 'react/jsx-runtime';
function SendAmountInput({
  selectedToken,
  cryptoAmount,
  handleCryptoAmountChange,
  fiatAmount,
  handleFiatAmountChange,
  selectedInputType,
  setSelectedInputType,
  exchangeRate,
  exchangeRateLoading,
  className,
  textClassName
}) {
  return /*#__PURE__*/jsxs("div", {
    className: "flex h-full w-full flex-col justify-center",
    children: [/*#__PURE__*/jsx(AmountInput, {
      fiatAmount: fiatAmount ?? '',
      cryptoAmount: cryptoAmount ?? '',
      asset: selectedToken?.symbol ?? '',
      currency: 'USD',
      selectedInputType: selectedInputType,
      setFiatAmount: handleFiatAmountChange,
      setCryptoAmount: handleCryptoAmountChange,
      exchangeRate: String(exchangeRate),
      className: className,
      textClassName: textClassName
    }), /*#__PURE__*/jsx(SendAmountInputTypeSwitch, {
      selectedToken: selectedToken ?? null,
      fiatAmount: fiatAmount ?? '',
      cryptoAmount: cryptoAmount ?? '',
      selectedInputType: selectedInputType,
      setSelectedInputType: setSelectedInputType,
      exchangeRate: exchangeRate,
      exchangeRateLoading: exchangeRateLoading
    })]
  });
}
export { SendAmountInput };
//# sourceMappingURL=SendAmountInput.js.map
