import React from 'react';

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className='md:w-4/12 mx-auto text-center my-10'>
            <h2 className='text-yellow-500 mb-3'>--- {subHeading} ---</h2>
            <p  className='text-3xl border-y-4 py-3 uppercase'>{heading}</p>
            
        </div>
    );
};

export default SectionTitle;