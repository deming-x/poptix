const events = [
    {
        id: 1,
        title: "the fact music awards 2025 adcc",
        date: "08/02/2026-09/02/2026",
        location: "Global",
        price: "From HKD 1,200",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1000&auto=format&fit=crop",
        trending: true
    },
    {
        id: 2,
        title: "Jay Chou Carnival World Tour",
        date: "12/03/2026",
        location: "Hong Kong Coliseum",
        price: "From HKD 980",
        image: "https://images.unsplash.com/photo-1470229722913-7c092db62220?q=80&w=1000&auto=format&fit=crop",
        trending: true
    },
    {
        id: 3,
        title: "Blackpink BORN PINK FINALE",
        date: "15/04/2026-16/04/2026",
        location: "AsiaWorld-Expo",
        price: "From HKD 1,500",
        image: "https://images.unsplash.com/photo-1540039155732-6761b5258f33?q=80&w=1000&auto=format&fit=crop",
        trending: false
    },
    {
        id: 4,
        title: "Coldplay Music of the Spheres",
        date: "20/05/2026",
        location: "National Stadium",
        price: "From HKD 1,800",
        image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000&auto=format&fit=crop",
        trending: true
    }
];

export default function EventList({ title }: { title: string }) {
    return (
        <section style={{ width: 1440, paddingTop: 112, paddingLeft: 120, paddingRight: 120, backgroundColor: 'white' }}>
            <div style={{ width: 1200 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, width: '100%' }}>
                    <h2 style={{ fontSize: 32, fontWeight: 500, color: '#18181B', fontFamily: 'Inter', margin: 0, lineHeight: 1.2 }}>{title}</h2>

                    {title === "Recent Events" && (
                        <button style={{ color: '#18181B', fontSize: 20, fontWeight: 400, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: 'none', border: 'none' }} className="hover:opacity-80 transition-opacity">
                            view all
                            <svg style={{ width: 20, height: 20, flexShrink: 0 }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#18181B" />
                                <path d="M10.5 8L15 12.5L10.5 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    )}
                </div>

                <div style={{ display: 'flex', gap: 24, width: 1200 }}>
                    {events.map((event) => (
                        <div key={event.id} style={{ width: 282, display: 'flex', flexShrink: 0, flexDirection: 'column', cursor: 'pointer' }} className="group">
                            {/* Image Box */}
                            <div style={{ width: 282, height: 376, borderRadius: 16, overflow: 'hidden', position: 'relative', backgroundColor: '#F3F4F6' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    className="group-hover:scale-105 transition-transform duration-500 ease-out"
                                />
                            </div>

                            {/* Text Info */}
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: 16, gap: 8 }}>
                                <h3 style={{ fontSize: 20, fontWeight: 'bold', color: '#18181B', fontFamily: 'Inter', margin: 0, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {event.title}
                                </h3>
                                <div style={{ fontSize: 16, fontWeight: 'bold', color: '#59606A', fontFamily: 'Inter', margin: 0, lineHeight: 1 }}>
                                    {event.date}
                                </div>
                                <div style={{ fontSize: 16, fontWeight: 'normal', color: '#999999', marginTop: 4 }}>
                                    {event.location}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
