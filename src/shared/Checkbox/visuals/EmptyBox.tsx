import React from 'react';

export function EmptyBox({ className }: { className?: string }) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" className={className}>
      <path
        fill="currentColor"
        d="M14.286 0H1.714C.767 0 0 .767 0 1.714v12.572C0 15.233.767 16 1.714 16h12.572c.947 0 1.714-.768 1.714-1.714V1.714C16 .767 15.232 0 14.286 0zm0 14.286H1.714V1.714h12.572v12.572z"
      />
    </svg>
  );
}
