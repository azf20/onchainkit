import type { BuildSendTransactionResponse } from '../../api/types';
import type { Token } from '../../token';
import { type Address } from 'viem';
type UseSendTransactionParams = {
    recipientAddress: Address;
    token: Token | null;
    amount: string;
};
export declare function useSendTransaction({ recipientAddress, token, amount, }: UseSendTransactionParams): BuildSendTransactionResponse;
export {};
//# sourceMappingURL=useSendTransaction.d.ts.map