import React from 'react';

// SPECIFICALLY REQUESTED SKELETONS

export const CardSkeleton = () => (
    <div className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-xl h-32 w-full shadow-sm"></div>
);

export const TextSkeleton = () => (
    <div className="animate-pulse space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
);

export const TableSkeleton = () => (
    <div className="animate-pulse glass-card overflow-hidden">
        <div className="flex gap-4 p-2 px-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 hidden md:flex">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
        {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex gap-4 p-2 px-4 border-b border-gray-100 dark:border-gray-800 items-center">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-xl w-1/4"></div>
            </div>
        ))}
    </div>
);

export const FormSkeleton = () => (
    <div className="animate-pulse space-y-6 w-full">
        <div className="space-y-4">
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg w-full"></div>
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg w-full"></div>
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg w-full"></div>
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg w-full"></div>
        </div>
        <div className="h-12 bg-gray-400 dark:bg-gray-600 rounded-lg w-full mt-6"></div>
    </div>
);

// EXISTING DASHBOARD WIDGETS (Updated slightly to match gray-300 instead of 200)
export const StatsCardSkeleton = () => (
    <div className="glass-card p-4 md:p-6 flex items-center gap-3 md:gap-4 animate-pulse">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gray-300 dark:bg-gray-700 shrink-0"></div>
        <div className="flex-1">
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-24 mb-2"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
        </div>
    </div>
);

export const ChartSkeleton = () => (
    <div className="glass-card p-6 h-[320px] flex flex-col animate-pulse">
        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-40 mb-6"></div>
        <div className="flex-1 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
    </div>
);

export const HeatmapSkeleton = () => (
    <div className="space-y-4 animate-pulse">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-48"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="glass-card p-4 flex items-center justify-between">
                    <div className="space-y-2 flex-1 mr-4">
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
                        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gray-300 dark:bg-gray-700 shrink-0"></div>
                </div>
            ))}
        </div>
    </div>
);

export const ReportListSkeleton = () => (
    <div className="space-y-4 animate-pulse">
        <div className="flex items-center justify-between">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-40"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
        </div>
        <div className="grid gap-4">
            {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="glass-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-xl bg-gray-300 dark:bg-gray-700 shrink-0"></div>
                        <div className="flex-1 space-y-2 mt-1">
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
                            <div className="flex gap-2">
                                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
                                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-8">
                        <div className="hidden lg:block space-y-1">
                            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
                        </div>
                        <div className="w-20 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
