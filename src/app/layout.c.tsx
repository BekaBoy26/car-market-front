"use client"
import Header from "@/components/layout/header/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

type ChildrenProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: ChildrenProps) => {
  const qc = new QueryClient();
  return (
    <QueryClientProvider client={qc}>
      <div className="layout">
        <Header/>
        <main>{children}</main>
      </div>
    </QueryClientProvider>
  );
};

export default Layout;
