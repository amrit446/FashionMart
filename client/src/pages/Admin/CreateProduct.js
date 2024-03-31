import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

const CreateProduct = () => {
  return (
    <Layout>
    <div className='row'>
        <div className='col-md-3'>
           <AdminMenu/>
        </div> 
        <div className='col-md-9'>
            <h1>Create Product</h1>
        </div>
    </div>
</Layout>
  )
}

export default CreateProduct