import { Skeleton } from '../../internal/components/Skeleton.js';
import { cn, border } from '../../styles/theme.js';
import '../../token/index.js';
import { jsxs, jsx } from 'react/jsx-runtime';
import { TokenChip } from '../../token/components/TokenChip.js';
function EarnDetails({
  className,
  token,
  tag
}) {
  return /*#__PURE__*/jsxs("div", {
    "data-testid": "ockEarnDetails",
    className: cn(border.radius, 'flex w-full items-center justify-between gap-4', className),
    children: [token ? /*#__PURE__*/jsx(TokenChip, {
      className: "!bg-transparent",
      token: token,
      isPressable: false
    }) : /*#__PURE__*/jsx(Skeleton, {
      className: "!rounded-full h-8 w-28"
    }), tag]
  });
}
export { EarnDetails };
//# sourceMappingURL=EarnDetails.js.map
