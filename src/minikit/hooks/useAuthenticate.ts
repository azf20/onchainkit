import { useCallback, useState } from 'react';
import sdk from "@farcaster/frame-sdk";
import { SignIn as SignInCore } from "@farcaster/frame-sdk";

type UseAuthenticateProps = {
  signInOptions?: SignInCore.SignInOptions;
}

export const useAuthenticate = ({ signInOptions }: UseAuthenticateProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<SignInCore.SignInResult | null>(() => {
    // get session from storage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('farcaster_user');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  const login = useCallback(async () => {
    try {
      console.log('signInOptions', signInOptions);
      setIsLoading(true);
      // Generate exactly 8 chars using base36
      const nonce = [...Array(8)].map(() => 
        Math.floor(Math.random() * 36).toString(36)
      ).join('');
      console.log('nonce', nonce);
      const result = await sdk.actions.signIn({ nonce, ...signInOptions });
      setUser(result);
      // save session to storage
      localStorage.setItem('farcaster_user', JSON.stringify(result));
      return result;
    } catch (e) {
      if (e instanceof SignInCore.RejectedByUser) {
        throw new Error("Rejected by user");
      }
      throw new Error("Authentication failed");
    } finally {
      setIsLoading(false);
    }
  }, [signInOptions]);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      setUser(null);
      localStorage.removeItem('farcaster_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    login,
    logout,
    isLoading,
    authenticated: !!user,
    user,
  };
}; 