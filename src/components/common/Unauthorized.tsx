const Unauthorized = () => {
  return (
    <div className="flex flex-col gap-1 items-start justify-start">
      <h2 className="text-2xl font-bold lg:text-3xl">Unauthorized 😡</h2>
      <p>
        You are not authorized to view this page. Please contact your
        administrator.
      </p>
    </div>
  );
};

export default Unauthorized;
