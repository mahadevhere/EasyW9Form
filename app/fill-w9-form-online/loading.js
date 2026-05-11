export default function FormLoading() {
  return (
    <div style={{
      maxWidth: 1280,
      margin: '0 auto',
      padding: '24px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 32,
      minHeight: 'calc(100vh - 72px)',
    }}>
      {/* Left panel skeleton */}
      <div style={{
        background: 'white',
        borderRadius: 20,
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
      }}>
        {/* Progress bar */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          gap: 8,
        }}>
          {[1,2,3,4,5].map(i => (
            <div key={i} style={{
              flex: 1,
              height: 6,
              borderRadius: 3,
              background: i === 1 ? '#2563EB' : '#e2e8f0',
            }} />
          ))}
        </div>

        {/* Form body */}
        <div style={{ padding: '32px 24px' }}>
          {/* Step label */}
          <div style={{
            width: 120,
            height: 14,
            borderRadius: 4,
            background: '#e2e8f0',
            marginBottom: 8,
            animation: 'pulse 1.5s ease-in-out infinite',
          }} />
          {/* Title */}
          <div style={{
            width: 260,
            height: 24,
            borderRadius: 6,
            background: '#e2e8f0',
            marginBottom: 32,
            animation: 'pulse 1.5s ease-in-out infinite',
            animationDelay: '0.1s',
          }} />

          {/* Field 1 */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ width: 100, height: 12, borderRadius: 4, background: '#e2e8f0', marginBottom: 8, animation: 'pulse 1.5s ease-in-out infinite', animationDelay: '0.2s' }} />
            <div style={{ width: '100%', height: 48, borderRadius: 12, background: '#f1f5f9', border: '1px solid #e2e8f0', animation: 'pulse 1.5s ease-in-out infinite', animationDelay: '0.3s' }} />
          </div>

          {/* Field 2 */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ width: 160, height: 12, borderRadius: 4, background: '#e2e8f0', marginBottom: 8, animation: 'pulse 1.5s ease-in-out infinite', animationDelay: '0.4s' }} />
            <div style={{ width: '100%', height: 48, borderRadius: 12, background: '#f1f5f9', border: '1px solid #e2e8f0', animation: 'pulse 1.5s ease-in-out infinite', animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <div style={{ width: 80, height: 40, borderRadius: 10, background: '#e2e8f0' }} />
          <div style={{ width: 120, height: 40, borderRadius: 10, background: '#dbeafe' }} />
        </div>
      </div>

      {/* Right panel skeleton */}
      <div style={{
        background: 'white',
        borderRadius: 20,
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid #e2e8f0',
        }}>
          <div style={{ width: 140, height: 14, borderRadius: 4, background: '#e2e8f0' }} />
        </div>
        <div style={{
          padding: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 400,
        }}>
          <div style={{
            width: '100%',
            maxWidth: 400,
            height: 520,
            borderRadius: 8,
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            animation: 'pulse 1.5s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (max-width: 768px) {
          div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
