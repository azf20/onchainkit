import { AmountInput } from '../../internal/components/amount-input/AmountInput.js';
import { useThrottle } from '../../internal/hooks/useThrottle.js';
import { useCallback } from 'react';
import { useOnrampExchangeRate } from '../hooks/useOnrampExchangeRate.js';
import { useFundContext } from './FundCardProvider.js';
import { jsx } from 'react/jsx-runtime';
const THROTTLE_DELAY_MS = 5000;
const FundCardAmountInput = ({
  className
}) => {
  const _useFundContext = useFundContext(),
    fundAmountFiat = _useFundContext.fundAmountFiat,
    fundAmountCrypto = _useFundContext.fundAmountCrypto,
    asset = _useFundContext.asset,
    selectedInputType = _useFundContext.selectedInputType,
    currency = _useFundContext.currency,
    exchangeRate = _useFundContext.exchangeRate,
    setFundAmountFiat = _useFundContext.setFundAmountFiat,
    setFundAmountCrypto = _useFundContext.setFundAmountCrypto,
    country = _useFundContext.country,
    subdivision = _useFundContext.subdivision,
    setExchangeRate = _useFundContext.setExchangeRate,
    onError = _useFundContext.onError;
  const _useOnrampExchangeRat = useOnrampExchangeRate({
      asset,
      currency,
      country,
      subdivision,
      setExchangeRate,
      onError
    }),
    fetchExchangeRate = _useOnrampExchangeRat.fetchExchangeRate;
  const throttledFetchExchangeRate = useThrottle(fetchExchangeRate, THROTTLE_DELAY_MS);

  /**
   * Handle amount changes with throttled updates
   *
   * Both setFiatAmount and setCryptoAmount on the AmountInput component are called with the new amount so we only need to fetch exchange rate when either is called.
   */
  const handleFiatAmountChange = useCallback(amount => {
    setFundAmountFiat(amount);
    throttledFetchExchangeRate();
  }, [setFundAmountFiat, throttledFetchExchangeRate]);
  return /*#__PURE__*/jsx(AmountInput, {
    fiatAmount: fundAmountFiat,
    cryptoAmount: fundAmountCrypto,
    asset: asset,
    selectedInputType: selectedInputType,
    currency: currency,
    className: className,
    setFiatAmount: handleFiatAmountChange,
    setCryptoAmount: setFundAmountCrypto,
    exchangeRate: String(exchangeRate)
  });
};
export { FundCardAmountInput, FundCardAmountInput as default };
//# sourceMappingURL=FundCardAmountInput.js.map
