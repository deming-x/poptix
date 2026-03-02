export default function HeroSection() {
    return (
        <section style={{ width: 1440, paddingTop: 40, paddingLeft: 120, paddingRight: 120, backgroundColor: 'white' }}>
            <div style={{ width: 1180, height: 440, position: 'relative', borderRadius: 24, overflow: 'hidden' }}>
                {/* Actual Hero Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="https://images.unsplash.com/photo-1540039155732-6761b5258f33?q=80&w=3000&auto=format&fit=crop"
                    alt="Concert Hero"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Bottom Carousel Indicator dots (Frame 451) */}
                <div style={{ position: 'absolute', bottom: 24, left: 546, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'white', opacity: 1 }}></div>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.5)' }}></div>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.5)' }}></div>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.5)' }}></div>
                </div>
            </div>
        </section>
    );
}
