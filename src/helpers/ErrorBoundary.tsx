import React from "react";
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

 /* componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }*/

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    // @ts-ignore
    if (this.state.hasError) {
      // Error path
      return (
        <div>
          <div style={{fontSize: "16px", color: "#5A5D65"}}> Something went wrong. Please check your network connection and reload the page.</div>
          {/* <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            {this.state.errorInfo.componentStack}
          </details> */}
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}