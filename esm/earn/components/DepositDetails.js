import { getTruncatedAmount } from '../utils/getTruncatedAmount.js';
import { Skeleton } from '../../internal/components/Skeleton.js';
import { formatPercent } from '../../internal/utils/formatPercent.js';
import { cn, text, color, background } from '../../styles/theme.js';
import { EarnDetails } from './EarnDetails.js';
import { useEarnContext } from './EarnProvider.js';
import { jsx } from 'react/jsx-runtime';
function ApyTag({
  apy
}) {
  return apy ? /*#__PURE__*/jsx("div", {
    className: cn(text.label1, color.foregroundMuted, background.alternate, 'flex items-center justify-center rounded-full p-1 px-3'),
    children: `APY ${formatPercent(Number(getTruncatedAmount(apy.toString(), 3)))}`
  }) : /*#__PURE__*/jsx(Skeleton, {
    className: "!rounded-full h-7 min-w-28"
  });
}
function DepositDetails({
  className
}) {
  const _useEarnContext = useEarnContext(),
    apy = _useEarnContext.apy,
    vaultToken = _useEarnContext.vaultToken;
  return /*#__PURE__*/jsx(EarnDetails, {
    className: className,
    token: vaultToken,
    tag: /*#__PURE__*/jsx(ApyTag, {
      apy: apy
    })
  });
}
export { DepositDetails };
//# sourceMappingURL=DepositDetails.js.map
