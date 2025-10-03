/**
 * Error Boundary component for React error handling
 */

import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Message } from 'primereact/message';
import { Button } from 'primereact/button';
import { config } from '../config';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // In production, you might want to log this to an error reporting service
    if (config.env.isProduction) {
      // Log to error reporting service (e.g., Sentry, LogRocket)
      console.error('Production error:', { error, errorInfo });
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary-container p-4">
          <div className="max-w-2xl mx-auto">
            <Message 
              severity="error" 
              text="Something went wrong while loading the application." 
              className="mb-4"
            />
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Application Error
              </h2>
              
              <p className="text-gray-700 mb-4">
                An unexpected error occurred. You can try refreshing the page or contact support if the problem persists.
              </p>

              {config.env.isDevelopment && this.state.error && (
                <details className="mb-4 p-3 bg-gray-100 rounded border">
                  <summary className="cursor-pointer font-medium text-gray-800">
                    Error Details (Development Mode)
                  </summary>
                  <div className="mt-2 text-sm text-gray-700">
                    <p className="font-medium">Error:</p>
                    <pre className="bg-red-50 p-2 rounded text-red-800 text-xs overflow-auto">
                      {this.state.error.toString()}
                    </pre>
                    
                    {this.state.errorInfo && (
                      <>
                        <p className="font-medium mt-2">Component Stack:</p>
                        <pre className="bg-red-50 p-2 rounded text-red-800 text-xs overflow-auto">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </>
                    )}
                  </div>
                </details>
              )}

              <div className="flex gap-3">
                <Button
                  label="Try Again"
                  onClick={this.handleReset}
                  severity="secondary"
                  size="small"
                />
                <Button
                  label="Reload Page"
                  onClick={this.handleReload}
                  size="small"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;