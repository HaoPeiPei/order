import React from 'react';

import './index.scss';

const Radio = ({
    dates,title,name,value,text,onChange
})=>{   
    return (
        <div className='radio-list clearfix'>
            <div className="title">{ title} : </div>
            {
                dates.length > 0 && dates.map((date, index) => {
                    return (
                        <label key={index} className='radio'>
                            <input type='radio' name={name} value={date[value]} onChange={onChange} />
                            <span className='text'>{date[text]}</span>
                        </label>
                    )
                })
            }
        </div>
        )
}

export default Radio;