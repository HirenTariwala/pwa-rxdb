export interface AccordianProps {
  expanded: boolean;
  title: string;
  steps: number;
  children: React.ReactNode;
  onChange: (event: React.SyntheticEvent, newExpanded: boolean) => void;
}
