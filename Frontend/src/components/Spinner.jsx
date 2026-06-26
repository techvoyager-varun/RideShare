function Spinner({ scale }) {
  return (
    <div className={`flex justify-center items-center scale-${scale || 1}`}>
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-black dark:text-white" style={{ display: 'inline-block' }}>
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="60" strokeDashoffset="40">
          <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur=".8s" repeatCount="indefinite"/>
        </circle>
      </svg>
    </div>
  );
}
export default Spinner;
