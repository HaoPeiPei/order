import React from 'react';
import { Form, Button, Row, Col, Input, Switch, Radio, Checkbox } from 'antd';
import  { connect } from 'react-redux';
import { getProductSearch } from '../../../store/product/action.js';
import './index.scss';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

class Filter extends React.Component{
    constructor(props){
        super(props)
        this.state={
            productSearchList: this.props.productData.productSearchList
        } 
    }

    componentDidMount(){
        
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            productSearchList: nextProps.productData.productSearchList,
        })
    }

    onChange = () => {
        let _this = this;
        setTimeout(() => {
            let queryJson =  this.props.form.getFieldsValue();
            queryJson = Object.assign({}, queryJson, {
                NewMark: queryJson['NewMark'] ? 1 : 0,
                FineMark: queryJson['FineMark'] ? 1 : 0,
            })
            this.props.onFilterChange(queryJson);
        }, 0);
    }

    render(){
        const {getFieldDecorator, validateFields} = this.props.form;
        const productSearchList = this.state.productSearchList;
        const Factory = productSearchList['Factory'] || [];
        const Category = productSearchList['Category'] || [];
        return (
            <Form layout="horizontal">
                <FormItem label="筛选：" >
                    {getFieldDecorator('FineMark', {  
                        onChange: this.onChange
                    })(
                        <Checkbox>精品</Checkbox>                              
                    )}
                    {getFieldDecorator('NewMark', {  
                        onChange: this.onChange
                    })(
                        <Checkbox>新品</Checkbox>                              
                    )}
                </FormItem>
                <FormItem label="工厂：" >
                    {getFieldDecorator('Factory', { 
                        onChange: this.onChange 
                    })(
                        <CheckboxGroup >
                            { 
                               Factory.map((item,index) =>{
                                    return (
                                        <Checkbox key={item['FactoryId']} checked={item['IsCheck']} value={item['FactoryId']}>{item['FullName']}</Checkbox> 
                                    )
                                }) 
                            }
                        </CheckboxGroup>
                    )}
                </FormItem>
                <FormItem label="品类：" >
                    {getFieldDecorator('Category', {  
                        onChange: this.onChange 
                    })(
                        <CheckboxGroup>
                            { 
                                Category.map((item,index) =>{
                                    return (
                                        <Checkbox key={item['CategoryId']} checked={item['IsCheck']} value={item['CategoryId']}>{item['CategoryName']}</Checkbox> 
                                    )
                                }) 
                            }
                        </CheckboxGroup>
                    )}
                </FormItem>        
            </Form>
        )
    }
}



export default connect(
    state => ({
        productData: state.productData,
    }),{
        getProductSearch
    }
)(Form.create()(Filter));