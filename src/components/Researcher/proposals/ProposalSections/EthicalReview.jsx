import React, { useState } from 'react';
import Table1 from '../EthicalReviewTables.jsx/Table1.jsx'
import Table2 from '../EthicalReviewTables.jsx/Table2.jsx'
import Table3 from '../EthicalReviewTables.jsx/Table3.jsx'
import Table4 from './../EthicalReviewTables.jsx/Table4';
import Table5 from '../EthicalReviewTables.jsx/Table5.jsx'
import Table6 from '../EthicalReviewTables.jsx/Table6.jsx';
export default function EthicalReview() {
    const [Table1Score, setTable1Score] = useState(0)
    const [Table2Score, setTable2Score] = useState(0)
    const [Table4Score, setTable4Score] = useState(0)
    const [Table5Score, setTable5Score] = useState(0)
    const Risk = Table1Score + Table2Score + Table4Score + Table5Score
    return (
        <div className='WorkSans-Regular'>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black '>Ethical Review</h1>
            <header className='bg-white shadow-sm my-5 p-10'>
                <Table1 setTable1Score={setTable1Score} />
                <Table2 setTable2Score={setTable2Score} />
                <Table3 />
                <Table4 setTable4Score={setTable4Score} />
                <Table5 setTable5Score={setTable5Score} />
                <section className='mb-4 w-full md:w-[50%] '>
                    <label htmlFor="Ethical-Risk" className='text-zeta  font-semibold '>ERC Risk Score Total</label>
                    <input
                        type='text'
                        name='Ethical-Risk'
                        value={Risk}
                        id='Ethical-Risk'
                        className='border mt-2 rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' />
                </section>
                <Table6 />
                <section className='mb-4 w-full md:w-[50%] '>
                    <label htmlFor="research-title" className='text-zeta  font-semibold '>Benefit Score</label>
                    <input
                        value={'Backend'}
                        type='text'
                        name='rBenefit-Score'
                        id='Benefit-Score'
                        onChange={(e) => { setResearchTitle(e.target.value) }}
                        className=' mt-2 border rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' />
                </section>
            </header>
        </div>
    );
}
