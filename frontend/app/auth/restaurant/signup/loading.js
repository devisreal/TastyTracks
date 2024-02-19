import { Loader } from "@mantine/core";

export default function Loading() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-12">
      <Loader type="bars" color="primary" />
    </div>
  );
}
