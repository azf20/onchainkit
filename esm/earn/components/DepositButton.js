import '../../transaction/index.js';
import '../../wallet/index.js';
import { useEarnContext } from './EarnProvider.js';
import { jsx } from 'react/jsx-runtime';
import { ConnectWallet } from '../../wallet/components/ConnectWallet.js';
import { Transaction } from '../../transaction/components/Transaction.js';
import { TransactionButton } from '../../transaction/components/TransactionButton.js';
function DepositButton({
  className
}) {
  const _useEarnContext = useEarnContext(),
    address = _useEarnContext.address,
    depositCalls = _useEarnContext.depositCalls;
  if (!address) {
    return /*#__PURE__*/jsx(ConnectWallet, {
      className: "w-full"
    });
  }
  return /*#__PURE__*/jsx(Transaction, {
    className: className,
    calls: depositCalls,
    children: /*#__PURE__*/jsx(TransactionButton, {
      text: "Deposit"
    })
  });
}
export { DepositButton };
//# sourceMappingURL=DepositButton.js.map
