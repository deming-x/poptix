export default function GuaranteeSection() {
    const guarantees = [
        {
            title: "Official Authenticity",
            description: "100% Authentic Tickets or Full Refund + 100% Compensation",
        },
        {
            title: "Buyer Protection",
            description: "100% Refund for Cancellations or Postponements",
        },
        {
            title: "Transparent Pricing",
            description: "Clear Pricing, No Hidden Fees",
        },
        {
            title: "Professional Support",
            description: "24/7 Customer Support",
        }
    ];

    return (
        <section style={{ width: 1440, paddingTop: 112, paddingBottom: 160, paddingLeft: 120, paddingRight: 120, backgroundColor: 'white' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 1200, gap: 24 }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                    <h2 style={{ color: '#18181B', fontSize: 32, fontWeight: 700, fontFamily: 'Inter', margin: 0, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                        The Poptix Guarantee
                    </h2>
                    <p style={{ color: '#59606A', fontSize: 16, fontWeight: 400, fontFamily: 'PingFang SC', margin: 0 }}>
                        Safe, secure, and authentic. We&apos;ve got you covered.
                    </p>
                </div>

                <div style={{ display: 'flex', gap: 24, width: 1200, alignItems: 'stretch' }}>
                    {guarantees.map((item, index) => (
                        <div
                            key={index}
                            style={{ width: 282, flexShrink: 0, backgroundColor: '#FFFFFF', borderRadius: 32, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: 32, gap: 24, position: 'relative', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', border: '1px solid #F3F4F6', transition: 'transform 0.2s' }}
                            className="hover:-translate-y-1"
                        >
                            <div style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#D1D5DB' }}></div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <h3 style={{ color: '#18181B', fontSize: 20, fontWeight: 700, fontFamily: 'Inter', margin: 0, lineHeight: 1.3 }}>
                                    {item.title}
                                </h3>
                                <p style={{ color: '#59606A', fontSize: 16, fontWeight: 400, margin: 0, lineHeight: 1.6 }}>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
