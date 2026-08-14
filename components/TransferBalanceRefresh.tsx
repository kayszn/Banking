"use client";

import { TRANSFER_PROCESSING_DURATION_MS } from "@/lib/utils";
import { type ReactNode, useEffect, useState } from "react";

const TransferBalanceRefresh = ({
  transactions,
  children,
}: {
  transactions: Transaction[];
  children: ReactNode;
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const nextCompletion = transactions
      .filter((transaction) => transaction.category === "Transfer")
      .map((transaction) => new Date(transaction.date).getTime())
      .filter(Number.isFinite)
      .map((createdAt) => createdAt + TRANSFER_PROCESSING_DURATION_MS)
      .filter((completionTime) => completionTime > Date.now())
      .sort((a, b) => a - b)[0];

    if (!nextCompletion) return;

    const timeout = window.setTimeout(
      () => {
        setIsUpdating(true);
        window.setTimeout(() => setIsUpdating(false), 1_100);
      },
      nextCompletion - Date.now() + 100,
    );

    return () => window.clearTimeout(timeout);
  }, [transactions]);

  return (
    <div className="relative">
      {isUpdating && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-transparent">
          <div
            aria-label="Updating transactions"
            className="size-7 animate-spin rounded-full border-4 border-blue-100 border-t-bankGradient"
            role="status"
          />
        </div>
      )}
      {children}
    </div>
  );
};

export default TransferBalanceRefresh;
