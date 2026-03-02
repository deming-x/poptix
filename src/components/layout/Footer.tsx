import Link from 'next/link';

export default function Footer() {
    return (
        <footer style={{ width: 1440, backgroundColor: 'white', position: 'relative', borderTop: '1px solid #E5E7EB', paddingTop: 64, paddingBottom: 32, paddingLeft: 120, paddingRight: 120 }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 312, width: 1200 }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    {/* Logo and Copyright Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: 300 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div
                                style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(170, 82, 255, 1) 30%, rgba(239, 0, 121, 1) 100%)' }}
                            >
                                <svg style={{ width: 16, height: 16, color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                            </div>
                            <span style={{ color: '#18181B', fontSize: 24, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>poptix</span>
                        </div>

                        <p style={{ color: '#59606A', fontSize: 14, margin: 0 }}>
                            100% Authentic & Guaranteed. Safe Booking
                        </p>
                    </div>

                    {/* Links grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 64 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <h3 style={{ color: '#18181B', fontWeight: 600, fontSize: 14, textTransform: 'uppercase', marginBottom: 8, margin: 0 }}>Customer Service</h3>
                            <Link href="#" style={{ color: '#59606A', fontSize: 14, textDecoration: 'none' }} className="hover:text-[#18181B]">Contact us</Link>
                            <Link href="#" style={{ color: '#59606A', fontSize: 14, textDecoration: 'none' }} className="hover:text-[#18181B]">Suggestions for comments</Link>
                            <Link href="#" style={{ color: '#59606A', fontSize: 14, textDecoration: 'none' }} className="hover:text-[#18181B]">Ticket Purchasing Guide</Link>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <h3 style={{ color: '#18181B', fontWeight: 600, fontSize: 14, textTransform: 'uppercase', marginBottom: 8, margin: 0 }}>About</h3>
                            <Link href="#" style={{ color: '#59606A', fontSize: 14, textDecoration: 'none' }} className="hover:text-[#18181B]">About Us</Link>
                            <Link href="#" style={{ color: '#59606A', fontSize: 14, textDecoration: 'none' }} className="hover:text-[#18181B]">Business cooperation</Link>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, gridColumn: 'span 2 / span 2' }}>
                            <h3 style={{ color: '#18181B', fontWeight: 600, fontSize: 14, textTransform: 'uppercase', marginBottom: 8, margin: 0 }}>Follow us</h3>
                            <div style={{ display: 'flex', gap: 16 }}>
                                {/* Social Placeholders */}
                                <div style={{ width: 32, height: 32, backgroundColor: '#F3F4F6', borderRadius: '50%' }}></div>
                                <div style={{ width: 32, height: 32, backgroundColor: '#F3F4F6', borderRadius: '50%' }}></div>
                                <div style={{ width: 32, height: 32, backgroundColor: '#F3F4F6', borderRadius: '50%' }}></div>
                            </div>

                            <h3 style={{ color: '#18181B', fontWeight: 600, fontSize: 14, textTransform: 'uppercase', marginTop: 16, marginBottom: 8 }}>E-mail</h3>
                            <a href="mailto:support@fantopia.io" style={{ color: '#59606A', fontSize: 14, textDecoration: 'none' }}>support@fantopia.io</a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar: Copyright & Policies */}
                <div style={{ width: '100%', borderTop: '1px solid #E5E7EB', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', marginBottom: 32 }}>
                    <p style={{ color: '#999999', fontSize: 12, margin: 0 }}>
                        ©️ 2025 Poptix All Rights Reserved (FANTOPIA SDN. BHD.)
                    </p>
                    <div style={{ display: 'flex', gap: 24, color: '#999999', fontSize: 12 }}>
                        <Link href="#" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:text-[#18181B]">服务条款</Link>
                        <span>丨</span>
                        <Link href="#" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:text-[#18181B]">隐私政策</Link>
                        <span>丨</span>
                        <Link href="#" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:text-[#18181B]">销售条款</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
