import { useState } from 'react';

export function BuggyComponent(): React.ReactElement {
  const [throwError, setThrowError] = useState(false);

  const handleClick = (): void => {
    setThrowError(true);
  };
  if (throwError) {
    throw new Error('Error caused by pressing a button');
  }

  return (
    <button className="crash-btn" onClick={handleClick}>
      Error
    </button>
  );
}
