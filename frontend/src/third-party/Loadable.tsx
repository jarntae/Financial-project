import React, { Suspense } from 'react';

const Loadable = (Component: React.LazyExoticComponent<any>) => (props: any) => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2DADC2]" />
      </div>
    }>
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;