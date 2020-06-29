import {
  Box,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "grommet";
import React from "react";

export function TransactionsList() {
  return (
    <React.Fragment>
      <Heading level={3} size="small">
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
          <TableRow>
            <TableCell scope="row">
              <strong>Eric</strong>
            </TableCell>
            <TableCell>12 June</TableCell>
            <TableCell>Coconut</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
