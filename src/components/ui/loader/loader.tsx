import { tv, type VariantProps } from "tailwind-variants";

const loader = tv({
    base: "animate-spin rounded-full border-solid border-t-transparent",
    variants: {
        size: {
            sm: "h-4 w-4 border-2",
            md: "h-6 w-6 border-2",
            lg: "h-8 w-8 border-3",
            xl: "h-12 w-12 border-4",
        },
        color: {
            primary: "border-blue-500",
            secondary: "border-gray-400",
            white: "border-white",
            black: "border-black",
        },
    },
    defaultVariants: {
        size: "md",
        color: "primary",
    },
});

interface LoaderProps extends VariantProps<typeof loader> {
    className?: string;
}

export default function Loader({ size, color, className }: LoaderProps) {
    return <div className={loader({ size, color, className })} />;
}
