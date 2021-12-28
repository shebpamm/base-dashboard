import React from 'react';

import { Form, Input, InputNumber, Button, AutoComplete } from 'antd';
import axios from 'axios';

class stockInputComponent extends React.Component {

    formRef = React.createRef();

    itemRules = [ {required: true} ]

    constructor() {
        super();
        this.state = {
            mods: [],
            itemIDs: [],
            itemIDOptions: [],
            currentModSearch: '',
            keepIDInputOpen: false
        }
    }

    componentDidMount() {
        this.formRef.current.setFieldsValue({
            name: '',
            quantity: 0,
            batchSize: 64
        });

        axios.get('https://minecraftresources.blob.core.windows.net/info/mods.json').then(response => {
            this.setState({
                ...this.state,
                mods: response.data
            });
        })
    }

    filterItemIDs(items, searchString) {
        this.setState({
            ...this.state,
            itemIDOptions: items.filter( item => {
                return item.text.split(':')[1].toLowerCase().startsWith(searchString.split(':')[1].toLowerCase());
            })
        });
    }

    onSelect(value, option) {
        this.onSearch(value);
        if(value.slice(-1) === ':') {
            this.setState({
                ...this.state,
                keepIDInputOpen: true
            });
        } else {
            this.setState({
                ...this.state,
                keepIDInputOpen: false
            });
        }
    }

    onSearch(value) {
        if(!this.state.mods.includes(value.split(':')[0]) || value.indexOf(':') === -1) {
            this.setState({
                ...this.state,
                currentModSearch: '',
                itemIDOptions: this.state.mods.filter(item => item.startsWith(value))
                .map(item => {
                    return { value: item+':', text: item+':' };
                })
            })
        } else {
            if(this.state.currentModSearch !== value.split(':')[0]) {
                axios.get(`https://minecraftresources.blob.core.windows.net/info/mods/${value.split(':')[0]}.json`).then(response => {
                    this.setState({
                        ...this.state,
                        currentModSearch: value.split(':')[0],
                        itemIDs: response.data.map(item => {
                            return { value: item, text: item }
                        })
                    })
                    this.filterItemIDs(this.state.itemIDs, value);
                });
            } else {
                this.filterItemIDs(this.state.itemIDs, value);
            }

        }
    }
    


    onFinish(values) {
        this.props.addStockItem(values);
    }


    render() {
        return (
            <Form
                className="stock-input-form"
                layout="inline"
                labelCol={{ span: 4 }}
                ref={this.formRef}
                onFinish={this.onFinish}
            >
                <Form.Item rules={this.itemRules} name="displayName">
                    <Input placeholder="Display Name"></Input>
                </Form.Item>
                <Form.Item rules={this.itemRules} name="itemId">
                    <AutoComplete 
                        style={{ width: 200 }} 
                        options={this.state.itemIDOptions} 
                        
                        onSearch={this.onSearch.bind(this)}
                        onSelect={this.onSelect.bind(this)}
                        onBlur={() => { this.setState({ ...this.state, keepIDInputOpen: false }) }}

                        open={this.state.keepIDInputOpen ? true : undefined}
                    >
                        <Input placeholder="Item ID" />
                    </AutoComplete>
                </Form.Item>
                <Form.Item rules={this.itemRules} name="minQuantity">
                    <InputNumber min={1} placeholder="Quantity"></InputNumber>
                </Form.Item> 
                <Form.Item rules={this.itemRules} name="batchSize">
                    <InputNumber min={1} placeholder="Batch Size"></InputNumber>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">
                        Add Item
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default stockInputComponent