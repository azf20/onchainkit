import { RequestContext } from '../core/network/constants.js';
import { CDP_MINT_TOKEN } from '../core/network/definitions/nft.js';
import { sendRequest } from '../core/network/request.js';

/**
 * Retrieves contract to mint an NFT
 */
async function buildMintTransaction(params, _context = RequestContext.API) {
  const mintAddress = params.mintAddress,
    tokenId = params.tokenId,
    _params$network = params.network,
    network = _params$network === void 0 ? '' : _params$network,
    quantity = params.quantity,
    takerAddress = params.takerAddress;
  try {
    const res = await sendRequest(CDP_MINT_TOKEN, [{
      mintAddress,
      network,
      quantity,
      takerAddress,
      tokenId
    }], RequestContext.API);
    if (res.error) {
      return {
        code: `${res.error.code}`,
        error: 'Error building mint transaction',
        message: res.error.message
      };
    }
    return res.result;
  } catch (_error) {
    return {
      code: 'uncaught-nft',
      error: 'Something went wrong',
      message: 'Error building mint transaction'
    };
  }
}
export { buildMintTransaction };
//# sourceMappingURL=buildMintTransaction.js.map
