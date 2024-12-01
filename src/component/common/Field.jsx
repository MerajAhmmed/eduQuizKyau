import React from "react";

export default function Field({ label, error, htmlFor, children }) {
  const id = htmlFor || getChildId(children);
  return (
    <div>
      {label && (
        <label htmlFor={id} className="auth-label mb-2">
          {label}
        </label>
      )}
      {children}
      {!!error && (
        <div role="alert" className="text-red-600 mb-2">
          {error.message}
        </div>
      )}
    </div>
  );
}

const getChildId = (children) => {
  const child = React.Children.only(children);
  return child.props.id;
};
