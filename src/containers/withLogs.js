import React from 'react'

const withLogs = (WrappedComponent) => {
	return (props) => console.log(props) || <WrappedComponent {...props} />
}

export default withLogs