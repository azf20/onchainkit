function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import { getToken } from '../utils/getToken.js';
import { useValue } from '../../internal/hooks/useValue.js';
import { useGetTokenBalance } from '../../wallet/hooks/useGetTokenBalance.js';
import { createContext, useState, useContext } from 'react';
import { useAccount } from 'wagmi';
import { useBuildMorphoDepositTx } from '../hooks/useBuildMorphoDepositTx.js';
import { useBuildMorphoWithdrawTx } from '../hooks/useBuildMorphoWithdrawTx.js';
import { useMorphoVault } from '../hooks/useMorphoVault.js';
import { jsx } from 'react/jsx-runtime';
const EarnContext = /*#__PURE__*/createContext(undefined);
function EarnProvider({
  vaultAddress,
  children
}) {
  if (!vaultAddress) {
    throw new Error('vaultAddress is required. For a list of vaults, see: https://app.morpho.org/base/earn');
  }
  const _useAccount = useAccount(),
    address = _useAccount.address;
  const _useState = useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    depositAmount = _useState2[0],
    setDepositAmount = _useState2[1];
  const _useState3 = useState(''),
    _useState4 = _slicedToArray(_useState3, 2),
    withdrawAmount = _useState4[0],
    setWithdrawAmount = _useState4[1];
  const _useMorphoVault = useMorphoVault({
      vaultAddress,
      address
    }),
    asset = _useMorphoVault.asset,
    assetDecimals = _useMorphoVault.assetDecimals,
    assetSymbol = _useMorphoVault.assetSymbol,
    balance = _useMorphoVault.balance,
    totalApy = _useMorphoVault.totalApy;
  const vaultToken = asset ? getToken({
    address: asset,
    symbol: assetSymbol,
    name: assetSymbol,
    decimals: assetDecimals
  }) : undefined;
  const _useGetTokenBalance = useGetTokenBalance(address, vaultToken),
    convertedBalance = _useGetTokenBalance.convertedBalance;
  const _useBuildMorphoWithdr = useBuildMorphoWithdrawTx({
      vaultAddress,
      amount: Number(withdrawAmount),
      receiverAddress: address
    }),
    withdrawCalls = _useBuildMorphoWithdr.calls;
  const _useBuildMorphoDeposi = useBuildMorphoDepositTx({
      vaultAddress,
      amount: Number(depositAmount),
      receiverAddress: address
    }),
    depositCalls = _useBuildMorphoDeposi.calls;
  const value = useValue({
    address,
    convertedBalance,
    vaultAddress,
    vaultToken,
    depositAmount,
    setDepositAmount,
    withdrawAmount,
    setWithdrawAmount,
    depositedAmount: balance,
    apy: totalApy,
    // TODO: update when we have logic to fetch interest
    interest: '',
    withdrawCalls,
    depositCalls
  });
  return /*#__PURE__*/jsx(EarnContext.Provider, {
    value: value,
    children: children
  });
}
function useEarnContext() {
  const context = useContext(EarnContext);
  if (!context) {
    throw new Error('useEarnContext must be used within an EarnProvider');
  }
  return context;
}
export { EarnProvider, useEarnContext };
//# sourceMappingURL=EarnProvider.js.map
