"use client";

import { Layout } from "@/components/Layout";
import { useRouter } from "next/router";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <Layout>
      <Layout.Header 
        title="소속 팀 선택"
        handleBack={() => router.back()}
      />
      <Layout.Main>{children}</Layout.Main>
    </Layout>
  )
}