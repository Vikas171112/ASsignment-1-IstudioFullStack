import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchInput({
  type = "text",
  placeholder = "Search...",
  value,
  onChange,
}) {
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <Button type="submit" variant="outline">
        Search
      </Button>
    </div>
  );
}
