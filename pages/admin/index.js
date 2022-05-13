import React from 'react';
import Navbar from "../../Componets/Admin/Navbar";
import Login from "../../Componets/Admin/Login";

const Index = () => {
    return (
        <div>

           <Login/>
        </div>
    );
};

// export async function getServerSideProps(context) {
//     console.log("hello")
//     const res = await fetch(`http://localhost:3007/hello`)
//     const data = await res.json()
//     console.log(data)
//
//     return {
    
//         props: {}, // will be passed to the page component as props
//     }
// }

export default Index;