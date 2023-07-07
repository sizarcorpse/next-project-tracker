"use client";

const LoadingDataRipple: React.FC = () => {
  return (
    <div className="rounded-md max-w-screen-md w-full flex flex-col gap-3">
      <div className="w-full h-20 bg-muted rounded-md animate-pulse"></div>
      <div className="w-full h-5 bg-muted rounded-md animate-pulse"></div>
      <div className="w-full h-5 bg-muted rounded-md animate-pulse"></div>
      <div className="w-full h-5 bg-muted rounded-md animate-pulse"></div>
      <div className="w-full h-5 bg-muted rounded-md animate-pulse"></div>
      <div className="w-full h-5 flex flex-row gap-3">
        <div className="w-7 h-7 bg-muted rounded-full animate-pulse"></div>
        <div className="w-7 h-7 bg-muted rounded-full animate-pulse"></div>
        <div className="w-7 h-7 bg-muted rounded-full animate-pulse"></div>
        <div className="w-7 h-7 bg-muted rounded-full animate-pulse"></div>
        <div className="w-7 h-7 bg-muted rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingDataRipple;
