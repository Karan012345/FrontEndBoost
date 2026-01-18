import React, { useEffect, useState } from 'react'

function Github() {
    //Git Api call
    const [data, setDAta] = useState([]);
    useEffect(() => {
        fetch('https://github.com/users/karannalage')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setDAta(data);
            })
    }, [])



    return (
        <div className='text-center m-4 bg-gray-600 text-white
     p-4 text-3xl'>Github Followers:{data.followers}
            <img src={data.avatar_url} alt="Git Picture" width={300} />
        </div>
    )
}

export default Github

/*  Loader Method
         export const gitInfoLoader= async(()=>{
            const response= await fetch('https://github.com/users/karannalage')
            return response.json();

          })

*/


