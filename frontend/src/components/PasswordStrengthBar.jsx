import React from 'react';
import zxcvbn from 'zxcvbn';

/**
 * PasswordStrengthBar – visual indicator of password strength.
 * Uses the `zxcvbn` library to compute a score (0‑4) and maps it to a colored bar.
 * Colors: red → orange → yellow → green → blue (strongest).
 */
const PasswordStrengthBar = ({ password }) => {
  const result = zxcvbn(password);
  const score = result.score; // 0‑4
  const colors = ['#e53e3e', '#dd6b20', '#d69e2e', '#38a169', '#2b6cb0'];

  return (
    <div style={{ width: '100%', height: '8px', background: '#2d3748', borderRadius: '4px' }}>
      <div
        style={{
          width: `${(score + 1) * 20}%`,
          height: '100%',
          background: colors[score],
          borderRadius: '4px',
        }}
      />
    </div>
  );
};

export default PasswordStrengthBar;
