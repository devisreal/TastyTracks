import { Button } from "@mantine/core";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-clash text-3xl font-medium">Tasty Tracks</h1>

      <div className="flex gap-x-4">
        <Button variant="filled" color="primary">
          Primary Button
        </Button>
        <Button variant="filled" color="secondary">
          Secondary Button
        </Button>
      </div>
    </main>
  );
}
