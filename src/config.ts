export const AppConfig = {
  baseUrl: String(process.env.REACT_APP_COLDSTACK_S3_ENDPOINT || ""),
  urlAuthNode: String(process.env.REACT_APP_AUTHNODE_URL || ""),
  apiUrl: String(process.env.REACT_APP_API_URL || ""),
  withdrawalUrl: String(process.env.REACT_APP_WITHDRAWAL_API_URL || ""),
  depositingWallet: String(process.env.REACT_APP_DEPOSITING_KEY || ""),
  wsUrl: String(process.env.REACT_APP_WS_API_URL || ""),
  rpcUrl: String(process.env.REACT_APP_RPC_API_URL || ""),
  ethTokenAddress: String(process.env.REACT_APP_ETH_TOKEN_ADDRESS),
  bscTokenAddress: String(process.env.REACT_APP_BSC_TOKEN_ADDRESS),
  type: String(process.env.REACT_APP_TYPE),
  isProd: process.env.REACT_APP_ENV === "production",
  technicalProcess: process.env.REACT_APP_TECHNICAL_PROCESS === "true" ? true : false,
  stakingUrl: String(process.env.REACT_APP_STAKING_ENDPOINT || ""),
};
