import React, { ComponentType } from 'react';
export default function withSuspense<P extends object>(Component: ComponentType<P>): (props: P) => React.JSX.Element;
