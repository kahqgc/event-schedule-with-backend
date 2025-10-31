export default function ControlButton({ onClick, children }) {
  return (
    <button className="control" onClick={onClick}>
      {children}
    </button>
  );
}
