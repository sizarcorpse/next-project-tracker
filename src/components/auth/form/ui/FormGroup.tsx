import { IconType } from "react-icons/lib";
import { RiInformationLine } from "react-icons/ri";
const FormGroup = ({
  children,
  icon,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  icon?: IconType;
  subtitle?: string;
}) => {
  const Icon = icon || RiInformationLine;
  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="flex flex-row items-center justify-start gap-2">
          <Icon className="text-slate-600" />
          <h4 className="text-sm font-semibold text-slate-600">{title}</h4>
        </div>
        {subtitle && (
          <span className="text-xs font-normal text-slate-500">{subtitle}</span>
        )}
      </div>
      {children}
    </div>
  );
};

export default FormGroup;
