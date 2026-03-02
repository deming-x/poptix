import Link from 'next/link';

export default function Navbar() {
    return (
        <>
            <div style={{ width: 1440, height: 40, backgroundColor: 'rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p style={{ color: '#59606A', fontSize: 16, margin: 0 }}>
                    We&apos;re a marketplace for concert tickets. Prices are set by sellers and may be below or above face value.
                </p>
            </div>

            <nav style={{ width: 1440, height: 80, padding: '0 120px', backgroundColor: '#FDFDFD', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(170, 82, 255, 1) 30%, rgba(239, 0, 121, 1) 100%)' }}>
                        <svg style={{ width: 24, height: 24, color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                    </div>
                    <Link href="/" style={{ color: '#333333', fontSize: 32, fontWeight: 'bold', textTransform: 'uppercase', textDecoration: 'none' }}>
                        poptix
                    </Link>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    <div style={{ width: 400, height: 48, backgroundColor: '#F3F4F6', borderRadius: 16, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
                        <svg style={{ width: 24, height: 24, color: '#999999' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 16, marginLeft: 10, width: '100%', color: '#333333' }}
                            placeholder="丨搜索更多活动/演出/音乐会"
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                            <span style={{ color: '#333333', fontSize: 16, textTransform: 'uppercase', fontWeight: 500 }}>en</span>
                            <svg style={{ width: 16, height: 16, color: '#333333' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        <div style={{ width: 1, height: 16, backgroundColor: '#E5E7EB' }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                            <span style={{ color: '#333333', fontSize: 16, textTransform: 'uppercase', fontWeight: 500 }}>HKD</span>
                            <svg style={{ width: 16, height: 16, color: '#333333' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', paddingLeft: 16 }}>
                        <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', backgroundColor: '#E5E7EB' }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="https://i.pravatar.cc/150?u=jaychou" alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <span style={{ color: '#EF4444', fontSize: 16, fontWeight: 500 }}>Jay Chou</span>
                        <svg style={{ width: 16, height: 16, color: '#1F2937' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </nav>
        </>
    );
}
