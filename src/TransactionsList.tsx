import {
  Box,
  Button,
  Heading,
  Layer,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from "grommet";
import React from "react";
import { TTransaction } from "./reducer";
import QRCode from "react-qr-code";

type TTransactionsListProps = {
  id: string;
  transactions: TTransaction[];
  balance: string;
};

function formatDate(timeStamp: number) {
  const date = new Date(timeStamp * 1000);

  return new Intl.DateTimeFormat("en-GB").format(date);
}

export function TransactionsList({
  id,
  transactions,
  balance,
}: TTransactionsListProps) {
  const [show, setShow] = React.useState();
  const onClose = () => setShow(undefined);

  return (
    <React.Fragment>
      <Heading level={3} size="small" onClick={() => setShow(true)}>
        {id}
      </Heading>

      <Heading level={4} size="small">
        Balance: {balance}
      </Heading>

      <Heading level={4} size="small">
        Transactions
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

      {show ? (
        <Layer position="center" onClickOutside={onClose} onEsc={onClose}>
          <Box pad="medium" gap="small" width="medium">
            <Heading level={3} margin="none">
              Scan QR code
            </Heading>
            <Box alignContent="center" justify="center">
              <QRCode value={id} />
            </Box>
            <Box
              as="footer"
              gap="small"
              direction="row"
              align="center"
              justify="end"
              pad={{ top: "medium", bottom: "small" }}
            >
              <Button
                label={
                  <Text color="white">
                    <strong>Close</strong>
                  </Text>
                }
                onClick={onClose}
                primary
                color="status-critical"
              />
            </Box>
          </Box>
        </Layer>
      ) : null}
    </React.Fragment>
  );
}
