import React from 'react';

const withModeChange = (WrappedComponent) => {
    return class extends React.Component {
        componentDidMount() {
            const props = this.props;
            if (props.mode !== props.newMode ){
                props.modeChange(props.newMode);
                props.isScrollChange(false);
            } else {
                props.isScrollChange(true);
            }
        }
        render() {
            return <WrappedComponent {...this.props}/>;
        }
    }
}

export default withModeChange;