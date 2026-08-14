"use client";

import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { transactionCategoryStyles } from "@/constants";

import {
  cn,
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters,
} from "@/lib/utils";

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const { borderColor, backgroundColor, textColor, chipBackgroundColor } =
    transactionCategoryStyles[
      category as keyof typeof transactionCategoryStyles
    ] || transactionCategoryStyles.default;

  return (
    <div className={cn("category-badge", borderColor, chipBackgroundColor)}>
      <div className={cn("size-2 rounded-full", backgroundColor)} />

      <p className={cn("text-[12px] font-medium", textColor)}>{category}</p>
    </div>
  );
};

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
  const [, setCurrentTime] = useState(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setCurrentTime(Date.now()), 1_000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-auto">
      <Table className="w-full min-w-[750px]">
        <TableHeader className="bg-[#F9FAFB]">
          <TableRow>
            <TableHead className="px-2">Transaction</TableHead>

            <TableHead className="px-2">Amount</TableHead>

            <TableHead className="px-2">Status</TableHead>

            <TableHead className="px-2">Date</TableHead>

            <TableHead className="px-2 max-md:hidden">Channel</TableHead>

            <TableHead className="px-2 max-md:hidden">Category</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((t: Transaction) => {
            const status = getTransactionStatus(new Date(t.date));

            const amount = formatAmount(t.amount);

            const isDebit = t.type === "debit";
            const isCredit = t.type === "credit";

            return (
              <TableRow
                key={t.id}
                className={`${
                  isDebit || amount[0] === "-" ? "bg-[#FFFBFA]" : "bg-[#F6FEF9]"
                } !border-b`}
              >
                <TableCell className="max-w-[250px] px-2">
                  <div className="flex min-w-0 items-center gap-3">
                    <h1 className="text-14 truncate font-semibold text-[#344054]">
                      {removeSpecialCharacters(t.name)}
                    </h1>
                  </div>
                </TableCell>

                <TableCell
                  className={`whitespace-nowrap px-2 font-semibold ${
                    isDebit || amount[0] === "-"
                      ? "text-[#f04438]"
                      : "text-[#039855]"
                  }`}
                >
                  {isDebit ? `- ${amount}` : isCredit ? `+ ${amount}` : amount}
                </TableCell>

                <TableCell className="whitespace-nowrap px-2">
                  <CategoryBadge category={status} />
                </TableCell>

                <TableCell className="whitespace-nowrap px-2">
                  {formatDateTime(new Date(t.date)).dateTime}
                </TableCell>

                <TableCell className="whitespace-nowrap px-2 capitalize max-md:hidden">
                  {t.paymentChannel}
                </TableCell>

                <TableCell className="whitespace-nowrap px-2">
                  <CategoryBadge category={t.category} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsTable;
