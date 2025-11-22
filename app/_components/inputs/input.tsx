//
interface InputProps {
    type?: React.HTMLInputTypeAttribute;
    error?: string;
    onInput?: React.FormEventHandler<HTMLInputElement>;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    className?: string;
    autoFocus?: boolean;
    placeholder?: string;
}

//
export default function Input({
    type = "text",
    error,
    onInput,
    onChange,
    className = "",
    autoFocus,
    placeholder = "Masukkan input",
}: InputProps) {
    return (
        <input
            type={type}
            onInput={onInput}
            onChange={onChange}
            autoFocus={autoFocus}
            placeholder={placeholder}
            className={`${
                error ? "border-red-300" : "border-gray-300"
            } ${className} w-full px-3 py-2 rounded-lg border-2 text-gray-600 transition-all`}
        />
    );
}
