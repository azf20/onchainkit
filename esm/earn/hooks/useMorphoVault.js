import { MORPHO_VAULT_ABI } from '../abis/morpho.js';
import { MORPHO_TOKEN_BASE_ADDRESS } from '../constants.js';
import calculateMorphoRewards from '../utils/calculateMorphoRewards.js';
import { fetchMorphoApy } from '../utils/fetchMorphoApy.js';
import { useQuery } from '@tanstack/react-query';
import { formatUnits } from 'viem';
import { useReadContracts, useReadContract } from 'wagmi';
function useMorphoVault({
  vaultAddress,
  address
}) {
  const _useReadContracts = useReadContracts({
      contracts: [{
        abi: MORPHO_VAULT_ABI,
        address: vaultAddress,
        functionName: 'asset'
      }, {
        abi: MORPHO_VAULT_ABI,
        address: vaultAddress,
        functionName: 'name'
      }, {
        abi: MORPHO_VAULT_ABI,
        address: vaultAddress,
        functionName: 'decimals'
      }],
      query: {
        enabled: !!vaultAddress
      }
    }),
    data = _useReadContracts.data,
    status = _useReadContracts.status;

  // Fetching separately because user may not be connected
  const _useReadContract = useReadContract({
      abi: MORPHO_VAULT_ABI,
      address: vaultAddress,
      functionName: 'balanceOf',
      args: [address],
      query: {
        enabled: !!vaultAddress && !!address
      }
    }),
    balance = _useReadContract.data;
  const _useQuery = useQuery({
      queryKey: ['morpho-apy', vaultAddress],
      queryFn: () => fetchMorphoApy(vaultAddress)
    }),
    vaultData = _useQuery.data;
  const morphoApr = vaultData?.state ? calculateMorphoRewards(vaultData?.state) : 0;
  const formattedBalance = balance && vaultData?.asset?.decimals ? formatUnits(balance, vaultData?.asset.decimals) : undefined;
  return {
    status,
    asset: data?.[0].result,
    assetSymbol: vaultData?.symbol,
    assetDecimals: vaultData?.asset?.decimals,
    vaultDecimals: data?.[2].result,
    name: data?.[1].result,
    balance: formattedBalance,
    totalApy: vaultData?.state?.netApy,
    nativeApy: vaultData?.state?.netApyWithoutRewards,
    rewards: [{
      asset: MORPHO_TOKEN_BASE_ADDRESS,
      assetName: 'Morpho',
      apy: morphoApr
    }, ...(vaultData?.state?.rewards.map(reward => ({
      asset: reward.asset.address,
      assetName: reward.asset.name,
      apy: reward.supplyApr
    })) || [])]
  };
}
export { useMorphoVault };
//# sourceMappingURL=useMorphoVault.js.map
