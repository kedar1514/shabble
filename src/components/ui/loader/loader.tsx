import { tv } from "tailwind-variants";

const tileLoader = tv({
  base: "animate-spin rounded-md sm:rounded-xl md:rounded-xl bg-yellow-400 h-8 w-8 md:h-12 md:w-12 z-0",
});

interface TileLoaderProps {
  className?: string;
}

export default function TileLoader({ className }: TileLoaderProps) {
  return <div className={tileLoader({ className })} />;
}