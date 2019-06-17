import React, { Component, forwardRef } from 'react'

const withLogs = (WrappedComponent) => {
	class WithLogs extends Component {
		componentDidUpdate(prevProps) {
			console.log('old props:', prevProps);
			console.log('new props:', this.props);
		}

		render() {
			const {forwardedRef, ...rest} = this.props;
			return <WrappedComponent ref={forwardedRef} {...rest} />;
		}
	}

	return forwardRef((props, ref) => {
		return <WithLogs {...props} forwardedRef={ref} />
	})
}

export default withLogs