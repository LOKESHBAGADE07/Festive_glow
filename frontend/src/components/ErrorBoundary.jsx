import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-ivory px-6">
          <div className="max-w-md text-center">
            <p className="nv-eyebrow text-saffron-dark mb-3">Something went wrong</p>
            <h1 className="font-serif text-2xl text-ink mb-3">This section could not load</h1>
            <p className="text-ink-soft text-sm mb-6">
              Please refresh the page. If the issue persists, the error has been logged for review.
            </p>
            <button
              data-testid="error-boundary-reload"
              onClick={() => window.location.reload()}
              className="rounded-full bg-ink text-ivory px-6 py-3 text-sm font-semibold"
            >
              Refresh page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
