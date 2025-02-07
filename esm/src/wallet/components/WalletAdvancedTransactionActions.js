'use client';
import { addSvgForeground } from '../../internal/svg/addForegroundSvg.js';
import { arrowUpRightSvg } from '../../internal/svg/arrowUpRightSvg.js';
import { toggleSvg } from '../../internal/svg/toggleSvg.js';
import { cn, text, color, border, pressable } from '../../styles/theme.js';
import { useOnchainKit } from '../../useOnchainKit.js';
import { useCallback } from 'react';
import { useWalletAdvancedContext } from './WalletAdvancedProvider.js';
import { useWalletContext } from './WalletProvider.js';
import { jsx, jsxs } from 'react/jsx-runtime';
function WalletAdvancedTransactionActions({
  classNames
}) {
  const _useWalletContext = useWalletContext(),
    address = _useWalletContext.address,
    chain = _useWalletContext.chain;
  const _useOnchainKit = useOnchainKit(),
    projectId = _useOnchainKit.projectId;
  const _useWalletAdvancedCon = useWalletAdvancedContext(),
    isFetchingPortfolioData = _useWalletAdvancedCon.isFetchingPortfolioData,
    setShowSwap = _useWalletAdvancedCon.setShowSwap,
    animations = _useWalletAdvancedCon.animations;
  const handleBuy = useCallback(() => {
    if (!projectId || !address || !chain?.name) {
      return;
    }
    const url = new URL('https://pay.coinbase.com/buy/select-asset');
    const params = new URLSearchParams({
      appId: projectId,
      destinationWallets: JSON.stringify([{
        address,
        blockchains: [chain.name.toLowerCase()]
      }]),
      defaultAsset: 'USDC',
      defaultPaymentMethod: 'CRYPTO_ACCOUNT',
      presetFiatAmount: '25'
    });
    window.open(`${url}?${params}`, 'popup', 'width=400,height=600,scrollbars=yes');
  }, [address, chain?.name, projectId]);
  const handleSend = useCallback(() => {
    window.open('https://wallet.coinbase.com', '_blank');
  }, []);
  const handleSwap = useCallback(() => {
    setShowSwap(true);
  }, [setShowSwap]);
  if (isFetchingPortfolioData) {
    return /*#__PURE__*/jsx("div", {
      "data-testid": "ockWalletAdvanced_LoadingPlaceholder",
      className: "my-3 h-16 w-80"
    }); // Prevent layout shift
  }
  return /*#__PURE__*/jsxs("div", {
    "data-testid": "ockWalletAdvanced_TransactionActions",
    className: cn('my-3 flex w-full flex-row justify-between gap-2', animations.content, classNames?.container),
    children: [/*#__PURE__*/jsx(WalletAdvancedTransactionAction, {
      icon: addSvgForeground,
      label: "Buy",
      action: handleBuy,
      classNames: classNames?.leftAction
    }), /*#__PURE__*/jsx(WalletAdvancedTransactionAction, {
      icon: arrowUpRightSvg,
      label: "Send",
      action: handleSend,
      classNames: classNames?.middleAction
    }), /*#__PURE__*/jsx(WalletAdvancedTransactionAction, {
      icon: toggleSvg,
      label: "Swap",
      action: handleSwap,
      classNames: classNames?.rightAction
    })]
  });
}
function WalletAdvancedTransactionAction({
  icon,
  label,
  action,
  classNames
}) {
  return /*#__PURE__*/jsxs("button", {
    type: "button",
    className: cn('flex flex-col items-center justify-center gap-2 pt-2.5 pb-2', 'h-16 flex-1', border.radius, pressable.alternate, classNames?.container),
    onClick: action,
    "aria-label": label,
    children: [/*#__PURE__*/jsx("span", {
      className: cn('flex h-4 w-4 flex-col items-center justify-center', classNames?.icon),
      children: icon
    }), /*#__PURE__*/jsx("span", {
      className: cn(text.label2, color.foreground, 'flex flex-col justify-center', classNames?.label),
      children: label
    })]
  });
}
export { WalletAdvancedTransactionActions };
//# sourceMappingURL=WalletAdvancedTransactionActions.js.map
