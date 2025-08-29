declare module "*.riot" {
  import { RiotComponentWrapper } from "riot";
  const component: RiotComponentWrapper;
  export default component;
}