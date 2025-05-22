import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/docs");

  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <h1 className="mb-4 font-bold text-2xl">Welcome to TazeAI Docs</h1>
    </main>
  );
}
