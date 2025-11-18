//
interface LabelProps {
    text?: string;
    error?: string;
    children?: React.ReactNode;
}

//
export default function Label({
    text = "Masukkan input",
    error,
    children,
}: LabelProps) {
    return (
        <div className="flex flex-col items-start gap-1 *:w-full">
            <label className="space-y-2">
                <p>{text}</p>
                {children && children}
            </label>
            <p className="text-sm text-red-400">{error}</p>
        </div>
    );
}
