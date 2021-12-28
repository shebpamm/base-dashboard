import axios from 'axios';
import React from 'react';
import { message, Table , Avatar, Space} from 'antd';

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
                <Avatar src={url} shape='square' style={{ imageRendering: 'pixelated' }}/>
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
            const stockData = req.data.map( item => {
                return { 
                    ...item, 
                    iconUrl: 'https://minecraftresources.blob.core.windows.net/icons/' + encodeURIComponent(item.itemId) + '.png',
                }
            })
            this.setState({ ...this.state, isFetching: false, stock: stockData })
        }) 
    }

    addStockItem(item) {
        axios.post('https://mc-base.azurewebsites.net/api/stockItems?code=krAXisqkgHEWfgVkwkYAwHyumeE302koi80bw/tuaZXJ/f85DyMqaw==', item).then(req => {
            if(req.status === 200) {
                message.success(req.data);
                this.setState({ ...this.state, stock: [...this.state.stock, item] })
            } else {
                message.error(req.status);
            }
        });
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div>
                < StockInputComponent addStockItem={this.addStockItem.bind(this)} />
                <Table
                    columns={this.columns}
                    dataSource={ this.state.stock }
                    loading={ this.state.isFetching }
                    rowKey={record => record.itemId}
                ></Table>
            </div>
        )
    }
}

export default stockComponent