import { useMorphoVault } from './useMorphoVault.js';
import { buildDepositToMorphoTx } from '../utils/buildDepositToMorphoTx.js';
import { parseUnits } from 'viem';

/**
 * Generates Call[] for a Morpho deposit transaction
 * to be used with <Transaction />
 */
function useBuildMorphoDepositTx({
  vaultAddress,
  receiverAddress,
  amount
}) {
  const _useMorphoVault = useMorphoVault({
      vaultAddress,
      address: receiverAddress
    }),
    asset = _useMorphoVault.asset,
    assetDecimals = _useMorphoVault.assetDecimals;
  if (!asset || !assetDecimals || !receiverAddress) {
    return {
      calls: []
    };
  }
  const parsedAmount = parseUnits(amount.toString(), assetDecimals);
  const calls = buildDepositToMorphoTx({
    receiverAddress,
    vaultAddress,
    tokenAddress: asset,
    amount: parsedAmount
  });
  return {
    calls
  };
}
export { useBuildMorphoDepositTx };
//# sourceMappingURL=useBuildMorphoDepositTx.js.map
