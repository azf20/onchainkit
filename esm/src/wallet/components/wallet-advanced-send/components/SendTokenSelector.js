'use client';
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { cn, text, color, pressable, border } from '../../../../styles/theme.js';
import '../../../../token/index.js';
import { formatUnits } from 'viem';
import { useWalletAdvancedContext } from '../../WalletAdvancedProvider.js';
import { jsxs, jsx } from 'react/jsx-runtime';
import { TokenBalance } from '../../../../token/components/TokenBalance.js';
function SendTokenSelector({
  selectedToken,
  handleTokenSelection,
  handleResetTokenSelection,
  setSelectedInputType,
  handleCryptoAmountChange,
  handleFiatAmountChange,
  classNames
}) {
  const _useWalletAdvancedCon = useWalletAdvancedContext(),
    tokenBalances = _useWalletAdvancedCon.tokenBalances;
  if (!selectedToken) {
    return /*#__PURE__*/jsxs("div", {
      className: "mt-4 flex max-h-80 flex-col gap-2",
      children: [/*#__PURE__*/jsx("span", {
        className: cn(text.caption, color.foregroundMuted, 'uppercase'),
        children: "Select a token"
      }), /*#__PURE__*/jsx("div", {
        className: "scrollbar-hidden overflow-y-auto",
        children: tokenBalances?.map(token => /*#__PURE__*/jsx(TokenBalance, {
          token: token,
          onClick: handleTokenSelection,
          subtitle: "",
          classNames: _objectSpread({
            container: cn(pressable.default, border.radius, classNames?.container)
          }, classNames)
        }, token.address))
      })]
    });
  }
  return /*#__PURE__*/jsx(TokenBalance, {
    token: selectedToken,
    showImage: true,
    subtitle: "available",
    onClick: handleResetTokenSelection,
    onActionPress: () => {
      setSelectedInputType('crypto');
      handleFiatAmountChange(String(selectedToken.fiatBalance));
      handleCryptoAmountChange(String(formatUnits(BigInt(selectedToken.cryptoBalance), selectedToken.decimals)));
    },
    classNames: _objectSpread({
      container: cn(pressable.alternate, border.radius, classNames?.container)
    }, classNames)
  });
}
export { SendTokenSelector };
//# sourceMappingURL=SendTokenSelector.js.map
