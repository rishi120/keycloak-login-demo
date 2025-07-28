import type { ModuleWrapperI } from "../interface";

const ModuleWrapper = ({ children }: ModuleWrapperI) => {
  return (
    <>
      <section>{children}</section>
    </>
  );
};
export default ModuleWrapper;
