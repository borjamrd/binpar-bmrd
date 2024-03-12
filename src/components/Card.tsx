/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { colorVariants, shadowVariants } from "@/utils/utils";

export default function Card({ color, children }: { color?: string, children: React.ReactNode }) {
    return (
        <div className={`flex inset-0 flex-col items-center justify-center min-w-96 rounded-xl p-10 ${color && shadowVariants[color]} lg:min-w-64 relative ${color && colorVariants[color]}`}>
            {children}
        </div>
    );
}
