import { hooks } from "./utils";
import type { ChildrenPropsI } from "./interface";

function ContextContainer({ children }: Readonly<ChildrenPropsI>) {
  return <hooks.ProvideAuthContext>{children}</hooks.ProvideAuthContext>;
}

export default ContextContainer;
