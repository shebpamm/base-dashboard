import axios from 'axios';
import React from 'react';
import { message, Table , Avatar, Space, Input, InputNumber, Form} from 'antd';

import StockInputComponent from './stockInputComponent';
import StockTableComponent from './stockTableComponent';

class stockComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            stock: []
        };
    }

    fetchData() {
        this.setState({ ...this.state, isFetching: true })
        axios.get('https://mc-base.azurewebsites.net/api/stockItems?code=krAXisqkgHEWfgVkwkYAwHyumeE302koi80bw/tuaZXJ/f85DyMqaw==').then( req => {
            const stockData = req.data;
            this.setState({ ...this.state, isFetching: false, stock: stockData })
        }) 
    }

    addStockItem(item) {
        axios.post('https://mc-base.azurewebsites.net/api/stockItems?code=krAXisqkgHEWfgVkwkYAwHyumeE302koi80bw/tuaZXJ/f85DyMqaw==', item)
        .then(req => {
            if(req.status === 200) {
                message.success(req.data);
                this.setState({ ...this.state, stock: [...this.state.stock, item] })
            } else {
                message.error(req.status);
            }
        })
        .catch(err => {
            message.error(err.response.data);
        });
    }

    updateStockItem(item) {
        axios.put('https://mc-base.azurewebsites.net/api/stockItems?code=krAXisqkgHEWfgVkwkYAwHyumeE302koi80bw/tuaZXJ/f85DyMqaw==', item)
        .then(req => {
            if(req.status === 200) {
                message.success(req.data);
                this.setState({ ...this.state, stock: this.state.stock.map(stockItem => {
                    if(stockItem.itemId === item.itemId) {
                        return item;
                    } else {
                        return stockItem;
                    }
                })})
            } else {
                message.error(req.status);
            }
        })
        .catch(err => {
            message.error(err.response.data);
        });
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div>
                < StockInputComponent addStockItem={this.addStockItem.bind(this)} />
                < StockTableComponent updateStockItem={this.updateStockItem.bind(this)} data={this.state.stock} loading={this.state.isFetching} />
            </div>
        )
    }
}

export default stockComponent