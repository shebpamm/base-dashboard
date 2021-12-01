import axios from 'axios';
import React from 'react';
import { List } from 'antd';

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
            this.setState({ ...this.state, isFetching: false, stock: req.data })
        }) 
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div>
                <p>{this.state.isFetching ? 'Fetching users...' : ''}</p>
                <List
                    itemLayout="horizontal"
                    dataSource={ this.state.stock }
                    renderItem={ item => (
                        <List.Item>
                            <List.Item.Meta 
                                title={ item.displayName }
                                description={ item.itemId }
                            />
                        </List.Item>
                    )}
                ></List>
            </div>
        )
    }
}

export default stockComponent