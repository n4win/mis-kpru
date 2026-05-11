import { ReactNode } from "react";
import { IconCommand, IconSearch } from "@tabler/icons-react";
import {
  Button,
  ElementProps,
  TextInput,
  UnstyledButton,
  UnstyledButtonProps,
} from "@mantine/core";
import { spotlight } from "@mantine/spotlight";
import classes from "@/styles/spotlight-search-button.module.css";

interface ButtonSpotlightSearchProps
  extends
    Omit<UnstyledButtonProps, "children">,
    ElementProps<"div", keyof UnstyledButtonProps> {
  placeholder?: string;
  spotlight: ReactNode;
}

export function ButtonSpotlightSearch({
  placeholder,
  spotlight: spotlightComponent,
  ...props
}: ButtonSpotlightSearchProps) {
  return (
    <>
      <UnstyledButton
        component="div"
        className={classes.input}
        onClick={spotlight.open}
        {...props}
      >
        <TextInput
          placeholder={placeholder}
          leftSection={<IconSearch size="1.2rem" />}
          rightSection={
            <Button
              variant="light"
              component="span"
              size="compact-xs"
              leftSection={<IconCommand size="1rem" />}
            >
              K
            </Button>
          }
        />
      </UnstyledButton>

      <Button
        c="inherit"
        variant="transparent"
        className={classes.button}
        onClick={spotlight.open}
        leftSection={<IconSearch size="1.2rem" />}
        // rightSection={
        //   <Button
        //     component="span"
        //     variant="outline"
        //     size="compact-md"
        //     leftSection={<IconCommand size="1rem" />}
        //   >
        //     K
        //   </Button>
        // }
      />

      {spotlightComponent}
    </>
  );
}
