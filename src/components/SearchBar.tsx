interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export default function SearchBar({ value, onChange, onSubmit }: Props) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
      style={{ marginBottom: '20px' }}
    >
      <input
        type="text"
        placeholder="Должность или компания"
        value={value}
        onChange={onChange}
        style={{ width: '100%', padding: '8px', fontSize: '16px' }}
      />
    </form>
  );
}
