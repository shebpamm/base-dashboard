import axios from 'axios';
import React from 'react';
import { message, Table , Avatar, Space, Input, InputNumber, Form, Typography, Popconfirm} from 'antd';

class EditableCell extends React.Component {

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
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
    }
class StockTableComponent extends React.Component {

    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            editingKey: '',
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
            editable: true,
            type: 'text',
        },
        {
            title: 'Item ID',
            dataIndex: 'itemId',
            key: 'itemId',
            editable: true,
            type: 'text',
        },
        {
            title: 'Quantity',
            dataIndex: 'minQuantity',
            key: 'minQuantity',
            editable: true,
            type: 'number',
        },
        {
            title: 'Batch Size',
            dataIndex: 'batchSize',
            key: 'batchSize',
            editable: true,
            type: 'number',
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_, record) => {
                const editable = this.isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => this.save(record.itemId)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel()}>
                            <a href="#">Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <span>
                        <Typography.Link
                            disabled={this.state.editingKey !== ''}
                            onClick={() => this.edit(record)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Edit
                        </Typography.Link>
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.delete(record.itemId)}>
                            <a href="#">Delete</a>
                        </Popconfirm>
                    </span>
                );

        },
        }
    ];

    mergedColumns = this.columns.map((col) => {
        if (!col.editable) {
        return col;
        }

        return {
        ...col,
        onCell: (record) => ({
            record,
            inputType: col.type,
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record),
        }),
        };
    });

    isEditing(record) {
        return record.itemId === this.state.editingKey;
    }

    edit(record) {
        this.formRef.current.setFieldsValue(record);
        this.setState({
            ...this.state,
            editingKey: record.itemId,
        });
    }

    cancel() {
        this.setState({
            ...this.state,
            editingKey: '',
        });
    }

    delete(itemId) {
       this.props.deleteStockItem(itemId);
    }

    save = async (key, row) => {
        try {
            const row = await this.formRef.current.validateFields();
            this.props.updateStockItem(row);
            this.setState({
                ...this.state,
                editingKey: '',
            });
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    

    render() {
        return (
            <Form ref={this.formRef} component={false}>
                <Table
                    columns={ this.mergedColumns }
                    dataSource={ this.props.data }
                    loading={ this.props.loading }
                    rowKey={ record => record.itemId }
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                ></Table>
            </Form>
        )
    }
}

export default StockTableComponent