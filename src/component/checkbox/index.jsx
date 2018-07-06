import React from 'react';

import './index.scss';

const Checkbox = ({
    dates,title,name,value,text,onClick
}) =>{

    const handleClick = (e) =>{
        onClick(e)
    }
    return (
        <div className='checkbox-list clearfix'>
                <div className="title">{ title } : </div>
                {
                    dates.length > 0 && dates.map((date, index) => {
                        return (
                            <label key={index} className='checkbox'>
                                <input type='checkbox' name={name} value={date[value]}  onClick={ handleClick }/>
                                <span className='text'>{date[text]}</span>
                            </label>
                        )
                    })
                }
            </div>
    );
}

export default Checkbox;