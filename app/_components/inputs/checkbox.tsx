"use client";

//
interface CheckboxProps {
    text: string;
    value: React.InputHTMLAttributes<HTMLInputElement>["value"];
    checked?: React.InputHTMLAttributes<HTMLInputElement>["checked"];
    onChange?: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
}

//
export default function Checkbox({
    text,
    value,
    checked,
    onChange,
}: CheckboxProps) {
    return (
        <label className="flex items-center gap-1">
            <input
                type="checkbox"
                value={value}
                checked={checked}
                onChange={onChange}
            />
            <span>{text}</span>
        </label>
    );
}
