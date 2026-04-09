"use client";

import { Suspense } from "react";
import ChatInner from "./ChatInner";

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="p-10">Loading...</div>}>
      <ChatInner />
    </Suspense>
  );
}
   
