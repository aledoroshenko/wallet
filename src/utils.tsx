import { TNetwork, TTransaction } from "./reducer";

export function cleanupTransactions(transactions: TTransaction[]) {
  return transactions.map(({ blockNumber, timeStamp, value }) => ({
    blockNumber,
    timeStamp,
    value,
  }));
}

export function getUrlsForNetwork(network: TNetwork, accountId: string) {
  const apiKey = "PAX4HJUWPXC5TMG26IAHITAH2EIV6WFWHC";

  if (network === "mainnet") {
    return {
      accountBalanceUrl: `https://api.etherscan.io/api?module=account&action=balance&address=${accountId}&apikey=${apiKey}`,
      accountTransactionsUrl: `https://api.etherscan.io/api?module=account&action=txlist&sort=desc&address=${accountId}&apikey=${apiKey}`,
    };
  }

  return {
    accountBalanceUrl: `https://api-rinkeby.etherscan.io/api?module=account&action=balance&address=${accountId}&apikey=${apiKey}`,
    accountTransactionsUrl: `https://api-rinkeby.etherscan.io/api?module=account&action=txlist&sort=desc&address=${accountId}&apikey=${apiKey}`,
  };
}
