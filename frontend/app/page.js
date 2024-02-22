import Link from "next/link";

export default function Home() {  
  return (
    <div className="p-3">
      <h1 className="font-clash text-3xl font-medium">Tasty Tracks</h1>

      <div className="flex gap-x-3">
        <Link href="/auth/login">Login</Link>
        <Link href="/auth/customer/signup">Signup</Link>
        <Link href="/auth/restaurant/signup">Signup(Restaurant)</Link>
      </div>
    </div>
  );
}
