"use client";

import { ArrowDownIcon, ArrowUpIcon, DollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function FinanceDashboard() {
  // Mock data - replace with actual data in a real application
  const financialSummary = {
    totalIncome: 5000,
    totalExpenses: 3500,
    balance: 1500,
  };

  //const { data: session } = useSession();

  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.back();
  };

  const recentTransactions = [
    {
      id: 1,
      description: "Salary",
      amount: 5000,
      type: "income",
      date: "2023-05-01",
    },
    {
      id: 2,
      description: "Rent",
      amount: 1500,
      type: "expense",
      date: "2023-05-02",
    },
    {
      id: 3,
      description: "Groceries",
      amount: 200,
      type: "expense",
      date: "2023-05-03",
    },
    {
      id: 4,
      description: "Utilities",
      amount: 150,
      type: "expense",
      date: "2023-05-04",
    },
    {
      id: 5,
      description: "Freelance Work",
      amount: 1000,
      type: "income",
      date: "2023-05-05",
    },
  ];

  const expensePercentage =
    (financialSummary.totalExpenses / financialSummary.totalIncome) * 100;

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6">Finance Dashboard</h1>
        <Button variant="destructive" onClick={handleSignOut}>
          Sair
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${financialSummary.totalIncome.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${financialSummary.totalExpenses.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Balance
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${financialSummary.balance.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Income vs Expenses</CardTitle>
          <CardDescription>Your financial health at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={expensePercentage} className="w-full" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <div>Income</div>
            <div>Expenses ({expensePercentage.toFixed(0)}%)</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest financial activities</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    {transaction.type === "income" ? (
                      <span className="flex items-center text-green-600">
                        <ArrowUpIcon className="w-4 h-4 mr-1" />
                        Income
                      </span>
                    ) : (
                      <span className="flex items-center text-red-600">
                        <ArrowDownIcon className="w-4 h-4 mr-1" />
                        Expense
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
