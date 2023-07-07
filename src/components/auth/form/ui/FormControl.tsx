const FormControl = ({
  children,
  id,
  errors,
  icon,
  dirtyFields,
}: {
  children: React.ReactNode;
  errors?: any;
  id: string;
  icon?: any;
  dirtyFields?: any;
}) => {
  const Icon = icon || undefined;
  return (
    <div className="w-full">
      <div className="relative">
        {Icon ? (
          <Icon
            className={`absolute top-1/2 left-4 transform -translate-y-1/2  ${
              dirtyFields && dirtyFields[id]
                ? "text-card-foreground"
                : "text-card-foreground/60"
            }`}
          />
        ) : (
          ""
        )}
        {children}
      </div>
      {errors && errors[id]?.message && (
        <div className="text-destructive text-xs mt-3 pl-4">
          {errors && (errors[id]?.message as string)}
        </div>
      )}
    </div>
  );
};

export default FormControl;
