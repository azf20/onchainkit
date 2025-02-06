import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';

const DOMAIN = '80b6-2600-1f18-24c9-6105-5-0-4-706.ngrok-free.app';
const FARCASTER_PRIVATE_KEY = 'your-farcaster-private-key';

async function generateAccountAssociation() {
  // Create wallet client
  const account = privateKeyToAccount(FARCASTER_PRIVATE_KEY);
  const client = createWalletClient({
    account,
    chain: mainnet,
    transport: http()
  });

  // Create payload
  const payload = {
    domain: DOMAIN
  };

  // Create header
  const header = {
    t: "farcaster",
    v: 2
  };

  // Base64URL encode header and payload
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');

  // Sign the message
  const messageToSign = `${encodedHeader}.${encodedPayload}`;
  const signature = await client.signMessage({ message: messageToSign });
  const encodedSignature = Buffer.from(signature.slice(2), 'hex').toString('base64url');

  // Create accountAssociation object
  const accountAssociation = {
    header: encodedHeader,
    payload: encodedPayload,
    signature: encodedSignature
  };

  console.log('Generated Account Association:');
  console.log(JSON.stringify(accountAssociation, null, 2));

  return accountAssociation;
}

generateAccountAssociation().catch(console.error);