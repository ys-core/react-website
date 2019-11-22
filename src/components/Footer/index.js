import React, { Component } from 'react'

import { Layout } from 'antd'
const { Footer } = Layout

export default function(){
    return(
        <Layout>
             <Footer style={{ textAlign: 'center' }}>yongsonglee ©2019-{new Date().getFullYear()} Created by React</Footer>
        </Layout>
    )
}

