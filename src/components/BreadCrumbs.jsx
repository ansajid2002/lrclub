// Breadcrumbs.js

import React from 'react';
import Link from 'next/link';

const Breadcrumbs = ({ breadcrumbs }) => {
    return (
        <div className="">
            {breadcrumbs.map((breadcrumb, index) => (
                <span key={index}>
                    {index > 0 && ' / '}
                    {breadcrumb.url ? (
                        <Link href={breadcrumb.url}>
                            {breadcrumb.label}
                        </Link>
                    ) : (
                        <span>{breadcrumb.label}</span>
                    )}
                </span>
            ))}
        </div>
    );
};

export default Breadcrumbs;
