'use client';
import { useState, useEffect } from 'react';

const TABS = ['bookings', 'reviews', 'portfolio'];

export default function AdminClient() {
  const [tab, setTab]           = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadMeta, setUploadMeta] = useState({ title: '', category: 'weddings', alt: '' });
  const [uploading, setUploading]   = useState(false);
  const [uploadMsg, setUploadMsg]   = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bRes, rRes] = await Promise.all([
        fetch('/api/bookings'),
        fetch('/api/reviews?approved=false'),
      ]);
      const bData = await bRes.json();
      const rData = await rRes.json();
      setBookings(bData.bookings || []);
      setReviews(rData.reviews || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id, status) => {
    await fetch('/api/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    fetchData();
  };

  const approveReview = async (id) => {
    await fetch('/api/reviews', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, approved: true }),
    });
    fetchData();
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile) return;
    setUploading(true);
    setUploadMsg('');
    try {
      const formData = new FormData();
      formData.append('image',    uploadFile);
      formData.append('title',    uploadMeta.title);
      formData.append('category', uploadMeta.category);
      formData.append('alt',      uploadMeta.alt || uploadMeta.title);
      const res = await fetch('/api/portfolio', { method: 'POST', body: formData });
      const data = await res.json();
      setUploadMsg(data.success ? '✓ Image uploaded successfully!' : `Error: ${data.error}`);
      if (data.success) { setUploadFile(null); setUploadMeta({ title: '', category: 'weddings', alt: '' }); }
    } catch (err) {
      setUploadMsg('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const statusColor = (s) => ({ pending: '#E67E22', confirmed: '#3D9970', declined: '#C0392B', completed: '#3498DB' }[s] || '#999');

  return (
    <div style={{ minHeight: '100vh', background: '#0E0E0E', color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#0A0A0A', borderBottom: '1px solid #2A2A2A', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: '#C9A84C', fontSize: 22, fontWeight: 700 }}>Amen Pictures</span>
          <span style={{ color: '#555', fontSize: 14 }}>/ Admin Dashboard</span>
        </div>
        <a href="/" style={{ color: '#C9A84C', fontSize: 13 }}>← Back to Site</a>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Total Inquiries', value: bookings.length, icon: '📋' },
            { label: 'Pending Reviews', value: reviews.filter(r => !r.approved).length, icon: '⭐' },
            { label: 'Confirmed Bookings', value: bookings.filter(b => b.status === 'confirmed').length, icon: '✅' },
          ].map(s => (
            <div key={s.label} style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 12, padding: '20px 24px' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#C9A84C' }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#999' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: '#1A1A1A', padding: 4, borderRadius: 999, width: 'fit-content' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 20px', borderRadius: 999, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, textTransform: 'capitalize', background: tab === t ? '#C9A84C' : 'transparent', color: tab === t ? '#000' : '#999', transition: 'all 0.2s' }}>
              {t}
            </button>
          ))}
        </div>

        {loading && <div style={{ textAlign: 'center', padding: 40, color: '#C9A84C' }}>Loading...</div>}

        {/* BOOKINGS TAB */}
        {!loading && tab === 'bookings' && (
          <div>
            <h2 style={{ marginBottom: 16, fontSize: 18 }}>All Booking Inquiries</h2>
            {bookings.length === 0 ? <p style={{ color: '#666' }}>No bookings yet.</p> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {bookings.map(b => (
                  <div key={b._id} style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 12, padding: '20px 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 16 }}>{b.firstName} {b.lastName}</div>
                        <div style={{ color: '#C9A84C', fontSize: 13, margin: '4px 0' }}>{b.eventType} {b.eventDate ? `— ${new Date(b.eventDate).toLocaleDateString()}` : ''}</div>
                        <div style={{ color: '#999', fontSize: 12 }}>{b.email} {b.phone ? `• ${b.phone}` : ''}</div>
                        {b.message && <div style={{ color: '#ccc', fontSize: 13, marginTop: 8, maxWidth: 500 }}>&ldquo;{b.message.substring(0, 120)}{b.message.length > 120 ? '...' : ''}&rdquo;</div>}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                        <span style={{ background: statusColor(b.status), color: '#fff', padding: '3px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600, textTransform: 'capitalize' }}>{b.status}</span>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {b.status !== 'confirmed' && <button onClick={() => updateBookingStatus(b._id, 'confirmed')} style={{ background: '#3D9970', color: '#fff', border: 'none', borderRadius: 6, padding: '5px 12px', cursor: 'pointer', fontSize: 12 }}>Confirm</button>}
                          {b.status !== 'declined' && <button onClick={() => updateBookingStatus(b._id, 'declined')} style={{ background: '#C0392B', color: '#fff', border: 'none', borderRadius: 6, padding: '5px 12px', cursor: 'pointer', fontSize: 12 }}>Decline</button>}
                        </div>
                        <div style={{ color: '#555', fontSize: 11 }}>{new Date(b.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* REVIEWS TAB */}
        {!loading && tab === 'reviews' && (
          <div>
            <h2 style={{ marginBottom: 16, fontSize: 18 }}>Pending Reviews</h2>
            {reviews.filter(r => !r.approved).length === 0 ? <p style={{ color: '#666' }}>No pending reviews.</p> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {reviews.filter(r => !r.approved).map(r => (
                  <div key={r._id} style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 12, padding: '20px 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                      <div>
                        <div style={{ fontWeight: 600 }}>{r.name}</div>
                        <div style={{ color: '#C9A84C', margin: '4px 0', fontSize: 13 }}>{'★'.repeat(r.rating)} — {r.category}</div>
                        <div style={{ color: '#ccc', fontSize: 13, marginTop: 6, maxWidth: 500 }}>&ldquo;{r.quote}&rdquo;</div>
                      </div>
                      <button onClick={() => approveReview(r._id)} style={{ background: '#C9A84C', color: '#000', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap' }}>Approve</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PORTFOLIO TAB */}
        {!loading && tab === 'portfolio' && (
          <div>
            <h2 style={{ marginBottom: 16, fontSize: 18 }}>Upload Portfolio Image</h2>
            <form onSubmit={handleUpload} style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 12, padding: 24, maxWidth: 600 }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#999', marginBottom: 6 }}>Image File *</label>
                <input type="file" accept="image/*" onChange={(e) => setUploadFile(e.target.files[0])} required style={{ color: '#fff', fontSize: 13 }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#999', marginBottom: 6 }}>Title *</label>
                <input type="text" value={uploadMeta.title} onChange={e => setUploadMeta(m => ({ ...m, title: e.target.value }))} placeholder="e.g. Wedding of Miriam & Daniel" required style={{ width: '100%', padding: '10px 14px', background: '#0E0E0E', border: '1px solid #2A2A2A', borderRadius: 8, color: '#fff', fontSize: 14 }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#999', marginBottom: 6 }}>Category *</label>
                <select value={uploadMeta.category} onChange={e => setUploadMeta(m => ({ ...m, category: e.target.value }))} style={{ width: '100%', padding: '10px 14px', background: '#0E0E0E', border: '1px solid #2A2A2A', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                  {['weddings','events','portraits','corporate','ethiopia'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#999', marginBottom: 6 }}>Alt Text</label>
                <input type="text" value={uploadMeta.alt} onChange={e => setUploadMeta(m => ({ ...m, alt: e.target.value }))} placeholder="Descriptive alt text for SEO and accessibility" style={{ width: '100%', padding: '10px 14px', background: '#0E0E0E', border: '1px solid #2A2A2A', borderRadius: 8, color: '#fff', fontSize: 14 }} />
              </div>
              <button type="submit" disabled={uploading} style={{ background: '#C9A84C', color: '#000', border: 'none', borderRadius: 8, padding: '12px 24px', cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>
                {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
              {uploadMsg && <p style={{ marginTop: 12, color: uploadMsg.startsWith('✓') ? '#3D9970' : '#C0392B', fontSize: 13 }}>{uploadMsg}</p>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
