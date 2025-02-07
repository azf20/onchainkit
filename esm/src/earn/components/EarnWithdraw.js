import { EarnCard } from './EarnCard.js';
import { WithdrawAmountInput } from './WithdrawAmountInput.js';
import { WithdrawBalance } from './WithdrawBalance.js';
import { WithdrawButton } from './WithdrawButton.js';
import { WithdrawDetails } from './WithdrawDetails.js';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
function EarnWithdrawDefaultContent() {
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(WithdrawDetails, {}), /*#__PURE__*/jsx(WithdrawAmountInput, {}), /*#__PURE__*/jsx(WithdrawBalance, {}), /*#__PURE__*/jsx(WithdrawButton, {})]
  });
}
function EarnWithdraw({
  children = /*#__PURE__*/jsx(EarnWithdrawDefaultContent, {}),
  className
}) {
  return /*#__PURE__*/jsx(EarnCard, {
    className: className,
    children: children
  });
}
export { EarnWithdraw };
//# sourceMappingURL=EarnWithdraw.js.map
