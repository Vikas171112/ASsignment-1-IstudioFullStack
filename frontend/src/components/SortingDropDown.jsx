import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import React from "react";

export default function SortingDropDown({ sortBy, setSortBy }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border px-3 py-1 rounded text-sm bg-white shadow hover:bg-gray-50">
        Sort
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setSortBy("newest")}>
          {sortBy === "newest" ? "✔" : ""} Created : Newest First
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortBy("oldest")}>
          {sortBy === "oldest" ? "✔" : ""} Created : Oldest First
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortBy("title-asc")}>
          {sortBy === "title-asc" ? "✔" : ""} Title : A-Z
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortBy("title-desc")}>
          {sortBy === "title-desc" ? "✔" : ""} Title : Z-A
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
