'use client';
import { WalletAdvancedContent } from './WalletAdvancedContent.js';
import { WalletAdvancedProvider } from './WalletAdvancedProvider.js';
import { jsx } from 'react/jsx-runtime';
function WalletAdvanced({
  children,
  classNames,
  swappableTokens
}) {
  return /*#__PURE__*/jsx(WalletAdvancedProvider, {
    children: /*#__PURE__*/jsx(WalletAdvancedContent, {
      classNames: classNames,
      swappableTokens: swappableTokens,
      children: children
    })
  });
}
export { WalletAdvanced };
//# sourceMappingURL=WalletAdvanced.js.map
