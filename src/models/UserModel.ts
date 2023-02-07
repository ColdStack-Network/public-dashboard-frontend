export type UserInfo = {
  alphaTesterWalletConnected: boolean | null;
  arn: string;
  createdAt: Date;
  email: string | null;
  emailVerified: boolean | null;
  id: string;
  publicKey: string;
};

export type JWTUserPayload = {
  iat: number;
  sub: {
    public: string;
    user: UserInfo;
  };
};

export type MeRep = {
  id: string;
  createdAt: Date;
  publicKey: string;
  email?: string;
  emailVerified?: boolean;
  alphaTesterWalletConnected?: boolean;
  arn: string;
};
