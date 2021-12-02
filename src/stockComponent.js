import axios from 'axios';
import React from 'react';
import { Table , Avatar, Space} from 'antd';

import StockInputComponent from './stockInputComponent';

class stockComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            stock: []
        };
    }

    columns = [
        {
            title: 'Icon',
            dataIndex: 'iconUrl',
            key: 'icon',
            render: url => (
                <Avatar src={url} />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'displayName',
            key: 'displayName',
        },
        {
            title: 'Item ID',
            dataIndex: 'itemId',
            key: 'itemId',
        },
        {
            title: 'Quantity',
            dataIndex: 'minQuantity',
            key: 'minQuantity',
        },
        {
            title: 'Batch Size',
            dataIndex: 'batchSize',
            key: 'batchSize',
        },
        {
            title: 'Actions',
            key: 'action',
            render: () => {
            return (<Space size="middle">
                <a>Edit</a>
                <a>Delete</a>
            </Space>
            )},
        }
    ];

    fetchData() {
        this.setState({ ...this.state, isFetching: true })
        axios.get('https://mc-base.azurewebsites.net/api/stockItems?code=krAXisqkgHEWfgVkwkYAwHyumeE302koi80bw/tuaZXJ/f85DyMqaw==').then( req => {
            console.log(req.data);
            const stockData = req.data.map( item => {
                return { 
                    ...item, 
                    iconUrl: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/f/fc/Iron_Ingot_JE3_BE2.png',
                }
            })
            this.setState({ ...this.state, isFetching: false, stock: stockData })
        }) 
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div>
                < StockInputComponent />
                <Table
                    columns={this.columns}
                    dataSource={ this.state.stock }
                    loading={ this.state.isFetching }
                ></Table>
            </div>
        )
    }
}

export default stockComponent