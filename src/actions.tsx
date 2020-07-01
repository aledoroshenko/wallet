import { getUrlsForNetwork } from "./utils";
import { TDispatch, TNetwork } from "./reducer";

export async function requestAccountData(
  dispatch: TDispatch,
  address: string,
  network: TNetwork
) {
  dispatch({ type: "ACCOUNT_DATA_REQUESTED" });

  const { accountBalanceUrl, accountTransactionsUrl } = getUrlsForNetwork(
    network,
    address
  );

  let transactionsResponse = await fetch(accountTransactionsUrl);

  let { result: transactions } = await transactionsResponse.json();

  let balanceResponse = await fetch(accountBalanceUrl);
  let { result: balance } = await balanceResponse.json();

  dispatch({
    type: "ACCOUNT_DATA_RECEIVED",
    data: {
      transactions: transactions.slice(0, 10),
      balance,
      address,
      network,
    },
  });
}
