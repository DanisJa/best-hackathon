// table.tsx
import React from "react";

/**
 * Common type for all table components,
 * allowing an optional className and required children.
 */
interface TableElementProps {
  children: React.ReactNode;
  className?: string;
}

export function Table({ children, className }: TableElementProps) {
  return (
    <div className="relative w-full overflow-auto">
      <table className={`w-full table-auto border-collapse ${className ?? ""}`}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className }: TableElementProps) {
  return <thead className={className}>{children}</thead>;
}

export function TableBody({ children, className }: TableElementProps) {
  return <tbody className={className}>{children}</tbody>;
}

export function TableRow({ children, className }: TableElementProps) {
  return (
    <tr
      className={`border-b transition-colors hover:bg-zinc-100/5 ${
        className ?? ""
      }`}
    >
      {children}
    </tr>
  );
}

export function TableHead({ children, className }: TableElementProps) {
  return (
    <th
      className={`h-12 px-4 text-left align-middle font-medium text-zinc-500 [&:has([role=checkbox])]:pr-0 ${
        className ?? ""
      }`}
    >
      {children}
    </th>
  );
}

export function TableCell({ children, className }: TableElementProps) {
  return (
    <td
      className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${
        className ?? ""
      }`}
    >
      {children}
    </td>
  );
}
