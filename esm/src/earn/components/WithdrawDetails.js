import { useMemo } from 'react';
import { EarnDetails } from './EarnDetails.js';
import { useEarnContext } from './EarnProvider.js';
import { jsx } from 'react/jsx-runtime';
function WithdrawDetails({
  className
}) {
  const _useEarnContext = useEarnContext(),
    interest = _useEarnContext.interest,
    vaultToken = _useEarnContext.vaultToken;
  const tag = useMemo(() => {
    if (interest) {
      return `${interest} interest earned`;
    }
    return '';
  }, [interest]);
  return /*#__PURE__*/jsx(EarnDetails, {
    className: className,
    token: vaultToken,
    tag: tag
  });
}
export { WithdrawDetails };
//# sourceMappingURL=WithdrawDetails.js.map
