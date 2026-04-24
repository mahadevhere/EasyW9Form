'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [detailed, setDetailed] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDraft, setSelectedDraft] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [testData, setTestData] = useState({ name: 'TEST USER', taxId: '000-00-0000', street: '123 ADMIN BLVD', city: 'SYSTEM', state: 'NY', zip: '10001' });
  const router = useRouter();

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000); // 15s polling
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [payRes, detailRes] = await Promise.all([
        fetch('/api/admin/payments'),
        fetch('/api/admin/detailed-stats')
      ]);

      if (payRes.status === 401) { router.push('/admin'); return; }
      
      const [payData, detailData] = await Promise.all([
        payRes.json(),
        detailRes.json()
      ]);

      setStats(payData.stats);
      setPayments(payData.payments);
      setDetailed(detailData);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  };

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
      <div className="admin-spinner" />
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: 280, background: '#1E293B', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 800, fontSize: 20 }}>
            <div style={{ background: 'var(--primary)', padding: 6, borderRadius: 6, display: 'flex' }}>
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M14.5 2h-8.5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/></svg>
            </div>
            EasyW9 Admin
          </div>
        </div>

        <nav style={{ flex: 1, padding: '24px 12px' }}>
          {[
            { id: 'overview', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', label: 'Overview' },
            { id: 'transactions', icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', label: 'Transactions' },
            { id: 'customers', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', label: 'Customers' },
            { id: 'test', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', label: 'PDF Lab' },
            { id: 'settings', icon: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z', label: 'Settings' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 8,
                border: 'none', background: activeTab === item.id ? 'var(--primary)' : 'transparent',
                color: activeTab === item.id ? 'white' : '#94A3B8', fontWeight: 600, cursor: 'pointer', marginBottom: 4,
                transition: 'all 0.2s'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
           <button onClick={handleLogout} style={{ width: '100%', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '10px', borderRadius: 6, fontWeight: 600 }}>Log Out</button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflowY: 'auto', padding: 40 }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>System {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
            <p style={{ color: '#64748B' }}>Monitor your platform's performance and tax documents.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
             <button 
                onClick={fetchData} 
                style={{ background: 'white', border: '1px solid var(--border)', padding: '8px 16px', borderRadius: 100, fontSize: 13, fontWeight: 700, color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: 'var(--shadow-sm)' }}
             >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={loading ? 'admin-spinner' : ''}><path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                Sync Data
             </button>
             <div style={{ background: 'white', padding: '8px 16px', borderRadius: 100, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: '#64748B' }}>
                <span style={{ width: 8, height: 8, background: '#10B981', borderRadius: '50%' }} />
                LIVE · {lastUpdated || 'Initialing...'}
             </div>
          </div>
        </header>

        {/* KPI CARDS */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '32px' }}>
           <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
             <h3 style={{ margin: 0, fontSize: '24px', color: '#0F172A' }}>{stats?.totalRevenue ? `$${stats.totalRevenue}` : '--'}</h3>
             <p style={{ margin: 0, color: '#64748B' }}>Total Revenue</p>
           </div>
           <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
             <h3 style={{ margin: 0, fontSize: '24px', color: '#0F172A' }}>{stats?.totalPayments ?? '--'}</h3>
             <p style={{ margin: 0, color: '#64748B' }}>Payments Received</p>
           </div>
           <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
             <h3 style={{ margin: 0, fontSize: '24px', color: '#0F172A' }}>{stats?.capturedPayments ?? '--'}</h3>
             <p style={{ margin: 0, color: '#64748B' }}>Captured Payments</p>
           </div>
           <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
             <h3 style={{ margin: 0, fontSize: '24px', color: '#0F172A' }}>{detailed?.topCustomers?.length ?? '--'}</h3>
             <p style={{ margin: 0, color: '#64748B' }}>Active Customers</p>
           </div>
         </section>

        {activeTab === 'overview' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 40 }}>
              {/* Growth Chart */}
              <div style={{ background: 'white', padding: 24, borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                 <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24 }}>7-Day Order Volume</h3>
                 <div style={{ height: 200, display: 'flex', alignItems: 'flex-end', gap: 20, paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>
                    {detailed?.chartData?.length > 0 ? detailed.chartData.map((d, i) => {
                      const max = Math.max(...detailed.chartData.map(cd => cd.count), 1);
                      const height = (d.count / max) * 150;
                      return (
                        <div key={d.date} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: '100%', background: 'var(--primary)', borderRadius: '4px 4px 0 0', height: height || 2, minHeight: 2, transition: 'height 1s ease' }} />
                          <div style={{ fontSize: 10, color: '#94A3B8', whiteSpace: 'nowrap' }}>{d.date.slice(5)}</div>
                        </div>
                      );
                    }) : <div style={{ width: '100%', textAlign: 'center', color: '#94A3B8' }}>No data trends available yet.</div>}
                 </div>
              </div>

              {/* Distro Chart */}
              <div style={{ background: 'white', padding: 24, borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                 <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24 }}>ID Distribution</h3>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {['SSN', 'EIN'].map(type => {
                      const val = detailed?.docTypeDistribution?.[type] || 0;
                      const total = (detailed?.docTypeDistribution?.SSN || 0) + (detailed?.docTypeDistribution?.EIN || 0) || 1;
                      const pct = Math.round((val / total) * 100);
                      return (
                        <div key={type}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                            <span>{type}</span>
                            <span>{pct}%</span>
                          </div>
                          <div style={{ height: 8, background: '#F1F5F9', borderRadius: 4, overflow: 'hidden' }}>
                            <div style={{ width: `${pct}%`, height: '100%', background: type === 'SSN' ? 'var(--primary)' : 'var(--accent)' }} />
                          </div>
                        </div>
                      );
                    })}
                 </div>
              </div>
            </div>
          </div>
        )}

          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div style={{ position: 'relative', width: 300 }}>
                    <input 
                      type="text" 
                      placeholder="Search by email..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13 }}
                    />
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                 </div>
                 <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Showing {(detailed?.topCustomers || []).filter(c => c.email.toLowerCase().includes(searchTerm.toLowerCase())).length} entries</div>
              </div>
              <div style={{ display: 'grid', gap: 0 }}>
                 {(detailed?.topCustomers || [])
                   .filter(c => c.email.toLowerCase().includes(searchTerm.toLowerCase()))
                   .map(c => (
                    <div key={c.email} style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'background 0.2s' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800 }}>{c.email[0].toUpperCase()}</div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 15 }}>{c.email}</div>
                          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                             <span style={{ 
                                background: c.status === 'Customer' ? '#DCFCE7' : '#EFF6FF',
                                color: c.status === 'Customer' ? '#166534' : '#2563EB',
                                padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, textTransform: 'uppercase'
                             }}>{c.status}</span>
                             <span style={{ fontSize: 10, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase' }}>DOCS: {c.count}</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                          <button 
                            onClick={async () => {
                               const query = c.email.includes('anonymous-') 
                                 ? `formId=${c.email.split('anonymous-')[1]}` 
                                 : `email=${encodeURIComponent(c.email)}`;
                               const res = await fetch(`/api/admin/draft-actions?${query}`);
                               if (res.ok) {
                                  const data = await res.json();
                                  if (!data) { alert("Record not found."); return; }
                                  setSelectedDraft(data);
                               } else alert("Could not fetch details.");
                            }}
                            style={{ background: 'none', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                          >View Activity</button>
                      </div>
                    </div>
                  ))}
              </div>
           </div>
        {activeTab === 'settings' && (
           <div style={{ animation: 'fadeIn 0.4s ease' }}>
              <div style={{ background: 'white', padding: 32, borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                 <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginBottom: 12 }}>System Settings</h3>
                 <p style={{ color: '#64748B', marginBottom: 32 }}>Manage core system functions and developer utilities.</p>
                 
                 <div style={{ border: '1px solid #FECACA', background: '#FEF2F2', padding: 24, borderRadius: 12 }}>
                    <h4 style={{ color: '#991B1B', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Danger Zone: System Reset</h4>
                    <p style={{ fontSize: 14, color: '#B91C1C', marginBottom: 20 }}>
                      This action will permanently delete all <strong>Lead Activity</strong> and <strong>Draft Sessions</strong> from the database.
                      Historical payments in Razorpay will NOT be affected.
                    </p>
                    
                    <button 
                      onClick={async () => {
                        const confirmStr = prompt('To confirm reset, type RESET_ALL below:');
                        if (confirmStr !== 'RESET_ALL') return;
                        
                        setLoading(true);
                        try {
                          const res = await fetch('/api/admin/reset', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ confirm: 'RESET_ALL' })
                          });
                          if (res.ok) {
                            alert('System successfully reset. All local drafts cleared.');
                            fetchData();
                          } else {
                            alert('Reset failed.');
                          }
                        } catch (e) {
                          alert('Error during reset.');
                        } finally {
                          setLoading(false);
                        }
                      }}
                      style={{ background: '#EF4444', color: 'white', border: 'none', padding: '12px 24px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}
                    >
                      Clear All Lead Activity (Reset to Zero)
                    </button>
                 </div>
              </div>
           </div>
        )}

        {/* DETAILS MODAL */}
        {selectedDraft && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
                <div style={{ background: 'white', width: '100%', maxWidth: 640, borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-xl)', animation: 'slideRight 0.3s ease' }}>
                    <div style={{ padding: '24px 32px', background: '#1E293B', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <div>
                          <h3 style={{ fontSize: 18, fontWeight: 700 }}>Lead Details</h3>
                          <div style={{ fontSize: 12, opacity: 0.7 }}>Form ID: {selectedDraft.formId}</div>
                       </div>
                       <button onClick={() => setSelectedDraft(null)} style={{ background: 'none', border: 'none', color: 'white', fontSize: 24, cursor: 'pointer' }}>×</button>
                    </div>
                    <div style={{ padding: 32, maxHeight: '80vh', overflowY: 'auto' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Customer Email</label>
                                <div style={{ fontSize: 15, fontWeight: 600 }}>{selectedDraft.email || '—'}</div>
                            </div>
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Session Status</label>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <span style={{ 
                                        background: selectedDraft.isPaid ? '#DCFCE7' : '#EFF6FF',
                                        color: selectedDraft.isPaid ? '#166534' : '#2563EB',
                                        padding: '4px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700, textTransform: 'uppercase'
                                    }}>{selectedDraft.isPaid ? 'PAID' : 'DRAFT'}</span>
                                    <span style={{ 
                                        background: '#F1F5F9',
                                        color: '#475569',
                                        padding: '4px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700, textTransform: 'uppercase'
                                    }}>{selectedDraft.deliveryStatus || 'CAPTURED'}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div style={{ background: '#F8FAFC', padding: 24, borderRadius: 12, border: '1px solid var(--border)' }}>
                            <label style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>Privacy & Technical Logs</label>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                <div>
                                    <label style={{ fontSize: 10, color: '#64748B', marginBottom: 4, display: 'block' }}>User IP Address</label>
                                    <div style={{ fontSize: 13, fontWeight: 600, fontFamily: 'monospace' }}>{selectedDraft.ipAddress || 'Not Captured'}</div>
                                </div>
                                <div>
                                    <label style={{ fontSize: 10, color: '#64748B', marginBottom: 4, display: 'block' }}>Last Activity</label>
                                    <div style={{ fontSize: 13, fontWeight: 600 }}>{new Date(selectedDraft.updatedAt).toLocaleString()}</div>
                                </div>
                                <div style={{ gridColumn: 'span 2', marginTop: 8, padding: '12px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 8, fontSize: 12, color: '#065F46' }}>
                                    🛡️ <strong>Zero-Retention Policy Active:</strong> Sensitive form data (Name, SSN, Address) is processed in-browser and is <strong>not stored</strong> in this database to ensure maximum user privacy.
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
                            <button 
                                onClick={async () => {
                                   if (!confirm("Are you sure you want to resend the manual follow-up to this user?")) return;
                                   const res = await fetch('/api/admin/draft-actions', {
                                     method: 'POST',
                                     headers: { 'Content-Type': 'application/json' },
                                     body: JSON.stringify({ action: 'resend-sample', formId: selectedDraft.formId })
                                   });
                                   if (res.ok) alert("Follow-up queued!");
                                }}
                                style={{ flex: 2, background: 'var(--primary)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}
                            >
                                Trigger Manual Follow-up
                            </button>
                            <button 
                                onClick={async () => {
                                   if (!confirm("Delete this draft permanently?")) return;
                                   const res = await fetch('/api/admin/draft-actions', {
                                     method: 'POST',
                                     headers: { 'Content-Type': 'application/json' },
                                     body: JSON.stringify({ action: 'delete', formId: selectedDraft.formId })
                                   });
                                   if (res.ok) {
                                      setSelectedDraft(null);
                                      fetchData();
                                   }
                                }}
                                style={{ flex: 1, background: '#FEF2F2', color: '#EF4444', border: '1px solid #FECACA', padding: '12px 24px', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}
                            >Delete</button>
                            <button 
                                onClick={() => setSelectedDraft(null)}
                                style={{ background: '#F1F5F9', color: '#475569', border: 'none', padding: '12px 24px', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}
                            >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </main>
    </div>
  );
}
