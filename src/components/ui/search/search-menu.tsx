import { Spotlight, SpotlightActionData } from "@mantine/spotlight";
import {
  IconHome,
  IconDashboard,
  IconFile,
  IconSearch,
} from "@tabler/icons-react";

const actions: SpotlightActionData[] = [
  {
    id: "home",
    label: "Home",
    description: "Get to home page",
    onClick: () => console.log("Home"),
    leftSection: <IconHome size="1.5rem" />,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Get full information about current system status",
    onClick: () => console.log("Dashboard"),
    leftSection: <IconDashboard size="1.5rem" />,
  },
  {
    id: "documentation",
    label: "Documentation",
    description: "Visit documentation to lean more about all features",
    onClick: () => console.log("Documentation"),
    leftSection: <IconFile size="1.5rem" />,
  },
];

export function SearchMenu() {
  return (
    <Spotlight
      actions={actions}
      nothingFound="Nothing found..."
      highlightQuery
      searchProps={{
        leftSection: <IconSearch />,
        placeholder: "Search feature",
      }}
    />
  );
}
