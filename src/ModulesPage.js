import React from "react";

function ModulesPage() {
  const modules = require("./module_info_soc.json");
  console.log(modules);

  return (
    <div>
      <h2>Modules</h2>
      {/* {modules} */}
      {modules.map((module, id) => {
        <div>{module.course}</div>;
      })}
    </div>
  );
}

export default ModulesPage;
