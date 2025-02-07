import { DepositAmountInput } from './DepositAmountInput.js';
import { DepositBalance } from './DepositBalance.js';
import { DepositButton } from './DepositButton.js';
import { DepositDetails } from './DepositDetails.js';
import { EarnCard } from './EarnCard.js';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
function EarnDepositDefaultContent() {
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(DepositDetails, {}), /*#__PURE__*/jsx(DepositAmountInput, {}), /*#__PURE__*/jsx(DepositBalance, {}), /*#__PURE__*/jsx(DepositButton, {})]
  });
}
function EarnDeposit({
  children = /*#__PURE__*/jsx(EarnDepositDefaultContent, {}),
  className
}) {
  return /*#__PURE__*/jsx(EarnCard, {
    className: className,
    children: children
  });
}
export { EarnDeposit };
//# sourceMappingURL=EarnDeposit.js.map
