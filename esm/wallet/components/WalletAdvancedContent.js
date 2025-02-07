import { BottomSheet } from '../../internal/components/BottomSheet.js';
import { zIndex } from '../../styles/constants.js';
import { cn, text, background, border } from '../../styles/theme.js';
import { useCallback, useMemo } from 'react';
import { WALLET_ADVANCED_DEFAULT_SWAPPABLE_TOKENS } from '../constants.js';
import { useWalletAdvancedContext } from './WalletAdvancedProvider.js';
import { WalletAdvancedQrReceive } from './WalletAdvancedQrReceive.js';
import { WalletAdvancedSwap } from './WalletAdvancedSwap.js';
import { useWalletContext } from './WalletProvider.js';
import { jsx } from 'react/jsx-runtime';
function WalletAdvancedContent({
  children,
  swappableTokens,
  classNames
}) {
  const _useWalletContext = useWalletContext(),
    isSubComponentOpen = _useWalletContext.isSubComponentOpen,
    setIsSubComponentOpen = _useWalletContext.setIsSubComponentOpen,
    isSubComponentClosing = _useWalletContext.isSubComponentClosing,
    setIsSubComponentClosing = _useWalletContext.setIsSubComponentClosing,
    connectRef = _useWalletContext.connectRef,
    breakpoint = _useWalletContext.breakpoint;
  const _useWalletAdvancedCon = useWalletAdvancedContext(),
    showQr = _useWalletAdvancedCon.showQr,
    showSwap = _useWalletAdvancedCon.showSwap,
    tokenBalances = _useWalletAdvancedCon.tokenBalances,
    animations = _useWalletAdvancedCon.animations;
  const handleBottomSheetClose = useCallback(() => {
    setIsSubComponentOpen(false);
  }, [setIsSubComponentOpen]);
  const handleAnimationEnd = useCallback(() => {
    if (isSubComponentClosing) {
      setIsSubComponentOpen(false);
      setIsSubComponentClosing(false);
    }
  }, [isSubComponentClosing, setIsSubComponentOpen, setIsSubComponentClosing]);
  const content = useMemo(() => {
    if (showQr) {
      return /*#__PURE__*/jsx(ContentWrapper, {
        children: /*#__PURE__*/jsx(WalletAdvancedQrReceive, {
          classNames: classNames?.qr
        })
      });
    }
    if (showSwap) {
      return /*#__PURE__*/jsx(ContentWrapper, {
        children: /*#__PURE__*/jsx(WalletAdvancedSwap, {
          title: /*#__PURE__*/jsx("div", {
            className: cn(text.headline, 'w-full text-center text-base'),
            children: "Swap"
          }),
          to: swappableTokens ?? WALLET_ADVANCED_DEFAULT_SWAPPABLE_TOKENS,
          from: tokenBalances?.map(token => ({
            address: token.address,
            chainId: token.chainId,
            symbol: token.symbol,
            decimals: token.decimals,
            image: token.image,
            name: token.name
          })) ?? [],
          classNames: classNames?.swap
        })
      });
    }
    return /*#__PURE__*/jsx(ContentWrapper, {
      className: "px-4 py-3",
      children: children
    });
  }, [showQr, showSwap, swappableTokens, tokenBalances, children, classNames]);
  if (breakpoint === 'sm') {
    return /*#__PURE__*/jsx(BottomSheet, {
      isOpen: isSubComponentOpen,
      triggerRef: connectRef,
      onClose: handleBottomSheetClose,
      className: classNames?.container,
      children: /*#__PURE__*/jsx("div", {
        className: "flex h-full w-full flex-col items-center justify-center",
        children: content
      })
    });
  }
  return /*#__PURE__*/jsx("div", {
    "data-testid": "ockWalletAdvancedContent",
    className: cn(background.default, border.radius, border.lineDefault, zIndex.dropdown, 'my-1.5 h-auto w-full', 'flex items-center justify-center', animations.container, classNames?.container),
    onAnimationEnd: handleAnimationEnd,
    children: content
  });
}
function ContentWrapper({
  children,
  className
}) {
  return /*#__PURE__*/jsx("div", {
    className: cn('flex flex-col items-center justify-between', 'h-120 w-88', className),
    children: children
  });
}
export { WalletAdvancedContent };
//# sourceMappingURL=WalletAdvancedContent.js.map
