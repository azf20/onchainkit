function _slicedToArray(r, e) {
  return (
    _arrayWithHoles(r) ||
    _iterableToArrayLimit(r, e) ||
    _unsupportedIterableToArray(r, e) ||
    _nonIterableRest()
  );
}
function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ('string' == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return (
      'Object' === t && r.constructor && (t = r.constructor.name),
      'Map' === t || 'Set' === t
        ? Array.from(r)
        : 'Arguments' === t ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
        ? _arrayLikeToArray(r, a)
        : void 0
    );
  }
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit(r, l) {
  var t =
    null == r
      ? null
      : ('undefined' != typeof Symbol && r[Symbol.iterator]) || r['@@iterator'];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (((i = (t = t.call(r)).next), 0 === l)) {
        if (Object(t) !== t) return;
        f = !1;
      } else
        for (
          ;
          !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l);
          f = !0
        );
    } catch (r) {
      (o = !0), (n = r);
    } finally {
      try {
        if (!f && null != t.return && ((u = t.return()), Object(u) !== u))
          return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
import { useLifecycleStatus } from '../../internal/hooks/useLifecycleStatus.js';
import { getWindowDimensions } from '../../internal/utils/getWindowDimensions.js';
import { openPopup } from '../../internal/utils/openPopup.js';
import { readContract } from '@wagmi/core';
import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import { base } from 'viem/chains';
import {
  useAccount,
  useConnect,
  useSwitchChain,
  useWriteContract,
  useConfig,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';
import { useWriteContracts, useCallsStatus } from 'wagmi/experimental';
import { useValue } from '../../internal/hooks/useValue.js';
import { isUserRejectedRequestError } from '../../transaction/utils/isUserRejectedRequestError.js';
import { useOnchainKit } from '../../useOnchainKit.js';
import {
  CHECKOUT_LIFECYCLESTATUS,
  GENERIC_ERROR_MESSAGE,
  CheckoutErrorCode,
  USER_REJECTED_ERROR,
  NO_CONNECTED_ADDRESS_ERROR,
  NO_CONTRACTS_ERROR,
} from '../constants.js';
import { useCommerceContracts } from '../hooks/useCommerceContracts.js';
import { jsx } from 'react/jsx-runtime';
const emptyContext = {};
const CheckoutContext = /*#__PURE__*/ createContext(emptyContext);
function useCheckoutContext() {
  const context = useContext(CheckoutContext);
  if (context === emptyContext) {
    throw new Error(
      'useCheckoutContext must be used within a Checkout component',
    );
  }
  return context;
}
function CheckoutProvider({
  chargeHandler,
  children,
  isSponsored,
  onStatus,
  productId,
}) {
  // Core hooks
  const _useOnchainKit = useOnchainKit(),
    _useOnchainKit$config = _useOnchainKit.config,
    _useOnchainKit$config2 =
      _useOnchainKit$config === void 0
        ? {
            appearance: {
              name: undefined,
              logo: undefined,
            },
            paymaster: undefined,
          }
        : _useOnchainKit$config,
    appearance = _useOnchainKit$config2.appearance,
    paymaster = _useOnchainKit$config2.paymaster;
  const _useAccount = useAccount(),
    address = _useAccount.address,
    chainId = _useAccount.chainId,
    isConnected = _useAccount.isConnected;
  const _useConnect = useConnect(),
    connectAsync = _useConnect.connectAsync;
  const _useSwitchChain = useSwitchChain(),
    switchChainAsync = _useSwitchChain.switchChainAsync;
  const _useState = useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    chargeId = _useState2[0],
    setChargeId = _useState2[1];
  const _useState3 = useState(''),
    _useState4 = _slicedToArray(_useState3, 2),
    transactionId = _useState4[0],
    setTransactionId = _useState4[1];
  const _useState5 = useState(''),
    _useState6 = _slicedToArray(_useState5, 2),
    errorMessage = _useState6[0],
    setErrorMessage = _useState6[1];
  const _useState7 = useState(true),
    _useState8 = _slicedToArray(_useState7, 2),
    useExperimental = _useState8[0],
    setUseExperimental = _useState8[1];

  // Refs
  const fetchedDataUseEffect = useRef(false);
  const fetchedDataHandleSubmit = useRef(false);
  const userRejectedRef = useRef(false);
  const contractsRef = useRef();
  const insufficientBalanceRef = useRef(false);
  const priceInUSDCRef = useRef('');

  // Helper function used in both `useEffect` and `handleSubmit` to fetch data from the Commerce API and set state and refs
  const fetchData = useCallback(
    async (address) => {
      updateLifecycleStatus({
        statusName: CHECKOUT_LIFECYCLESTATUS.FETCHING_DATA,
        statusData: {},
      });
      const _await$fetchContracts = await fetchContracts(address),
        contracts = _await$fetchContracts.contracts,
        hydratedChargeId = _await$fetchContracts.chargeId,
        insufficientBalance = _await$fetchContracts.insufficientBalance,
        priceInUSDC = _await$fetchContracts.priceInUSDC,
        error = _await$fetchContracts.error;
      if (error) {
        setErrorMessage(GENERIC_ERROR_MESSAGE);
        updateLifecycleStatus({
          statusName: CHECKOUT_LIFECYCLESTATUS.ERROR,
          statusData: {
            code: CheckoutErrorCode.UNEXPECTED_ERROR,
            error: error.name,
            message: error.message,
          },
        });
        return;
      }
      setChargeId(hydratedChargeId);
      contractsRef.current = contracts;
      insufficientBalanceRef.current = insufficientBalance;
      priceInUSDCRef.current = priceInUSDC;
      updateLifecycleStatus({
        statusName: CHECKOUT_LIFECYCLESTATUS.READY,
        statusData: {
          chargeId,
          contracts: contractsRef.current || [],
        },
      });
    },
    [chargeId],
  );

  // Component lifecycle
  const _useLifecycleStatus = useLifecycleStatus({
      statusName: CHECKOUT_LIFECYCLESTATUS.INIT,
      statusData: {},
    }),
    _useLifecycleStatus2 = _slicedToArray(_useLifecycleStatus, 2),
    lifecycleStatus = _useLifecycleStatus2[0],
    updateLifecycleStatus = _useLifecycleStatus2[1];

  // Transaction hooks
  const fetchContracts = useCommerceContracts({
    chargeHandler,
    productId,
  });

  // Add regular wagmi hooks as fallback
  const _useWriteContract = useWriteContract(),
    writeContractRegular = _useWriteContract.writeContractAsync,
    writeContractStatus = _useWriteContract.status;
  const wagmiConfig = useConfig();

  // Keep experimental hooks but make them conditional
  const _useWriteContracts = useWriteContracts({
      /* v8 ignore start */
      mutation: {
        onSuccess: (id) => {
          setTransactionId(id);
        },
      },
      /* v8 ignore stop */
    }),
    writeContractsStatus = _useWriteContracts.status,
    writeContractsAsync = _useWriteContracts.writeContractsAsync;
  const _useCallsStatus = useCallsStatus({
      id: transactionId,
      query: {
        /* v8 ignore next 3 */
        refetchInterval: (query) => {
          return query.state.data?.status === 'CONFIRMED' ? false : 1000;
        },
        enabled: !!transactionId && useExperimental,
      },
    }),
    callsData = _useCallsStatus.data;

  // Get transaction hash based on experimental or regular flow
  const transactionHash =
    callsData?.receipts?.[0]?.transactionHash ||
    (useExperimental ? undefined : transactionId); // In regular flow, transactionId will be the hash of the second transaction

  const _useWaitForTransactio = useWaitForTransactionReceipt({
      hash: transactionHash,
    }),
    receipt = _useWaitForTransactio.data;

  // Component lifecycle emitters
  useEffect(() => {
    onStatus?.(lifecycleStatus);
  }, [
    lifecycleStatus,
    lifecycleStatus.statusData,
    // Keep statusData, so that the effect runs when it changes
    lifecycleStatus.statusName,
    // Keep statusName, so that the effect runs when it changes
    onStatus,
  ]);

  // Set transaction pending status when writeContracts is pending
  useEffect(() => {
    if (
      writeContractsStatus === 'pending' ||
      writeContractStatus === 'pending'
    ) {
      updateLifecycleStatus({
        statusName: CHECKOUT_LIFECYCLESTATUS.PENDING,
        statusData: {},
      });
    }
  }, [writeContractsStatus, writeContractStatus, updateLifecycleStatus]);

  // Trigger success status when receipt is generated by useWaitForTransactionReceipt
  useEffect(() => {
    if (!receipt) {
      return;
    }
    updateLifecycleStatus({
      statusName: CHECKOUT_LIFECYCLESTATUS.SUCCESS,
      statusData: {
        transactionReceipts: [receipt],
        chargeId: chargeId,
        receiptUrl: `https://commerce.coinbase.com/pay/${chargeId}/receipt`,
      },
    });
  }, [chargeId, receipt, updateLifecycleStatus]);

  // We need to pre-load transaction data in `useEffect` when the wallet is already connected due to a Smart Wallet popup blocking issue in Safari iOS
  useEffect(() => {
    if (
      lifecycleStatus.statusName === CHECKOUT_LIFECYCLESTATUS.INIT &&
      address &&
      !fetchedDataHandleSubmit.current
    ) {
      fetchedDataUseEffect.current = true;
      fetchData(address);
    }
  }, [address, fetchData, lifecycleStatus]);

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: TODO Refactor this component to deprecate funding flow
  const handleSubmit = useCallback(async () => {
    try {
      // Open Coinbase Commerce receipt
      if (lifecycleStatus.statusName === CHECKOUT_LIFECYCLESTATUS.SUCCESS) {
        window.open(
          `https://commerce.coinbase.com/pay/${chargeId}/receipt`,
          '_blank',
          'noopener,noreferrer',
        );
        return;
      }
      if (errorMessage === USER_REJECTED_ERROR) {
        // Reset status if previous request was a rejection
        setErrorMessage('');
      }
      let connectedAddress = address;
      let connectedChainId = chainId;
      if (!isConnected) {
        // Prompt for wallet connection
        // This is defaulted to Coinbase Smart Wallet
        fetchedDataHandleSubmit.current = true; // Set this here so useEffect does not run
        const _await$connectAsync = await connectAsync({
            /* v8 ignore next 5 */
            connector: coinbaseWallet({
              appName: appearance?.name ?? undefined,
              appLogoUrl: appearance?.logo ?? undefined,
              preference: 'smartWalletOnly',
            }),
          }),
          accounts = _await$connectAsync.accounts,
          _connectedChainId = _await$connectAsync.chainId;
        connectedAddress = accounts[0];
        connectedChainId = _connectedChainId;
      }

      // This shouldn't ever happen, but to make Typescript happy
      /* v8 ignore start */
      if (!connectedAddress) {
        setErrorMessage(GENERIC_ERROR_MESSAGE);
        updateLifecycleStatus({
          statusName: CHECKOUT_LIFECYCLESTATUS.ERROR,
          statusData: {
            code: CheckoutErrorCode.UNEXPECTED_ERROR,
            error: NO_CONNECTED_ADDRESS_ERROR,
            message: NO_CONNECTED_ADDRESS_ERROR,
          },
        });
        return;
      }
      /* v8 ignore stop */

      // Fetch contracts if not already done in useEffect
      // Don't re-fetch contracts if the user rejected the previous request, and just use the cached data
      /* v8 ignore next 3 */
      if (!fetchedDataUseEffect.current && !userRejectedRef.current) {
        await fetchData(connectedAddress);
      }

      // Switch chain, if applicable
      if (connectedChainId !== base.id) {
        await switchChainAsync({
          chainId: base.id,
        });
      }

      // Check for sufficient balance
      if (insufficientBalanceRef.current && priceInUSDCRef.current) {
        const _getWindowDimensions = getWindowDimensions('md'),
          height = _getWindowDimensions.height,
          width = _getWindowDimensions.width;
        openPopup({
          url: `https://keys.coinbase.com/fund?asset=USDC&chainId=8453&presetCryptoAmount=${priceInUSDCRef.current}`,
          target: '_blank',
          height,
          width,
        });
        // Reset state
        insufficientBalanceRef.current = false;
        priceInUSDCRef.current = undefined;
        fetchedDataUseEffect.current = false;
        return;
      }

      // Contracts weren't successfully fetched from `fetchContracts`
      if (!contractsRef.current || contractsRef.current.length === 0) {
        setErrorMessage(GENERIC_ERROR_MESSAGE);
        updateLifecycleStatus({
          statusName: CHECKOUT_LIFECYCLESTATUS.ERROR,
          statusData: {
            code: CheckoutErrorCode.UNEXPECTED_ERROR,
            error: NO_CONTRACTS_ERROR,
            message: NO_CONTRACTS_ERROR,
          },
        });
        return;
      }
      if (useExperimental) {
        try {
          // Try experimental flow first
          await writeContractsAsync({
            contracts: contractsRef.current,
            capabilities: isSponsored
              ? {
                  paymasterService: {
                    url: paymaster,
                  },
                }
              : undefined,
          });
          return; // Exit if successful
        } catch {
          setUseExperimental(false);
          // Continue to regular flow
        }
      }

      // Regular flow - execute contracts sequentially
      let hash;
      for (const contract of contractsRef.current || []) {
        // Check if this is an approve call and if we already have sufficient allowance
        if (
          contract.functionName === 'approve' &&
          contract.args &&
          contract.args.length === 2 &&
          typeof contract.args[1] === 'bigint'
        ) {
          const currentAllowance = await readContract(wagmiConfig, {
            address: contract.address,
            abi: contract.abi,
            functionName: 'allowance',
            args: [address, contract.args[0]],
          });
          // If we already have sufficient allowance, skip this approval
          if (currentAllowance >= contract.args[1]) {
            continue;
          }
        }
        hash = await writeContractRegular({
          address: contract.address,
          abi: contract.abi,
          functionName: contract.functionName,
          args: contract.args,
        });
      }
      if (hash) {
        setTransactionId(hash);
      }
    } catch (error) {
      const isUserRejectedError =
        error.message?.includes('User denied connection request') ||
        isUserRejectedRequestError(error);
      const errorCode = isUserRejectedError
        ? CheckoutErrorCode.USER_REJECTED_ERROR
        : CheckoutErrorCode.UNEXPECTED_ERROR;
      const errorMessage = isUserRejectedError
        ? USER_REJECTED_ERROR
        : GENERIC_ERROR_MESSAGE;
      if (isUserRejectedError) {
        userRejectedRef.current = true;
      }
      setErrorMessage(errorMessage);
      // Add this helper function at the top of the file, after imports
      function safeStringifyError(error) {
        return JSON.stringify(error, (_, value) =>
          typeof value === 'bigint' ? value.toString() : value,
        );
      }
      updateLifecycleStatus({
        statusName: CHECKOUT_LIFECYCLESTATUS.ERROR,
        statusData: {
          code: errorCode,
          error: safeStringifyError(error),
          message: errorMessage,
        },
      });
    }
  }, [
    address,
    appearance,
    chainId,
    chargeId,
    connectAsync,
    errorMessage,
    fetchData,
    isConnected,
    useExperimental,
    isSponsored,
    lifecycleStatus.statusName,
    paymaster,
    switchChainAsync,
    updateLifecycleStatus,
    wagmiConfig,
    writeContractsAsync,
    writeContractRegular,
  ]);
  const value = useValue({
    errorMessage,
    lifecycleStatus,
    onSubmit: handleSubmit,
    updateLifecycleStatus,
  });
  return /*#__PURE__*/ jsx(CheckoutContext.Provider, {
    value: value,
    children: children,
  });
}
export { CheckoutContext, CheckoutProvider, useCheckoutContext };
//# sourceMappingURL=CheckoutProvider.js.map
