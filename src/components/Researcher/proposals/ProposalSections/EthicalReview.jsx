import React, { useState } from 'react';
import Table1 from '../EthicalReviewTables.jsx/Table1.jsx'
import Table2 from '../EthicalReviewTables.jsx/Table2.jsx'
import Table3 from '../EthicalReviewTables.jsx/Table3.jsx'
import Table4 from './../EthicalReviewTables.jsx/Table4';
import Table5 from '../EthicalReviewTables.jsx/Table5.jsx'
export default function EthicalReview() {

    const [Table1Score,setTable1Score] = useState()
    const [Table2Score,setTable2Score] = useState()
    const [Table3Score,setTable3Score] = useState()
    const [Table4Score,setTable4Score] = useState()
    return (
        <div className='xl:m-10 m-5 font-WorkSans-Regular'>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black '>Ethical Review</h1>
            <header className='bg-white shadow-sm my-5 p-10'>
                
            Table-1   {Table1Score}

            Table-2   {Table2Score}
            
                <Table1  setTable1Score={setTable1Score}   />
                <Table2  setTable2Score={setTable2Score}  />
                <Table3/>
                <Table4/>
                <Table5/>
            </header>
           
        </div>
    );
}
