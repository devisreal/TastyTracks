import Link from "next/link";

export default function NotFound() {
  return (
    <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <p class="font-clash text-base font-semibold text-primary-600 sm:text-lg">
          404
        </p>
        <h1 class="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl ">
          Page not found
        </h1>
        <p class="mt-2 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div class="mt-6 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            class="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Go back home
          </Link>
          <Link href="/contact" class="text-sm font-semibold text-gray-900">
            Contact support{" "}
            <span aria-hidden="true" className="ml-1">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
