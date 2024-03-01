import React, { Suspense } from 'react';

export default function withSuspense(Component: React.FC) {
  return function WithSuspenseComponent(props: any) {
    return (
      <Suspense>
        <Component {...props} />
      </Suspense>
    );
  };
}
