import './modal-widget.css';

type Callbacks = {
  setMethaneColumn: (value: string) => void;
  setMethanePerCapitaColumn: (value: string) => void;
};

type ModalWidgetProps = {
  onClose: () => void;
  callbacks: Callbacks;
}

export function ModalWidget({ onClose, callbacks }: ModalWidgetProps) {
  const additionalColumns = {
    methane: 'setMethaneColumn',
    methane_per_capita: 'setMethanePerCapitaColumn',
    // 'oil_co2',
    // 'oil_co2_per_capita'
  }

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const columnKey = e.target.value as keyof typeof additionalColumns;
    const setterName = additionalColumns[columnKey];
    const setter = callbacks[setterName as keyof typeof callbacks];
    if (setter) {
      setter(columnKey);
    };
  }
  return (
    <div className="modal-wrapper" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <select name="columns" id="columns" onChange={onChange}>
          <option value="">Choose column</option>
          {Object.keys(additionalColumns).map((column) => (
            <option key={column} value={column}>{column}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
