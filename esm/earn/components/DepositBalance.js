import { getTruncatedAmount } from '../utils/getTruncatedAmount.js';
import { Skeleton } from '../../internal/components/Skeleton.js';
import { cn } from '../../styles/theme.js';
import { useCallback, useMemo } from 'react';
import { EarnBalance } from './EarnBalance.js';
import { useEarnContext } from './EarnProvider.js';
import { jsx } from 'react/jsx-runtime';
function DepositBalance({
  className
}) {
  const _useEarnContext = useEarnContext(),
    convertedBalance = _useEarnContext.convertedBalance,
    setDepositAmount = _useEarnContext.setDepositAmount,
    vaultToken = _useEarnContext.vaultToken;
  const handleMaxPress = useCallback(() => {
    if (convertedBalance) {
      setDepositAmount(convertedBalance);
    }
  }, [convertedBalance, setDepositAmount]);
  const balance = useMemo(() => {
    if (!convertedBalance) {
      return '0';
    }
    return getTruncatedAmount(convertedBalance.toString(), 6);
  }, [convertedBalance]);
  const title = useMemo(() => {
    if (!vaultToken) {
      return /*#__PURE__*/jsx(Skeleton, {
        className: cn('!bg-[var(--ock-bg-alternate-active)] h-6 w-24')
      });
    }
    return `${balance} ${vaultToken?.symbol}`;
  }, [balance, vaultToken]);
  return /*#__PURE__*/jsx(EarnBalance, {
    className: className,
    title: title,
    subtitle: "Available to deposit",
    onActionPress: handleMaxPress,
    showAction: !!convertedBalance
  });
}
export { DepositBalance };
//# sourceMappingURL=DepositBalance.js.map
