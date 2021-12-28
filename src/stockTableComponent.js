import axios from 'axios';
import React from 'react';
import { message, Table , Avatar, Space, Input, InputNumber, Form} from 'antd';

import StockInputComponent from './stockInputComponent';

class StockTableComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    columns = [
        {
            title: 'Icon',
            dataIndex: 'itemId',
            key: 'icon',
            render: id => (
                <Avatar src={`https://minecraftresources.blob.core.windows.net/icons/${encodeURIComponent(id)}.png`} shape='square' style={{ imageRendering: 'pixelated' }}/>
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

    EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    render() {
        return (
            <Table
                columns={this.columns}
                dataSource={ this.props.data }
                loading={ this.props.loading }
                rowKey={record => record.itemId}
                components={{
                    body: {
                        cell: this.EditableCell,
                    },
                }}
            ></Table>
        )
    }
}

export default StockTableComponent