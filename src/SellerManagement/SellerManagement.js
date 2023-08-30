import { useState, useEffect } from 'react'
import './SellerManagement.css'

const SellerManagement = () => {

    /* 
    // THIS PART IS FOR FETCHING THE LATER ON sellerDB 
    // the state sellers are going to be set to the returned value of this function
    const fetchSellers = async () => {
        try {
            const response = await fetch ('http://localhost:8000/fetchSellers',{
                method: "GET",
                headers: {
                    'Content-type':'application/json'
                }
            })
            const sellersDB = await response.json()
            setSellers(sellersDB)
        } catch (error) {
            console.log(error)
        }        
    }

    useEffect(()=>{fetchSellers()},[])
    
    */

    let sellersDB = [
        {
            's_id': 's1',
            'name': 'Andy',
            'age': 24,
            'status': 'approved'
        },
        {
            's_id': 's2',
            'name': 'Bobby',
            'age': 20,
            'status': 'rejected'      
        },
        {
            's_id': 's3',
            'name': 'Cody',
            'age': 18,
            'status': 'pending'      
        }
    ]

    const [sellers,setSellers] = useState(sellersDB)



    // REMEMBER TO ALSO UPDATE MONGODB
    const handleStatusChangeSelect = (s,e) => {
        let updatedStatus
        if (e.target.value === 'approve') {
            updatedStatus = {'status': 'approved'}
        } else {
            updatedStatus = {'status': 'rejected'}
        }

        setSellers(sellers.map((_s) => {
            if (_s.s_id === s.s_id) {
                return {..._s, ...updatedStatus}
            }
            return _s
        }))
    }

    const handleStatusChangeButton = (s,e) => {
        let updatedStatus
        if (e.target.value === 'reject'){
            // alert("have to reject")
            setSellers(sellers.map(_s => {
                if (_s.s_id === s.s_id) {
                    return { ..._s, ...{'status':'rejected'}}
                }
                return _s
            }))
        } else {
            // alert("have to approve")
            setSellers(sellers.map(_s => {
                if (_s.s_id === s.s_id) {
                    return { ..._s, ...{'status':'approved'}}
                }
                return _s
            }))
        }
    }

    useEffect(()=>{},[sellers])

    return (
        <div>
            <div id ='space'></div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Status</th>
                        <th>Change</th>
                    </tr>
                </thead>
                <tbody>
                    {sellers.map((s) => (
                        <tr key = {s.s_id}>
                            <td>{s.s_id}</td>
                            <td>{s.name}</td>
                            <td>{s.age}</td>
                            <td>{s.status}</td>
                            <td>
                                { s.status === 'approved' && (
                                    <button value='reject' onClick={(e) => handleStatusChangeButton(s,e)}>Reject</button>
                                )}
                                { s.status === 'rejected' && (
                                    <button value='approve' onClick={(e) => handleStatusChangeButton(s,e)}>Approve</button>
                                )}
                                { s.status === 'pending' && (
                                    <select onChange={(e) => handleStatusChangeSelect(s,e)}>
                                        <option>Select Approve or Reject</option>
                                        <option value='approve'>Approve</option>
                                        <option value='reject'>Reject</option>
                                    </select>
                                )}

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SellerManagement