interface CheckboxProps {
    text: string;
    value: string | number;
}

export default function Checkbox({ text, value }: CheckboxProps) {
    return (
        <label className="flex items-center gap-1">
            <input type="checkbox" value={value} />
            <span>{text}</span>
        </label>
    );
}
