//
interface CheckboxProps {
    text: string;
    value: string | number;
    checked?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
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
