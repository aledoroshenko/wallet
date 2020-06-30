import {
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "grommet";
import React from "react";
import { TTransaction } from "./reducer";

type TTransactionsListProps = {
  id: string;
  transactions: TTransaction[];
};

function formatDate(timeStamp: number) {
  const date = new Date(timeStamp * 1000);

  return new Intl.DateTimeFormat("en-GB").format(date);
}

export function TransactionsList({ id, transactions }: TTransactionsListProps) {
  return (
    <React.Fragment>
      <Heading level={3} size="small">
        Transactions for {id}
      </Heading>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell scope="col" border="bottom">
              Block number
            </TableCell>
            <TableCell scope="col" border="bottom">
              Date
            </TableCell>
            <TableCell scope="col" border="bottom">
              Value
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map(({ blockNumber, value, timeStamp }) => {
            return (
              <TableRow key={blockNumber}>
                <TableCell scope="row">
                  <strong>{blockNumber}</strong>
                </TableCell>
                <TableCell>{formatDate(timeStamp)}</TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
