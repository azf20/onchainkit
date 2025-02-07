import { getTruncatedAmount } from '../utils/getTruncatedAmount.js';
import { Skeleton } from '../../internal/components/Skeleton.js';
import { useCallback, useMemo } from 'react';
import { EarnBalance } from './EarnBalance.js';
import { useEarnContext } from './EarnProvider.js';
import { jsx } from 'react/jsx-runtime';
function WithdrawBalance({
  className
}) {
  const _useEarnContext = useEarnContext(),
    depositedAmount = _useEarnContext.depositedAmount,
    setWithdrawAmount = _useEarnContext.setWithdrawAmount,
    vaultToken = _useEarnContext.vaultToken;
  const handleMaxPress = useCallback(() => {
    if (depositedAmount) {
      setWithdrawAmount(depositedAmount);
    }
  }, [depositedAmount, setWithdrawAmount]);
  const balance = useMemo(() => {
    if (!depositedAmount) {
      return '0';
    }
    return getTruncatedAmount(depositedAmount.toString(), 4);
  }, [depositedAmount]);
  const title = useMemo(() => {
    if (!vaultToken) {
      return /*#__PURE__*/jsx(Skeleton, {
        className: "h-6 w-24"
      });
    }
    return `${balance} ${vaultToken?.symbol}`;
  }, [balance, vaultToken]);
  return /*#__PURE__*/jsx(EarnBalance, {
    className: className,
    title: title,
    subtitle: "Available to withdraw",
    onActionPress: handleMaxPress,
    showAction: !!depositedAmount
  });
}
export { WithdrawBalance };
//# sourceMappingURL=WithdrawBalance.js.map
