import { Skeleton } from '../../../../internal/components/Skeleton.js';
import { AmountInputTypeSwitch } from '../../../../internal/components/amount-input/AmountInputTypeSwitch.js';
import { cn, text, color } from '../../../../styles/theme.js';
import { jsx } from 'react/jsx-runtime';
function SendAmountInputTypeSwitch({
  exchangeRateLoading,
  loadingDisplay = /*#__PURE__*/jsx("div", {
    className: cn(text.caption, color.foregroundMuted, 'h-[1.625rem]'),
    children: "Exchange rate unavailable"
  }),
  exchangeRate,
  selectedToken,
  fiatAmount,
  cryptoAmount,
  selectedInputType,
  setSelectedInputType,
  className
}) {
  // AmountInputTypeSwitch uses a skeleton for both loading and error states
  // SendAmountInputTypeSwitch uses skeleton for the loading display
  // SendAmountInputTypeSwitch uses a custom error display (see loadingDisplay default)
  if (exchangeRateLoading) {
    return /*#__PURE__*/jsx(Skeleton, {
      className: "h-[1.625rem]"
    });
  }
  return /*#__PURE__*/jsx(AmountInputTypeSwitch, {
    asset: selectedToken?.symbol ?? '',
    fiatAmount: fiatAmount ?? '',
    cryptoAmount: cryptoAmount ?? '',
    exchangeRate: exchangeRate,
    exchangeRateLoading: false,
    loadingDisplay: loadingDisplay,
    currency: "USD",
    selectedInputType: selectedInputType,
    setSelectedInputType: setSelectedInputType,
    className: className
  });
}
export { SendAmountInputTypeSwitch };
//# sourceMappingURL=SendAmountInputTypeSwitch.js.map
