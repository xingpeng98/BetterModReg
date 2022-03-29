import React from "react";

function ModulesPage() {
  const modules = require("./module_info_soc_short.json");
  console.log(modules);

  const user = JSON.parse(localStorage.getItem("user"));

  const bidModule = () => {};

  return (
    <div>
      <h2>Modules</h2>
      {modules.map((module, id) => {
        return (
          <div
            style={{
              borderStyle: "solid",
            }}
          >
            <div>
              <p>{module.title}</p>
              <p>{module.moduleCode}</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Vacancy: {module.vacancy}</p>
                <button>Bid</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ModulesPage;
