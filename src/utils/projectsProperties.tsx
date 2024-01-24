import {
  AppWindow,
  Archive,
  AreaChart,
  Brush,
  CalendarCheck,
  CalendarX,
  ClipboardX,
  Code,
  Combine,
  Construction,
  FlaskConical,
  FolderOpenDot,
  Frame,
  Gamepad2,
  GitPullRequest,
  Info,
  LayoutGrid,
  Lightbulb,
  MonitorStop,
  PanelTop,
  PenLine,
  PocketKnife,
  Presentation,
  Radiation,
  Rocket,
  Stamp,
  Sword,
  Swords,
  Trophy,
  Type,
  Wrench,
} from "lucide-react";

export const projectTypes = [
  {
    label: "Web",
    value: "web",
    info: "A web project is a website or web app that runs on a browser.",
    icon: <AppWindow className="w-4 h-4" strokeWidth={1.5} />,
  },
  {
    label: "App",
    value: "app",
    info: "An app project is a mobile or tablet app that runs on a device.",
    icon: <LayoutGrid className="w-4 h-4" strokeWidth={1.5} />,
  },
  {
    label: "Game",
    value: "game",
    info: "A game project is a video game that runs on a console, computer, or device.",
    icon: <Gamepad2 className="w-4 h-4" strokeWidth={1.5} />,
  },
  {
    label: "Desktop",
    value: "desktop",
    info: "A desktop project is a software application that runs on a computer.",
    icon: <MonitorStop className="w-4 h-4" strokeWidth={1.5} />,
  },
  {
    label: "API",
    value: "api",
    info: "An API project is a set of functions or methods that allows communication between different software components.",
    icon: <GitPullRequest className="w-4 h-4" strokeWidth={1.5} />,
  },
  {
    label: "Library",
    value: "library",
    info: "A library project is a collection of reusable code or resources that can be imported by other projects.",
    icon: <Stamp className="w-4 h-4" strokeWidth={1.5} />,
  },
  {
    label: "Other",
    value: "other",
    info: "An other project is a project that does not fit into any of the above categories.",
    icon: <PanelTop className="w-4 h-4" strokeWidth={1.5} />,
  },

  {
    label: "Hardware",
    value: "hardware",
    info: "A hardware project is a physical device or system that performs a specific function or task.",
    icon: <Frame className="w-4 h-4" strokeWidth={1.5} />,
  },
];
export const projectPriorities = [
  {
    label: "Lowest",
    value: "lowest",
    icon: <Brush className="w-4 h-4" strokeWidth={1.5} />,
    info: "A lowest priority project is not urgent or important and can be done later or skipped.",
  },
  {
    label: "Low",
    value: "low",
    icon: <PocketKnife className="w-4 h-4" strokeWidth={1.5} />,
    info: "A low priority project is not urgent but somewhat important and can be done after higher priority projects.",
  },
  {
    label: "Medium",
    value: "medium",
    icon: <Wrench className="w-4 h-4" strokeWidth={1.5} />,
    info: "A medium priority project is moderately urgent and important and should be done soon.",
  },
  {
    label: "High",
    value: "high",
    icon: <Sword className="w-4 h-4" strokeWidth={1.5} />,
    info: "A high priority project is very urgent and important and should be done as soon as possible.",
  },
  {
    label: "Highest",
    value: "highest",
    icon: <Swords className="w-4 h-4" strokeWidth={1.5} />,
    info: "A highest priority project is extremely urgent and important and should be done immediately.",
  },
];
export const projectStages = [
  {
    label: "Concept",
    value: "concept",
    icon: <Lightbulb className="w-4 h-4" strokeWidth={1.5} />,
    info: "A concept stage is where the project idea is generated and validated.",
  },
  {
    label: "Planning",
    value: "planning",
    icon: <Presentation className="w-4 h-4" strokeWidth={1.5} />,
    info: "A planning stage is where the project scope, objectives, timeline, budget, and resources are defined and documented.",
  },
  {
    label: "Design",
    value: "design",
    icon: <Brush className="w-4 h-4" strokeWidth={1.5} />,
    info: "A design stage is where the project requirements are translated into visual and functional elements.",
  },
  {
    label: "Development",
    value: "development",
    icon: <Code className="w-4 h-4" strokeWidth={1.5} />,
    info: "A development stage is where the project code and functionality are implemented and integrated.",
  },
  {
    label: "Testing",
    value: "testing",
    icon: <FlaskConical className="w-4 h-4" strokeWidth={1.5} />,
    info: "A testing stage is where the project quality and performance are verified and validated.",
  },
  {
    label: "Deployment",
    value: "deployment",
    icon: <Rocket className="w-4 h-4" strokeWidth={1.5} />,
    info: "A deployment stage is where the project is delivered and launched to the target audience or market.",
  },
  {
    label: "Maintenance",
    value: "maintenance",
    icon: <Construction className="w-4 h-4" strokeWidth={1.5} />,
    info: "A maintenance stage is where the project is monitored and supported for any issues or improvements.",
  },
];
export const projectStatus = [
  {
    label: "Active",
    value: "active",
    icon: <Radiation className="w-4 h-4" strokeWidth={1.5} />,
    info: "An active project is currently being worked on and is in progress.",
  },
  {
    label: "Archived",
    value: "archived",
    icon: <Archive className="w-4 h-4" strokeWidth={1.5} />,
    info: "An archived project is no longer being worked on and is no longer in progress.",
  },
  // {
  //   label: "Draft",
  //   value: "draft",
  //   icon: <PenLine className="w-4 h-4" strokeWidth={1.5} />,
  //   info: "A draft project is not yet ready to be worked on and is not in progress.",
  // },
  {
    label: "Inactive",
    value: "inactive",
    icon: <ClipboardX className="w-4 h-4" strokeWidth={1.5} />,
    info: "A high priority project is very urgent and important and should be done as soon as possible.",
  },
];
export const sortOptions = {
  group_a: [
    {
      label: "Project Type",
      value: "type",
      icon: <FolderOpenDot className="w-4 h-4" strokeWidth={1.5} />,
    },
    {
      label: "Project Priority",
      value: "priority",
      icon: <Trophy className="w-4 h-4" strokeWidth={1.5} />,
    },
    {
      label: "Project Stage",
      value: "stage",
      icon: <Combine className="w-4 h-4" strokeWidth={1.5} />,
    },
  ],
  group_b: [
    {
      label: "Title",
      value: "title",
      icon: <Type className="w-4 h-4" strokeWidth={1.5} />,
    },
    {
      label: "Start Date",
      value: "startDate",
      icon: <CalendarCheck className="w-4 h-4" strokeWidth={1.5} />,
    },
    {
      label: "End Date",
      value: "endDate",
      icon: <CalendarX className="w-4 h-4" strokeWidth={1.5} />,
    },
  ],
};
