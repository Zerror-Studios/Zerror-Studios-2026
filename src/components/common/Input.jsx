export const Input = ({ label, type = "text", name, onChange }) => (
  <div className="form relative text-white">
    <input
      type={type}
      name={name}
      required
      onChange={(e) => onChange(name, e.target.value)}
      className="font-thin"
    />
    <label className="label-name">
      <span className="content-name font-thin">{label}</span>
    </label>
  </div>
);