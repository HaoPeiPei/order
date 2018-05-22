import React from 'react';

class PageTitle extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        document.title=this.props.title ;
    }
    render(){
        return(
        	<div className="row">
				<div className="col-md-12" >
                    { this.props.children }
				</div>
        	</div>
        );
    }
}
export default PageTitle; 