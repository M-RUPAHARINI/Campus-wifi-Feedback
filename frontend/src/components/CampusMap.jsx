import React from 'react';
import { FaMapMarkedAlt, FaSignal, FaInfoCircle } from 'react-icons/fa';

const CampusMap = ({ feedbacks }) => {
    // Simple mock heatmap data visualization
    const locations = [
        { name: 'Eastern Wing (AS Block)', x: 20, y: 30, weight: feedbacks.filter(f => f.placeOfIssue === 'AS Block' || f.placeOfIssue === 'Eastern Wing (AS Block)').length },
        { name: 'Western Wing (IB Block)', x: 50, y: 20, weight: feedbacks.filter(f => f.placeOfIssue === 'IB Block' || f.placeOfIssue === 'Western Wing (IB Block)').length },
        { name: 'Sunflower Block', x: 70, y: 50, weight: feedbacks.filter(f => f.placeOfIssue === 'Sunflower Block').length },
        { name: 'Mechanical Block', x: 30, y: 70, weight: feedbacks.filter(f => f.placeOfIssue === 'Mechanical Block').length },
        { name: 'BIT Auditorium', x: 80, y: 80, weight: feedbacks.filter(f => f.placeOfIssue === 'BIT Auditorium').length },
        { name: 'Learning Center', x: 50, y: 50, weight: feedbacks.filter(f => f.placeOfIssue === 'Library' || f.placeOfIssue === 'Learning Center').length },
        { name: 'Hostel', x: 10, y: 80, weight: feedbacks.filter(f => f.placeOfIssue === 'Hostel').length },
    ];

    return (
        <div className="flex flex-col h-full space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors tracking-tight">WiFi Coverage Map</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1 transition-colors font-medium">Real-time heatmap of reported connectivity issues across campus.</p>
                </div>
                <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                        <span className="text-[10px] text-gray-600 dark:text-gray-400 font-bold uppercase tracking-wider">High Density</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                        <span className="text-[10px] text-gray-600 dark:text-gray-400 font-bold uppercase tracking-wider">Good Signal</span>
                    </div>
                </div>
            </div>

            <div className="flex-grow glass-card relative overflow-hidden bg-[#0d0e14] border border-white/10 min-h-[400px]">
                {/* Abstract Topography / Network Map Background */}
                <div className="absolute inset-0 opacity-40 mix-blend-screen bg-center" style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%2322c55e' stroke-width='1.5' stroke-opacity='0.25'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%2322c55e' fill-opacity='0.3'%3E%3Ccircle cx='769' cy='229' r='6'/%3E%3Ccircle cx='539' cy='269' r='6'/%3E%3Ccircle cx='603' cy='493' r='6'/%3E%3Ccircle cx='731' cy='737' r='6'/%3E%3Ccircle cx='520' cy='660' r='6'/%3E%3Ccircle cx='309' cy='538' r='6'/%3E%3Ccircle cx='295' cy='764' r='6'/%3E%3Ccircle cx='40' cy='599' r='6'/%3E%3Ccircle cx='102' cy='382' r='6'/%3E%3Ccircle cx='127' cy='80' r='6'/%3E%3Ccircle cx='370' cy='105' r='6'/%3E%3Ccircle cx='578' cy='42' r='6'/%3E%3Ccircle cx='237' cy='261' r='6'/%3E%3Ccircle cx='390' cy='382' r='6'/%3E%3C/g%3E%3C/svg%3E")`, 
                    backgroundSize: '800px 800px',
                    animation: 'pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }}></div>

                {/* Map Elements (Mock) */}
                <div className="absolute inset-0 p-12">
                    {locations.map((loc, i) => (
                        <div
                            key={i}
                            className="absolute cursor-pointer transition-all hover:scale-110"
                            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                        >
                            <div className="relative group">
                                {/* Density Ripple */}
                                {loc.weight > 0 && (
                                    <div className={`absolute -inset-4 rounded-full animate-ping ${loc.weight > 2 ? 'bg-red-500/20' : 'bg-yellow-500/20'}`}></div>
                                )}

                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 ${loc.weight > 2 ? 'bg-red-500/10 border-red-500 text-red-500' : loc.weight > 0 ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500' : 'bg-green-500/10 border-green-500 text-green-500'} shadow-xl`}>
                                    <FaSignal className="text-xs" />
                                </div>

                                {/* Label */}
                                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                    {loc.name} ({loc.weight} Reports)
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Panel Overlay */}
                <div className="absolute bottom-6 left-6 w-64 glass-card p-4 bg-black/60 backdrop-blur-xl animate-slide-up">
                    <div className="flex items-center gap-2 text-green-500 mb-2">
                        <FaInfoCircle />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Map Legend</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                        Dots represent campus buildings. The color indicates report density. Pulsing ripples highlight active problem zones.
                    </p>
                </div>

                <div className="absolute inset-0 pointer-events-none border-[20px] border-[#0a0b10] opacity-50"></div>
            </div>
        </div>
    );
};

export default CampusMap;
