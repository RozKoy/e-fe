interface LabelProps {
    children: React.ReactNode;
    text?: string;
    error?: string;
}

export default function Label({
    children,
    text = "Masukkan input",
    error,
}: LabelProps) {
    return (
        <div className="flex flex-col items-start gap-1 *:w-full">
            <label className="space-y-2">
                <p>{text}</p>
                {children}
            </label>
            <p className="text-sm text-red-400">{error}</p>
        </div>
    );
}
