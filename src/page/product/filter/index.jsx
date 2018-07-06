import React from 'react';
import { Form, Button, Row, Col, Input, Switch, Radio, Checkbox } from 'antd';


import './index.scss';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

const params = {};

const Filter = ({
    filter,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    },
    onFilterChange,
}) => {

    const handleChange = (e) => {
        var name = e.currentTarget.getAttribute('name');
        var doms = window.jQuery('input[name='+name+']');
        var values = window.jQuery.map(doms,function(item){
            if(item.checked){
                return item.value
            }
        });
        params[name] = values;
        onFilterChange(values)
    }

    const onChange = () => {
        setTimeout(function(){
            let fields =  getFieldsValue();
            onFilterChange(fields);
        },0)
    }

    const { goldTypes, categorys } = filter;

    return (
        <Form layout="horizontal">
            <FormItem label="商品成色：" >
                {getFieldDecorator('goldTypeItemDate', {  
                })(
                    <CheckboxGroup onChange={onChange}>
                        { 
                            goldTypes.dates.map((goldType,index) =>{
                                return (
                                    <Checkbox key={goldType['goldTypeItemId']} value={goldType['goldTypeItemId']}>{goldType['goldTypeItemName']}</Checkbox> 
                                )
                            }) 
                        }
                    </CheckboxGroup>
                )}
            </FormItem>
            <FormItem label="商品品类：" >
                {getFieldDecorator('categoryData', {  
                })(
                    <CheckboxGroup onChange={onChange}>
                        { 
                            categorys.dates.map((category,index) =>{
                                return (
                                    <Checkbox key={category['categoryId']} value={category['categoryId']}>{category['categoryName']}</Checkbox> 
                                )
                            }) 
                        }
                    </CheckboxGroup>
                )}
            </FormItem>        
        </Form>
    )
}

export default Form.create()(Filter);