import TaskCard from "@/components/ui/TaskCard";
import { useFetchByIdHook } from "@/hooks/useFetchUserByidhook";

export default function HomePage() {
  const { isLoading, isError, error, isSuccess, userData } = useFetchByIdHook();

  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Error: {error.message}</p>;

  return <TaskCard />;
}
